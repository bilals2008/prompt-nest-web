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
      className="relative overflow-hidden border-b border-[#181830] bg-[#06060c]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[image:linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[length:56px_56px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_#00f0ff_0%,_#ff2a9d_45%,_transparent_65%)] opacity-15 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
          >
            <Badge variant="muted" className="gap-2 border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-4 py-1.5 text-sm">
              <span className="rounded bg-[#ff2a9d]/20 px-2 py-0.5 text-xs font-semibold text-[#ff2a9d]">NEW</span>
              <span className="text-[#7d7d9e]">Introducing Prompt Nest AI</span>
              <IconArrowRight className="size-3.5 text-[#7d7d9e]" stroke={1.75} />
            </Badge>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="mt-8 max-w-4xl text-balance text-5xl font-semibold tracking-tight text-[#e2e2f5] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            All your AI prompts,
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#00f0ff] to-[#ff2a9d] bg-clip-text text-transparent"> neatly nested.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-2xl text-balance text-lg text-[#7d7d9e] sm:text-xl"
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
            <Button asChild size="lg" className="border-0 bg-gradient-to-r from-[#00f0ff] to-[#ff2a9d] font-medium text-[#06060c] shadow-[0_0_24px_rgba(0,240,255,0.25)] hover:opacity-90">
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
    <div className="mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="overflow-hidden rounded-2xl border border-[#181830] bg-[#0c0c16]"
      >
        <div className="flex items-center gap-1.5 border-b border-[#181830] bg-[#101020] px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#181830]" />
          <span className="size-2.5 rounded-full bg-[#181830]" />
          <span className="size-2.5 rounded-full bg-[#181830]" />
          <div className="ml-3 flex-1 text-center text-[11px] font-medium text-[#7d7d9e]">
            Prompt Nest
          </div>
        </div>
        <div className="aspect-video bg-[#0c0c16]">
          <img
            src="https://placehold.co/1200x750/0c0c16/7d7d9e?text=App+Screenshot"
            alt="Prompt Nest app screenshot"
            loading="lazy"
            className="block size-full w-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
