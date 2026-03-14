import { styles } from './styles'

export default function Home() {
  return (
    <div style={styles.container}>
      <aside style={styles.leftSidebar}>
        <div>
          {/* <header style={styles.header}>
            <Link href="/" style={styles.navLink}>
              HOME
            </Link>
            <Link href="/essays" style={styles.navLink}>
              WRITEUPS
            </Link>
          </header> */}

          <h1 style={styles.title}>Kedar Vartak</h1>

          <p style={styles.bio}>
            I work at <a href="https://www.loopr.ai" target="_blank" rel="noopener noreferrer" className="inline-link">Loopr.ai</a> as a software engineer, tackling complex engineering
            problems and keeping up with emergent technologies. My short term goal is to add a new skill to my{' '}
            <a href="https://github.com/kedarvartak" target="_blank" rel="noopener noreferrer" className="inline-link">brain.md</a> every single week, while building a side‑hustle, money‑making
            machine by the end of this year.
          </p>

          <p style={styles.bio}>
            I am particularly interested in <strong style={styles.bold}>AI</strong> and keep up with the latest tools and
            technologies in that space. I completed my Engineering in Artificial Intelligence from{' '}
            <a href="https://www.vit.edu/" target="_blank" rel="noopener noreferrer" className="inline-link">Vishwakarma Institute of Technology, Pune</a>.
          </p>

          <div style={styles.writeSection}>
            I write{' '}
            <a
              href="/essays"
              style={styles.link}
            >
              here
            </a>
            .
          </div>
        </div>

        <footer style={styles.footer}>
          <a
            href="mailto:kedarvartak01@gmail.com"
            style={styles.footerLink}
          >
            kedarvartak01@gmail.com
          </a>
          <a
            href="https://twitter.com/kedar2sexy"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.footerLink}
          >
            Twitter
          </a>
        </footer>
      </aside>

      <main style={styles.rightContent}>
        <p style={styles.sectionHeading}>Some of my latest souvenirs</p>

        <ul style={styles.accomplishmentsGrid}>
          <li style={styles.accomplishmentItem}>
            <div style={styles.itemHeader}>
              <span style={styles.itemNumber}>01</span>
              <span style={styles.itemTitle}>shared-memory-mcp</span>
            </div>
            <div style={styles.itemDescription}>
              Persistent memory for AI tools that lives across conversations and IDEs, while using fewer tokens. (88+ downloads)
            </div>
            <div style={styles.itemLinks}>
              <a
                href="https://github.com/kedarvartak/shared-memory-mcp"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/shared-memory-mcp"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                npm
              </a>
            </div>
          </li>
          <li style={styles.accomplishmentItem}>
            <div style={styles.itemHeader}>
              <span style={styles.itemNumber}>02</span>
              <span style={styles.itemTitle}>Contributions · Astro</span>
            </div>
            <div style={styles.itemDescription}>
              The content‑driven web framework. Fixed a failing test case and a hydration mismatch.
            </div>
            <div style={styles.itemLinks}>
              <a
                href="https://astro.build/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                astro.build
              </a>
            </div>
          </li>
          <li style={styles.accomplishmentItem}>
            <div style={styles.itemHeader}>
              <span style={styles.itemNumber}>03</span>
              <span style={styles.itemTitle}>Contributions · freeCodeCamp</span>
            </div>
            <div style={styles.itemDescription}>
              The open‑source learning platform. Added JavaScript tests to ensure user input produces the correct output.
            </div>
            <div style={styles.itemLinks}>
              <a
                href="https://www.freecodecamp.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                freeCodeCamp.org
              </a>
            </div>
          </li>
          <li style={styles.accomplishmentItem}>
            <div style={styles.itemHeader}>
              <span style={styles.itemNumber}>04</span>
              <span style={styles.itemTitle}>Freelancing & Consulting · Sangam India</span>
            </div>
            <div style={styles.itemDescription}>
              Collective art startup where I build software for brands and businesses.
            </div>
            <div style={styles.itemLinks}>
              <a
                href="https://sangamindia.in"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                sangamindia.in
              </a>
            </div>
          </li>
          <li style={styles.accomplishmentItem}>
            <div style={styles.itemHeader}>
              <span style={styles.itemNumber}>05</span>
              <span style={styles.itemTitle}>Freelancing & Consulting · Tenancy Passport</span>
            </div>
            <div style={styles.itemDescription}>
              AI‑powered UK property management platform; I help build frontend solutions for real‑world engineering problems.
            </div>
            <div style={styles.itemLinks}>
              <a
                href="https://tenancypassport.com"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                tenancypassport.com
              </a>
            </div>
          </li>
        </ul>
      </main>
    </div>
  )
}
