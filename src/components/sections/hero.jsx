import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "motion/react";
import {
  IconDownload,
  IconArrowRight,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { WindowsLogo } from "@/components/icons/windows-logo";
import { AppleLogo } from "@/components/icons/apple-logo";
import { LinuxLogo } from "@/components/icons/linux-logo";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export function Hero({ version: _version }) {
  const sectionRef = useRef(null);
  const previewRef = useRef(null);

  useGSAP(() => {
    const el = previewRef.current;
    if (!el) return;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * 4,
        rotateX: -y * 4,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: "power2.out",
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-[0.03]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[760px] w-[1000px] -translate-x-1/2 bg-hero-glow opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-20 -z-10 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-40 -z-10 h-[250px] w-[250px] rounded-full bg-primary/5 blur-[80px]"
      />

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-5 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
          >
            <Link
              to="#showcase"
              className="group inline-flex items-center gap-2.5 rounded-full bg-primary/[0.08] px-1.5 py-1.5 pr-4 text-sm font-medium text-primary shadow-[inset_0_0_0_1px_var(--color-primary)/0.22,0_0_28px_var(--color-primary)/0.08] transition-all duration-300 hover:bg-primary/[0.12]"
            >
              <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold tracking-wider text-primary-foreground shadow-[0_0_12px_var(--color-primary)/0.35]">
                NEW
              </span>
              <span className="text-muted-foreground">Introducing Prompt Nest AI</span>
              <IconArrowRight
                className="size-3.5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5"
                stroke={1.75}
              />
            </Link>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="mt-7 max-w-5xl text-balance font-[var(--font-display)] text-5xl font-bold italic tracking-normal text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Your prompt library,
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-primary/85 to-primary bg-clip-text text-transparent">
              {" "}finally in order.
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"
          >
            A calm, native desktop app to organize, search, and reuse your
            prompts. Built for Windows, macOS, and Linux.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:gap-4"
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="#download">
                <IconDownload className="size-4" stroke={1.75} />
                Download for Free
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link to="#features">
                Learn more
                <IconArrowRight className="size-4" stroke={1.75} />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={4}
            className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground sm:mt-6"
          >
            <span className="flex items-center gap-1.5">
              <WindowsLogo className="size-3.5" />
              Windows
            </span>
            <span className="size-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <AppleLogo className="size-3.5" />
              macOS
            </span>
            <span className="size-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <LinuxLogo className="size-3.5" />
              Linux
            </span>
          </motion.div>
        </div>

        <motion.div
          ref={previewRef}
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="mx-auto mt-12 max-w-5xl sm:mt-14"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 opacity-50 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-px -z-10 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.15), transparent 40%, transparent 60%, rgba(99,102,241,0.1))",
              }}
            />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <div className="ml-4 flex-1 text-center text-[11px] font-medium text-muted-foreground">
                  Prompt Nest
                </div>
              </div>
              <div className="group/img relative flex aspect-video items-center justify-center overflow-hidden bg-muted/20">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/img:opacity-100" />
                <div className="absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover/img:translate-x-full" />
                <img
                  src="https://placehold.co/1200x675/12121a/7d7d9e?text=App+Screenshot"
                  alt="Prompt Nest app preview"
                  className="block size-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 left-[15%] right-[15%] -z-10 h-10 rounded-[50%] bg-primary/10 blur-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
