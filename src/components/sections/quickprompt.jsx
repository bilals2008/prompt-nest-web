import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { IconBolt, IconBrandGithub, IconExternalLink } from "@tabler/icons-react";

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
          className="mx-auto max-w-xl text-center"
        >
          <Badge variant="tint" className="mb-4">
            <IconBolt className="size-3" stroke={1.75} />
            Also Check Out
          </Badge>
          <h2 className="text-balance text-3xl font-serif italic tracking-tight text-foreground sm:text-4xl">
            Looking for something simpler?
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground font-[var(--font-body)]">
            QuickPrompt is a lightweight prompt manager — save, tag, and copy prompts instantly. No fuss.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://quickprompt-web.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            >
              <IconExternalLink className="size-4" stroke={2} />
              Try QuickPrompt
            </a>
            <a
              href="https://github.com/bilals2008/QuickPrompt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent active:scale-[0.97]"
            >
              <IconBrandGithub className="size-4" stroke={2} />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
