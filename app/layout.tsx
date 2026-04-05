import type { Metadata } from 'next'
import { Victor_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const victorMono = Victor_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-victor-mono',
})

export const metadata: Metadata = {
  title: 'Kedar Vartak',
  description: 'I am a 21yo Founder and Engineer',
  keywords: ['Kedar Vartak', 'entrepreneur', 'founder', 'engineer', 'developer', 'startup'],
  authors: [{ name: 'Kedar Vartak' }],
  creator: 'Kedar Vartak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kedarvartak.com',
    siteName: 'Kedar Vartak',
    title: 'Kedar Vartak',
    description: 'I am a 21yo Founder and Engineer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kedar Vartak',
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
    <html lang="en" suppressHydrationWarning>
      <body className={victorMono.variable}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var key='portfolio-theme';var theme=localStorage.getItem(key);if(theme==='midnight'||theme==='amber'){document.documentElement.dataset.theme=theme;}else{document.documentElement.removeAttribute('data-theme');}}catch(e){document.documentElement.removeAttribute('data-theme');}})();`}
        </Script>
        {children}
      </body>
    </html>
  )
}
