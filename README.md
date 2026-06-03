# 🪹 Prompt Nest

A calm, native desktop app to organize, search, and reuse your AI prompts. Built with Electron, React, and Tailwind CSS.

## ✨ Features

- **Workspaces & Folders** — Nest folders, drag-and-drop reordering, unlimited workspaces
- **Instant Search** — Full-text search across titles, bodies, and tags with live filtering
- **Keyboard-First** — Every action has a shortcut via command palette
- **15+ Themes** — Hand-tuned dark, light, and vibrant themes
- **Local-First** — SQLite database, no accounts, no cloud, no telemetry
- **Native & Fast** — Electron-based with tiny footprint and instant launch
- **Auto-Updates** — Differential downloads with zero surprise restarts

## 🛠 Tech Stack

- [React](https://react.dev/) — UI framework
- [Vite](https://vite.dev/) — Build tool
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Electron](https://www.electronjs.org/) — Desktop runtime
- [GSAP](https://greensock.com/gsap/) — Animations
- [Motion](https://motion.dev/) — Declarative animations

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FORMSPREE_FORM_ID=your_formspree_form_id
```

| Variable | Description |
|---|---|
| `VITE_FORMSPREE_FORM_ID` | Formspree form ID for the waitlist notification form |

## 📁 Project Structure

```
src/
├── components/
│   ├── icons/          # Platform logo components
│   ├── sections/       # Page sections (hero, features, download, etc.)
│   ├── ui/             # Reusable UI components (button, card, badge, dialog)
│   └── pages/          # Route pages
├── data/               # Theme definitions, changelog data
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── index.css           # Global styles and Tailwind config
├── main.jsx            # App entry point
└── App.jsx             # Router setup
```

## 👤 Author

[Muhammad Bilal Hassan](https://github.com/bilals2008)
