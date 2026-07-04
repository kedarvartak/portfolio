# Kedar Vartak — Portfolio

The source for [kedarvartak.com](https://www.kedarvartak.com): my personal portfolio for practical AI systems, coding-agent tooling, and engineering writeups.

## What is here

- **Agents** — projects built for real software workflows, including [Rote](https://github.com/kedarvartak/rote), [Glassbox](https://github.com/kedarvartak/glassbox), [Easy Sanity](https://github.com/kedarvartak/easy-sanity), [Agent Vision](https://github.com/kedarvartak/agent-vision), and [Multi Agent Memo](https://github.com/kedarvartak/multi-agent-memo).
- **Writeups** — technical notes on agent harnesses, context and memory, prompting, graph workflows, and production engineering.
- **Project documentation** — an in-depth guide to Easy Sanity and its browser-based regression testing workflow.
- **Experiments** — smaller ideas and observations that do not need a full technical article.

## Stack

- Next.js 14 with the App Router
- React 18 and TypeScript
- Hand-rolled Markdown rendering with Mermaid support
- Framer Motion
- Vercel Analytics
- PostHog product analytics for pageviews, route changes, outbound/internal link clicks, page leaves, and theme toggles
- Static generation for writeups

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add your PostHog project key to `.env.local` as `NEXT_PUBLIC_POSTHOG_KEY`. Set `NEXT_PUBLIC_POSTHOG_HOST` to your PostHog region (`https://us.i.posthog.com` or `https://eu.i.posthog.com`).

Open [http://localhost:3000](http://localhost:3000).

For a production check:

```bash
npm run build
npm start
```

## Content

Writeups live in [`writeups/`](./writeups) as Markdown files with `title`, `date`, and `excerpt` frontmatter. Static diagram assets live in [`public/`](./public).

## Contact

[Website](https://www.kedarvartak.com) · [GitHub](https://github.com/kedarvartak) · [LinkedIn](https://linkedin.com/in/kedar-vartak20) · [Email](mailto:kedarvartak01@gmail.com)
