import Link from 'next/link'
import { ThemeToggle } from './components/theme-toggle'
import { HoverChip } from './components/hover-chip'
import { FitToScreen } from './components/fit-to-screen'

const highlights = [
  {
    label: 'Current',
    content: (
      <>
        Founding Engineer at{' '}
        <a href="https://getdrive.ai" target="_blank" rel="noopener noreferrer" className="inline-link">
          Drive AI
        </a>
      </>
    ),
  },
  {
    label: 'Focus',
    content: 'Applied AI systems that make engineering work faster and more reliable.',
  },
  {
    label: 'Projects',
    content: (
      <>
        <HoverChip text="Records successful agent runs and replays them as verified, repeatable procedures">
          <a
            href="https://github.com/kedarvartak/rote"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            Rote
          </a>
        </HoverChip>
        ,{' '}
        <HoverChip text="Inspects and safely cleans up the context that coding agents carry">
          <a
            href="https://github.com/kedarvartak/glassbox"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            Glassbox
          </a>
        </HoverChip>
        ,{' '}
        <HoverChip text="A reusable QA agent for testing browser-based applications">
          <a
            href="https://github.com/kedarvartak/easy-sanity"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            Easy Sanity
          </a>
        </HoverChip>
        .
      </>
    ),
  },
  {
    label: 'Background',
    content: (
      <>
        AI Engineering,{' '}
        <a href="https://www.vit.edu/" target="_blank" rel="noopener noreferrer" className="inline-link">
          VIT Pune
        </a>
        .
      </>
    ),
  },
  {
    label: 'Approach',
    content: 'End-to-end ownership, from design through testing.',
  },
]

export default function Home() {
  return (
    <main className="split-shell">
      <FitToScreen />
      <div className="split-container">
        <aside className="split-sidebar">
          <header className="home-nav" aria-label="Primary">
            <div className="home-nav-links">
              <Link href="/" className="home-nav-link home-nav-link-active">
                start
              </Link>
              <Link href="/agents" className="home-nav-link">
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
            <h1 className="home-title">Kedar Vartak</h1>
            <p className="home-lead">
              I build practical, well-engineered software and tools whose value compounds over time.
            </p>
          </div>
        </aside>

        <section className="split-main">
          <div className="home-intro">
            <p className="home-paragraph">
              I am a Founding Engineer at{' '}
              <a href="https://getdrive.ai" target="_blank" rel="noopener noreferrer" className="inline-link">
                Drive AI
              </a>
              , where I work across the stack to build the product and its technical foundations. I am drawn to hard
              engineering problems and new technology, and I make a habit of learning one new skill each week, which I
              document in my{' '}
              <a href="https://github.com/kedarvartak" target="_blank" rel="noopener noreferrer" className="inline-link">
                brain.md
              </a>
              .
            </p>
            <p className="home-paragraph">
              My interests lie in AI infrastructure, agent memory, and developer tooling, and I work as a generalist
              across the stack. Outside of engineering, I train every day.
            </p>
          </div>

          <div className="home-section">
            <h2 className="home-section-title">Highlights</h2>
            <ul className="home-highlights-list">
              {highlights.map((item) => (
                <li key={item.label} className="home-highlight-item">
                  <span className="home-highlight-label">{item.label}</span>
                  <div className="home-highlight-content">{item.content}</div>
                </li>
              ))}
            </ul>
          </div>

          <footer className="home-footer">
            <div className="home-footer-links">
              <a href="mailto:kedarvartak01@gmail.com" className="inline-link">
                email
              </a>
              <a href="https://github.com/kedarvartak" target="_blank" rel="noopener noreferrer" className="inline-link">
                github
              </a>
              <a href="https://linkedin.com/in/kedar-vartak20" target="_blank" rel="noopener noreferrer" className="inline-link">
                linkedin
              </a>
            </div>
          </footer>
        </section>
      </div>
    </main>
  )
}
