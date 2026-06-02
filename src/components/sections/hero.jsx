import { motion } from "motion/react";
import {
  IconDownload,
  IconBrandGithub,
  IconArrowRight,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

export function Hero({ version }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--accent)_0%,_transparent_55%)] opacity-40"
      />
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
          >
            <Badge variant="muted" className="gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              v{version} · Available now
            </Badge>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-3xl text-balance text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl"
          >
            All your AI prompts,
            <br className="hidden sm:block" />
            <span className="text-muted-foreground"> neatly nested.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            A calm, native desktop app to organize, search, and reuse your
            prompts. Built for Windows, macOS, and Linux.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#download">
                <IconDownload className="size-4" stroke={1.75} />
                Download for desktop
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://github.com/bilals2008/prompt-nest"
                target="_blank"
                rel="noreferrer"
              >
                <IconBrandGithub className="size-4" stroke={1.75} />
                View on GitHub
                <IconArrowRight className="size-3.5" stroke={1.75} />
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={4}
            className="mt-4 text-xs text-muted-foreground"
          >
            Free · Open source · No account required
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <AppPreview />
        </motion.div>
      </div>
    </section>
  );
}

function AppPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <div className="ml-3 flex-1 text-center text-[11px] font-medium text-muted-foreground">
          Prompt Nest
        </div>
      </div>
      <div className="bg-muted/20">
        <img
          src="https://placehold.co/1200x750/0c0c14/ededee?text=App+Screenshot"
          alt="Prompt Nest desktop app — workspaces, search, and prompt library"
          loading="lazy"
          className="block size-full w-full"
        />
      </div>
    </div>
  );
}

