'use client'

import { PostHogProvider as PHProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { Suspense, useEffect } from 'react'
import type { ReactNode } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useReportWebVitals } from 'next/web-vitals'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

function getLinkKind(anchor: HTMLAnchorElement) {
  if (anchor.origin === window.location.origin) {
    return 'internal'
  }

  if (anchor.protocol === 'mailto:') {
    return 'email'
  }

  return 'external'
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!posthogKey || !pathname) {
      return
    }

    const queryString = searchParams.toString()
    const url = `${window.origin}${pathname}${queryString ? `?${queryString}` : ''}`

    posthog.capture('$pageview', {
      $current_url: url,
      path: pathname,
    })
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  useReportWebVitals((metric) => {
    if (!posthogKey || !posthog.__loaded) {
      return
    }

    posthog.capture('web_vital_reported', {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      path: window.location.pathname,
    })
  })

  useEffect(() => {
    if (!posthogKey || posthog.__loaded) {
      return
    }

    posthog.init(posthogKey, {
      api_host: '/ingest',
      ui_host: posthogHost,
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: 'identified_only',
      autocapture: true,
      loaded: (posthogInstance) => {
        if (process.env.NODE_ENV === 'development') {
          posthogInstance.debug()
        }
      },
    })
  }, [])

  useEffect(() => {
    if (!posthogKey) {
      return
    }

    const trackLinkClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      const anchor = target?.closest('a[href]')

      if (!(anchor instanceof HTMLAnchorElement) || !posthog.__loaded) {
        return
      }

      posthog.capture('portfolio_link_clicked', {
        href: anchor.href,
        label: anchor.textContent?.trim().slice(0, 80),
        kind: getLinkKind(anchor),
        path: window.location.pathname,
      })
    }

    document.addEventListener('click', trackLinkClick)
    return () => document.removeEventListener('click', trackLinkClick)
  }, [])

  if (!posthogKey) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}
