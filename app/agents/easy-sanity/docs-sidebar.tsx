'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { styles } from '../../styles'

type NavGroup = {
  title: string
  items: Array<{
    id: string
    label: string
  }>
}

export default function DocsSidebar({ navGroups }: { navGroups: NavGroup[] }) {
  const [activeId, setActiveId] = useState(navGroups[0]?.items[0]?.id ?? '')

  useEffect(() => {
    const allIds = navGroups.flatMap((group) => group.items.map((item) => item.id))
    const sections = allIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) {
      return
    }

    const syncFromHash = () => {
      const hashId = window.location.hash.replace('#', '')
      if (hashId && allIds.includes(hashId)) {
        setActiveId(hashId)
      }
    }

    syncFromHash()

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: '-18% 0px -60% 0px',
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      }
    )

    sections.forEach((section) => observer.observe(section))
    window.addEventListener('hashchange', syncFromHash)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', syncFromHash)
    }
  }, [navGroups])

  return (
    <nav style={styles.docsNav} className="docs-nav" aria-label="Documentation sections">
      <div style={styles.docsNavInner}>
        <div style={styles.docsNavSections} className="docs-nav-sections">
          {navGroups.map((group) => (
            <div key={group.title} style={styles.docsNavGroup}>
              <p style={styles.docsNavHeading}>{group.title}</p>
              <div style={styles.docsNavLinks}>
                {group.items.map((item) => {
                  const isActive = item.id === activeId

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      style={{
                        ...styles.docsNavLink,
                        ...(isActive ? styles.docsNavLinkActive : null),
                      }}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <footer style={styles.docsNavFooter} className="layout-footer">
          <Link href="/agents" style={styles.footerLink}>
            Back to agents
          </Link>
          <Link href="/" style={styles.footerLink}>
            Back home
          </Link>
        </footer>
      </div>
    </nav>
  )
}
