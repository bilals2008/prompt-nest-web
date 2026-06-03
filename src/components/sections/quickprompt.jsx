// File: src/components/sections/quickprompt.jsx
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  IconBolt,
  IconCheck,
  IconStar,
  IconSearch,
  IconPalette,
  IconKeyboard,
  IconBrandGithub,
  IconExternalLink,
} from "@tabler/icons-react";

const FEATURES = [
  { icon: IconBolt, text: "Floating action button for instant saves" },
  { icon: IconCheck, text: "One-click copy to clipboard" },
  { icon: IconStar, text: "Favorites with smart filtering" },
  { icon: IconSearch, text: "Full-text search across all prompts" },
  { icon: IconPalette, text: "Multiple themes — Light, Dark, Forest, Ocean" },
  { icon: IconKeyboard, text: "Fully keyboard-friendly navigation" },
];

export function QuickPrompt() {
  return (
    <section id="quickprompt" className="relative overflow-hidden border-t border-border bg-background py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 bg-hero-glow opacity-15"
      />
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="tint" className="mb-4">
            <IconBolt className="size-3" stroke={1.75} />
            Also Check Out
          </Badge>
          <h2 className="text-balance text-3xl font-serif italic tracking-tight text-foreground sm:text-4xl">
            Looking for something simpler?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <div className="flex-1">
              <div className="mb-6 flex items-center gap-2">
                <span className="text-xl font-semibold text-foreground">QuickPrompt</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">v1.4</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {FEATURES.map((f) => (
                  <div key={f.text} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <f.icon className="size-3 text-primary" stroke={2} />
                    </div>
                    <span className="text-sm text-muted-foreground font-[var(--font-body)]">{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/bilals2008/QuickPrompt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                >
                  <IconBrandGithub className="size-4" stroke={2} />
                  View on GitHub
                </a>
                <a
                  href="https://quickprompt-web.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent active:scale-[0.97]"
                >
                  <IconExternalLink className="size-4" stroke={2} />
                  Try QuickPrompt
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
