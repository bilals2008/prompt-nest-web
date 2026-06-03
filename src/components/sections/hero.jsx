import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { IconDownload, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { WindowsLogo } from "@/components/icons/windows-logo";
import { AppleLogo } from "@/components/icons/apple-logo";
import { LinuxLogo } from "@/components/icons/linux-logo";

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
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[700px] w-[900px] -translate-x-1/2 bg-hero-glow opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 -z-10 h-[500px] w-[500px] animate-blob rounded-full bg-primary/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 -z-10 h-[500px] w-[500px] animate-blob-reverse rounded-full bg-purple-500/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 -z-10 h-[300px] w-[300px] animate-blob-slow rounded-full bg-cyan-500/15 blur-[80px]"
      />
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.04] px-4 py-1.5 text-sm shadow-[0_0_20px_var(--color-primary)/0.06]">
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-primary-foreground shadow-[0_0_10px_var(--color-primary)/0.3]">NEW</span>
              <span className="text-muted-foreground">Introducing Prompt Nest AI</span>
              <IconArrowRight className="size-3.5 text-muted-foreground" stroke={1.75} />
            </div>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="mt-8 max-w-5xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            All your AI prompts,
            <br className="hidden sm:block" />
            <span className="text-primary"> neatly nested.</span>
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
              <Link to="#download">
                <IconDownload className="size-4" stroke={1.75} />
                Download for Free
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="#features">
                Learn more
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={4}
            className="mt-6 flex items-center justify-center gap-5 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <WindowsLogo className="size-3.5" />
              Windows
            </span>
            <span className="flex items-center gap-1.5">
              <AppleLogo className="size-3.5" />
              macOS
            </span>
            <span className="flex items-center gap-1.5">
              <LinuxLogo className="size-3.5" />
              Linux
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mx-auto mt-20 max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-3">
              <span className="size-3 rounded-full bg-destructive" />
              <span className="size-3 rounded-full bg-warning" />
              <span className="size-3 rounded-full bg-primary" />
              <div className="ml-3 flex-1 text-center text-xs font-medium text-muted-foreground">
                Prompt Nest — App Preview
              </div>
            </div>
            <div className="flex aspect-video items-center justify-center bg-muted/20">
              <img
                src="https://placehold.co/1200x675/12121a/7d7d9e?text=App+Screenshot"
                alt="Prompt Nest app preview"
                className="block size-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
