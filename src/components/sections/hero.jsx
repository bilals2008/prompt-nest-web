import { motion } from "motion/react";
import { IconDownload, IconArrowRight } from "@tabler/icons-react";
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
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-[0.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 bg-hero-glow opacity-40"
      />
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
          >
            <Badge variant="muted" className="gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
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
            className="mt-8 max-w-4xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
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
            <Button asChild size="lg">
              <a href="#download">
                <IconDownload className="size-4" stroke={1.75} />
                Download for Free
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
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-3">
            <span className="size-2.5 rounded-full bg-muted-foreground/20" />
            <span className="size-2.5 rounded-full bg-muted-foreground/20" />
            <span className="size-2.5 rounded-full bg-muted-foreground/20" />
            <div className="ml-3 flex-1 text-center text-[11px] font-medium text-muted-foreground">
              Prompt Nest
            </div>
          </div>
          <div className="aspect-video bg-muted/30">
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
