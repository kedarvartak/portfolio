import Link from 'next/link'
import { styles } from '../styles'

export const metadata = {
  title: 'Essays - Kumar Abhirup',
  description: 'Essays and writings by Kumar Abhirup',
}

export default function Essays() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/" style={styles.navLink}>
          START
        </Link>
        <Link href="/essays" style={styles.navLink}>
          ESSAYS
        </Link>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Essays</h1>
        <p style={styles.bio}>Coming soon...</p>
      </main>

      <footer style={styles.footer}>
        <a
          href="mailto:hey@kumareth.com"
          style={styles.footerLink}
        >
          hey@kumareth.com
        </a>
        .{' '}
        <a
          href="https://twitter.com/kumar_abhirup"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.footerLink}
        >
          Twitter
        </a>
      </footer>
    </div>
  )
}
