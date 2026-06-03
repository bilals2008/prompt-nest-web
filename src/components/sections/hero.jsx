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
      className="relative overflow-hidden border-b border-border bg-[#0a0a0f]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--accent)_0%,_transparent_55%)] opacity-30"
      />
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
          >
            <Badge variant="muted" className="gap-2 border border-white/10 bg-white/5 px-4 py-1.5 text-sm">
              <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">NEW</span>
              <span className="text-muted-foreground">Introducing Prompt Nest AI</span>
              <IconArrowRight className="size-3.5 text-muted-foreground" stroke={1.75} />
            </Badge>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="mt-8 max-w-4xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
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
            className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl"
          >
            A calm, native desktop app to organize, search, and reuse your
            prompts. Built for Windows, macOS, and Linux.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <a href="#download">
                <IconDownload className="size-4" stroke={1.75} />
                Download for Free
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent hover:bg-white/5">
              <a href="https://github.com/bilals2008/prompt-nest" target="_blank" rel="noopener noreferrer">
                <IconBrandGithub className="size-4" stroke={1.75} />
                View on GitHub
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mx-auto mt-20 max-w-6xl"
        >
          <AppPreview />
        </motion.div>
      </div>
    </section>
  );
}

function AppPreview() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((num) => (
        <motion.div
          key={num}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + num * 0.1 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <div className="ml-3 flex-1 text-center text-[11px] font-medium text-muted-foreground">
              Prompt Nest
            </div>
          </div>
          <div className="aspect-video bg-white/5">
            <img
              src={`https://placehold.co/800x500/12121a/ededee?text=Feature+${num}`}
              alt={`Prompt Nest feature ${num}`}
              loading="lazy"
              className="block size-full object-cover"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

