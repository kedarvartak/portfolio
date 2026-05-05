import Link from 'next/link'
import { styles } from '../styles'

export const metadata = {
  title: "Kedar's Agents - Kedar Vartak",
  description: 'A closer look at AI agents and applied systems built by Kedar Vartak.',
}

export default function AgentsPage() {
  return (
    <div style={styles.container} className="layout-container">
      <aside style={styles.leftSidebar} className="layout-sidebar">
        <div>
          <p style={styles.sectionHeading}>Systems, tooling, and experiments</p>
          <h1 style={styles.title}>Kedar&apos;s Agents</h1>

          <p style={styles.bio}>
            This page is where I collect the agents I&apos;ve built for real software teams and messy production workflows.
            I care less about flashy demos and more about systems that reduce toil, catch regressions, and help engineers move faster with confidence.
          </p>

          <p style={styles.bio}>
            The current lineup starts with <strong style={styles.bold}>Easy Sanity</strong>, our regression testing agent.
            It is designed to sanity-check product flows before humans have to chase the same bugs twice.
          </p>
        </div>

        <footer style={styles.footer} className="layout-footer">
          <a href="mailto:kedarvartak01@gmail.com" style={styles.footerLink}>
            kedarvartak01@gmail.com
          </a>
          <Link href="/" style={styles.footerLink}>
            Back home
          </Link>
        </footer>
      </aside>

      <main style={styles.rightContent} className="layout-main">
        <p style={styles.sectionHeading}>Featured agent</p>

        <section style={styles.agentGrid} className="agents-grid">
          <article style={styles.agentCardFeatured} className="agent-card-featured">
            <div style={styles.agentCardTop}>
              <span style={styles.agentPill}>Regression Testing Agent</span>
              <span style={styles.agentStatus}>Active</span>
            </div>

            <div style={styles.agentCardTitleRow}>
              <div>
                <h2 style={styles.agentTitle}>Easy Sanity</h2>
                <p style={styles.agentsIntro}>
                  A calm, persistent QA partner that patrols critical product flows, reruns key journeys, and flags regressions before they turn into team-wide distractions.
                </p>
              </div>
            </div>

            <div style={styles.agentMetaRow}>
              <span style={styles.agentMetaItem}>Catches regressions early</span>
              <span style={styles.agentMetaItem}>Repeatable sanity checks</span>
              <span style={styles.agentMetaItem}>Faster release confidence</span>
            </div>

            <div style={styles.itemLinks}>
              <Link href="/agents/easy-sanity" style={styles.link}>
                Read documentation
              </Link>
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}
