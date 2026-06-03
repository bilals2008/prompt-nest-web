import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { IconDownload, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { WindowsLogo } from "@/components/icons/windows-logo";
import { AppleLogo } from "@/components/icons/apple-logo";
import { LinuxLogo } from "@/components/icons/linux-logo";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

function DotGrid({ sectionRef }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const dotsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function draw() {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      const radius = 1.2;
      const influence = 80;

      dotsRef.current.forEach((dot) => {
        const dx = (dot.x - mx * w) * 0.03;
        const dy = (dot.y - my * h) * 0.03;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const strength = Math.max(0, 1 - dist / influence);
        const ox = dx * strength;
        const oy = dy * strength;

        ctx.beginPath();
        ctx.arc(dot.x + ox, dot.y + oy, radius + strength * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 226, 245, ${0.08 + strength * 0.12})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const spacing = 40;
      dotsRef.current = [];
      for (let x = spacing; x < rect.width; x += spacing) {
        for (let y = spacing; y < rect.height; y += spacing) {
          dotsRef.current.push({ x, y });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const onLeave = () => {
      mouseRef.current = { x: 0.5, y: 0.5 };
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", onMove);
      section.addEventListener("mouseleave", onLeave);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (section) {
        section.removeEventListener("mousemove", onMove);
        section.removeEventListener("mouseleave", onLeave);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    />
  );
}

export function Hero({ version: _version }) {
  const sectionRef = useRef(null);
  const previewRef = useRef(null);

  useGSAP(() => {
    if (previewRef.current) {
      gsap.fromTo(
        previewRef.current,
        { y: 30 },
        {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      gsap.to(previewRef.current, {
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-background perspective-[1200px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--color-backdrop)_0%,transparent_70%)] opacity-40"
      />
      <DotGrid sectionRef={sectionRef} />
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
          ref={previewRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mx-auto mt-20 max-w-5xl"
          style={{ transformStyle: "preserve-3d" }}
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
