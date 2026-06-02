# Prompt Nest — Landing Page

Marketing site for [Prompt Nest](https://github.com/bilals2008/prompt-nest) — a calm, native desktop app to organize your AI prompts.

## Stack

- **Vite 8** + **React 19**
- **Tailwind CSS v4** with CSS variables (light + dark themes)
- **shadcn/ui** (radix-nova style) — hand-installed
- **motion** for subtle entrance animations
- **@tabler/icons-react** for icons

## Development

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # static output in dist/
npm run preview
```

## Deployment

Built output is fully static. Drop `dist/` on any static host:

- **Vercel / Netlify** — connect this repo, build = `npm run build`, output = `dist`
- **GitHub Pages** — push `dist/` to a `gh-pages` branch
- **Cloudflare Pages** — same as Vercel

## Live data

The download and changelog sections fetch from the GitHub Releases API:

```
https://api.github.com/repos/bilals2008/prompt-nest/releases
```

If the API is unreachable (rate-limited, offline), the site falls back to a
static link to the latest release page — no broken UI.
