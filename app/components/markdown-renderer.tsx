import { Fragment } from 'react'
import { MermaidDiagram } from './mermaid-diagram'

// Handles: images, links, bold, italic, inline-code — in that priority order.
function renderInline(text: string) {
  const tokens = text
    .split(/(!\[[^\]]*\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)

  return tokens.map((token, index) => {
    const imgMatch = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imgMatch) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={index} src={imgMatch[2]} alt={imgMatch[1]} className="markdown-img-inline" />
      )
    }

    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]} className="markdown-link">
          {linkMatch[1]}
        </a>
      )
    }

    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={index}>{token.slice(2, -2)}</strong>
    }

    if (token.startsWith('*') && token.endsWith('*')) {
      return <em key={index}>{token.slice(1, -1)}</em>
    }

    if (token.startsWith('`') && token.endsWith('`')) {
      return <code key={index}>{token.slice(1, -1)}</code>
    }

    return <Fragment key={index}>{token}</Fragment>
  })
}

function parseTableRow(line: string): string[] {
  return line.split('|').slice(1, -1).map(c => c.trim())
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.length > 0 && cells.every(c => /^[-: ]+$/.test(c))
}

type Block =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'blockquote'; text: string }
  | { type: 'hr' }
  | { type: 'unordered-list'; items: string[] }
  | { type: 'ordered-list'; items: string[] }
  | { type: 'code'; language: string; content: string }

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split('\n')
  const blocks: Block[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    // Fenced code block
    if (line.startsWith('```')) {
      const language = line.slice(3).trim()
      const content: string[] = []
      index += 1
      while (index < lines.length && !lines[index].startsWith('```')) {
        content.push(lines[index])
        index += 1
      }
      blocks.push({ type: 'code', language, content: content.join('\n').trim() })
      index += 1
      continue
    }

    // Heading
    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/)
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length as 1 | 2 | 3,
        text: headingMatch[2].trim(),
      })
      index += 1
      continue
    }

    // Horizontal rule — must come before paragraph so --- isn't swallowed
    if (/^-{3,}$/.test(line.trim())) {
      blocks.push({ type: 'hr' })
      index += 1
      continue
    }

    // Blockquote
    if (line.trimStart().startsWith('>')) {
      const bqLines: string[] = []
      while (index < lines.length && lines[index].trimStart().startsWith('>')) {
        bqLines.push(lines[index].replace(/^>\s?/, ''))
        index += 1
      }
      blocks.push({ type: 'blockquote', text: bqLines.join(' ') })
      continue
    }

    // Table — detect by leading pipe
    if (line.trimStart().startsWith('|')) {
      const tableLines: string[] = []
      while (index < lines.length && lines[index].trimStart().startsWith('|')) {
        tableLines.push(lines[index])
        index += 1
      }
      if (tableLines.length >= 2) {
        const [headerLine, sepLine, ...dataLines] = tableLines
        const headers = parseTableRow(headerLine)
        if (isSeparatorRow(parseTableRow(sepLine))) {
          blocks.push({ type: 'table', headers, rows: dataLines.map(parseTableRow) })
          continue
        }
      }
      // Not a valid table — treat as paragraph text
      blocks.push({ type: 'paragraph', text: tableLines.join(' ') })
      continue
    }

    // Standalone image line: ![alt](src)
    const standaloneImg = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (standaloneImg) {
      blocks.push({ type: 'image', alt: standaloneImg[1], src: standaloneImg[2] })
      index += 1
      continue
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (index < lines.length && lines[index].startsWith('- ')) {
        items.push(lines[index].slice(2).trim())
        index += 1
      }
      blocks.push({ type: 'unordered-list', items })
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^\d+\.\s/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s/, '').trim())
        index += 1
      }
      blocks.push({ type: 'ordered-list', items })
      continue
    }

    // Paragraph — break on any block-level marker
    const paragraph: string[] = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith('```') &&
      !lines[index].startsWith('- ') &&
      !/^\d+\.\s/.test(lines[index]) &&
      !/^(#{1,3})\s+/.test(lines[index]) &&
      !/^-{3,}$/.test(lines[index].trim()) &&
      !lines[index].trimStart().startsWith('>') &&
      !lines[index].trimStart().startsWith('|') &&
      !/^!\[[^\]]*\]\([^)]+\)$/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    if (paragraph.length > 0) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
    }
  }

  return blocks
}

export function MarkdownRenderer({
  content,
  omitFirstH1 = false,
}: {
  content: string
  omitFirstH1?: boolean
}) {
  const blocks = parseBlocks(content)
  const firstH1Index = blocks.findIndex(b => b.type === 'heading' && (b as { level: number }).level === 1)

  return (
    <div className="markdown-flow">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          if (omitFirstH1 && block.level === 1 && index === firstH1Index) {
            return null
          }
          if (block.level === 1) {
            return <h1 key={index} className="markdown-h1">{renderInline(block.text)}</h1>
          }
          if (block.level === 2) {
            return <h2 key={index} className="markdown-h2">{renderInline(block.text)}</h2>
          }
          return <h3 key={index} className="markdown-h3">{renderInline(block.text)}</h3>
        }

        if (block.type === 'paragraph') {
          return <p key={index} className="markdown-paragraph">{renderInline(block.text)}</p>
        }

        if (block.type === 'image') {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={index} src={block.src} alt={block.alt} className="markdown-img" />
          )
        }

        if (block.type === 'table') {
          return (
            <div key={index} className="markdown-table-wrap">
              <table className="markdown-table">
                <thead>
                  <tr>
                    {block.headers.map((h, i) => (
                      <th key={i}>{renderInline(h)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci}>{renderInline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        if (block.type === 'blockquote') {
          return (
            <blockquote key={index} className="markdown-blockquote">
              {renderInline(block.text)}
            </blockquote>
          )
        }

        if (block.type === 'hr') {
          return <hr key={index} className="markdown-hr" />
        }

        if (block.type === 'unordered-list') {
          return (
            <ul key={index} className="markdown-list">
              {block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
            </ul>
          )
        }

        if (block.type === 'ordered-list') {
          return (
            <ol key={index} className="markdown-ordered-list">
              {block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
            </ol>
          )
        }

        if (block.type === 'code') {
          if (block.language === 'mermaid') {
            return <MermaidDiagram key={index} chart={block.content} />
          }
          return (
            <pre key={index} className="markdown-code-block">
              <code>{block.content}</code>
            </pre>
          )
        }

        return null
      })}
    </div>
  )
}
