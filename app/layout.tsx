import type { Metadata } from 'next'
import { Victor_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PostHogProvider } from './components/posthog-provider'
import './globals.css'

const victorMono = Victor_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-victor-mono',
})

export const metadata: Metadata = {
  title: 'Kedar Vartak',
  description: 'Founding Engineer at Drive AI, working on applied AI systems, agent infrastructure, and developer tooling.',
  keywords: ['Kedar Vartak', 'Drive AI', 'founding engineer', 'software engineer', 'AI engineering', 'developer tooling'],
  authors: [{ name: 'Kedar Vartak' }],
  creator: 'Kedar Vartak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kedarvartak.com',
    siteName: 'Kedar Vartak',
    title: 'Kedar Vartak',
    description: 'Founding Engineer at Drive AI, working on applied AI systems, agent infrastructure, and developer tooling.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={victorMono.variable}>
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
      </body>
    </html>
  )
}
