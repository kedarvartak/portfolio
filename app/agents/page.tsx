import Link from 'next/link'
import { ThemeToggle } from '../components/theme-toggle'

export const metadata = {
  title: "Kedar's Agents - Kedar Vartak",
  description: 'A closer look at AI agents and applied systems built by Kedar Vartak.',
}

export default function AgentsPage() {
  return (
    <main className="split-shell">
      <div className="split-container">
        <aside className="split-sidebar">
          <header className="home-nav" aria-label="Primary">
            <div className="home-nav-links">
              <Link href="/" className="home-nav-link">
                start
              </Link>
              <Link href="/agents" className="home-nav-link home-nav-link-active">
                agents
              </Link>
              <Link href="/writeups" className="home-nav-link">
                writeups
              </Link>
            </div>
            <ThemeToggle />
          </header>

          <div className="home-intro-sidebar">
            <img src="/img.jpeg" alt="Kedar Vartak" className="home-profile-img" />
            <h1 className="home-title">Kedar&apos;s Agents</h1>
            <p className="home-lead">
              Systems, tooling, and experiments built for real software teams and messy production workflows.
            </p>
          </div>

          <div className="home-intro">
            <p className="home-paragraph">
              This page is where I collect the agents I&apos;ve built. I care less about flashy demos and more about systems that reduce toil, catch regressions, and help engineers move faster with confidence.
            </p>
            <p className="home-paragraph">
              The current lineup spans trajectory reuse, agent-context observability, regression testing, browser
              vision, and shared memory—including <strong>Rote</strong>, which turns successful agent runs into
              deterministic, assertion-gated procedures.
            </p>
          </div>
        </aside>

        <section className="split-main">
          <div className="home-section">
            <h2 className="home-section-title">Featured agents</h2>
            
            <div className="agents-grid">
              <article className="agent-card">
                <div className="agent-card-top">
                  <span className="agent-pill">Trajectory Memoization</span>
                </div>

                <div>
                  <h3 className="agent-title">Rote</h3>
                  <p className="agent-description">
                    Harness middleware that records how an agent completes a task, represents the reusable procedure
                    as a parameterized step DAG, and replays it with deterministic control flow, per-step assertions,
                    and a safe fallback path.
                  </p>
                </div>

                <div className="agent-meta-row">
                  <span className="agent-meta-item">Record → replay</span>
                  <span className="agent-meta-item">Assertion-gated steps</span>
                  <span className="agent-meta-item">MCP tool boundary</span>
                </div>

                <div>
                  <Link href="/writeups/rote-trajectory-memoization" className="inline-link">
                    Read the technical writeup →
                  </Link>
                  {' · '}
                  <a href="https://github.com/kedarvartak/rote" target="_blank" rel="noopener noreferrer" className="inline-link">
                    View on GitHub →
                  </a>
                </div>
              </article>

              <article className="agent-card">
                <div className="agent-card-top">
                  <span className="agent-pill">Agent Context Inspector</span>
                </div>

                <div>
                  <h3 className="agent-title">Glassbox</h3>
                  <p className="agent-description">
                    A local-first inspector for the context coding agents actually carry. Glassbox exposes stale,
                    duplicated, and deleted-file content, then creates a validated, losslessly cleaned session you can
                    resume without modifying the original.
                  </p>
                </div>

                <div className="agent-meta-row">
                  <span className="agent-meta-item">Context x-ray</span>
                  <span className="agent-meta-item">Lossless session fork</span>
                  <span className="agent-meta-item">Local-first and read-only</span>
                </div>

                <div>
                  <Link href="/writeups/glassbox-agent-context" className="inline-link">
                    Read the technical writeup →
                  </Link>
                  {' · '}
                  <a href="https://github.com/kedarvartak/glassbox" target="_blank" rel="noopener noreferrer" className="inline-link">
                    View on GitHub →
                  </a>
                </div>
              </article>

              <article className="agent-card">
                <div className="agent-card-top">
                  <span className="agent-pill">Regression Testing Agent</span>
                </div>

                <div>
                  <h3 className="agent-title">Easy Sanity</h3>
                  <p className="agent-description">
                    A calm, persistent QA partner that patrols critical product flows, reruns key journeys, and flags regressions before they turn into team-wide distractions.
                  </p>
                </div>

                <div className="agent-meta-row">
                  <span className="agent-meta-item">Catches regressions early</span>
                  <span className="agent-meta-item">Repeatable sanity checks</span>
                  <span className="agent-meta-item">Faster release confidence</span>
                </div>

                <div>
                  <Link href="/agents/easy-sanity" className="inline-link">
                    Read documentation →
                  </Link>
                </div>
              </article>

              <article className="agent-card">
                <div className="agent-card-top">
                  <span className="agent-pill">Shared Memory MCP Server</span>
                </div>

                <div>
                  <h3 className="agent-title">Multi Agent Memo</h3>
                  <p className="agent-description">
                    A shared context layer for Claude Code, Codex, and Gemini CLI. It maintains a single source of truth in your repo to eliminate "cold starts" and keep multiple agents in sync automatically.
                  </p>
                </div>

                <div className="agent-meta-row">
                  <span className="agent-meta-item">No more cold starts</span>
                  <span className="agent-meta-item">Append-only AGENTS.md</span>
                  <span className="agent-meta-item">Multi-CLI compatibility</span>
                </div>

                <div>
                  <a href="https://github.com/kedarvartak/multi-agent-memo" target="_blank" rel="noopener noreferrer" className="inline-link">
                    View on GitHub →
                  </a>
                </div>
              </article>

              <article className="agent-card">
                <div className="agent-card-top">
                  <span className="agent-pill">Browser-First MCP Server</span>
                </div>

                <div>
                  <h3 className="agent-title">Agent Vision</h3>
                  <p className="agent-description">
                    Gives agents direct visual access to live Chrome or Brave tabs through the Chrome DevTools Protocol. It lets agents capture screenshots and pull structured page metadata on demand.
                  </p>
                </div>

                <div className="agent-meta-row">
                  <span className="agent-meta-item">Chrome DevTools Protocol</span>
                  <span className="agent-meta-item">Real-time Visual Context</span>
                  <span className="agent-meta-item">Structured Page Data</span>
                </div>

                <div>
                  <a href="https://github.com/kedarvartak/agent-vision" target="_blank" rel="noopener noreferrer" className="inline-link">
                    View on GitHub →
                  </a>
                </div>
              </article>
            </div>
          </div>

          <footer className="home-footer">
            <div className="home-footer-links">
              {/* Footer links removed as requested */}
            </div>
          </footer>
        </section>
      </div>
    </main>
  )
}
