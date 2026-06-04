# 🪹 Prompt Nest — Website

Marketing website for **Prompt Nest** — a calm, native desktop app to organize, search, and reuse your AI prompts.

Built with React 19, Vite 8, and Tailwind CSS v4. Deployed on [Netlify](https://promptnest-web.netlify.app).

## 🛠 Tech Stack

- [React](https://react.dev/) — UI framework
- [Vite](https://vite.dev/) — Build tool
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [GSAP](https://greensock.com/gsap/) — Animations
- [Motion](https://motion.dev/) — Declarative animations
- [Radix UI](https://www.radix-ui.com/) — Accessible primitives
- [Tabler Icons](https://tabler.io/icons) — Icons
- [Formspree](https://formspree.io/) — Form handling

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
