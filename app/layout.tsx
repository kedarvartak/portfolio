import type { Metadata } from 'next'
import { Victor_Mono } from 'next/font/google'
import './globals.css'

const victorMono = Victor_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-victor-mono',
})

export const metadata: Metadata = {
  title: 'Kedar Vartak - To Be Founder & Engineer',
  description: 'I am a 21yo Founder and Engineer',
  keywords: ['Kedar Vartak', 'entrepreneur', 'founder', 'engineer', 'developer', 'startup'],
  authors: [{ name: 'Kedar Vartak' }],
  creator: 'Kedar Vartak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kedarvartak.com',
    siteName: 'Kedar Vartak',
    title: 'Kedar Vartak - To Be Founder & Engineer',
    description: 'I am a 21yo Founder and Engineer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kedar Vartak - To Be Founder & Engineer',
    description: 'I am a 21yo Founder and Engineer',
    creator: '@kedarvartak',
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
    <html lang="en">
      <body className={victorMono.variable}>
        {children}
      </body>
    </html>
  )
}
