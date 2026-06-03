import { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import {
  IconFolder,
  IconSearch,
  IconKeyboard,
  IconPalette,
  IconDatabase,
  IconCpu,
  IconArrowRight,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: IconFolder,
    title: "Workspaces & folders",
    body: "Group prompts by project, client, or topic. Nest, drag, and reorganize without breaking workflows.",
    color: "#6366f1",
  },
  {
    icon: IconSearch,
    title: "Instant search",
    body: "Full text search across every prompt, tag, and note. Find the right one in milliseconds.",
    color: "#f59e0b",
  },
  {
    icon: IconKeyboard,
    title: "Keyboard-first",
    body: "Every action has a shortcut. Open the palette, copy, paste, switch workspaces — without leaving the keys.",
    color: "#22d3ee",
  },
  {
    icon: IconPalette,
    title: "15+ hand-tuned themes",
    body: "Dark, light, vibrant accents. Pick what matches your setup. Make it truly yours.",
    color: "#f472b6",
  },
  {
    icon: IconDatabase,
    title: "Local-first & private",
    body: "Your prompts live in a local SQLite database. No accounts, no cloud, no telemetry. You own the data.",
    color: "#34d399",
  },
  {
    icon: IconCpu,
    title: "Native & fast",
    body: "Built on Electron with a tiny footprint. Launches instantly, stays out of your way. Pure performance.",
    color: "#fb923c",
  },
];

export function Features() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const inner = card.querySelector("[data-bento-inner]");
      if (!inner) return;

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        inner.style.setProperty("--mouse-x", `${x}%`);
        inner.style.setProperty("--mouse-y", `${y}%`);
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-background py-16 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div ref={headingRef} className="mb-12 text-center sm:mb-16">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need,
            <br className="hidden sm:block" />
            <span className="text-muted-foreground"> nothing you don&apos;t.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground sm:mt-5 sm:text-lg">
            No bloated editor, no cloud lock-in, no accounts. Just a focused
            tool that gets out of your way.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {FEATURES.map((feature, i) => (
            <BentoCard
              key={feature.title}
              feature={feature}
              ref={(el) => (cardsRef.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const BentoCard = forwardRef(({ feature }, cardRef) => {
  const { icon: Icon, title, body, color } = feature;
  const innerRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="group relative min-h-[180px] sm:min-h-[200px]"
    >
      <div
        ref={innerRef}
        data-bento-inner
        className="relative h-full overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-500 hover:border-transparent sm:rounded-2xl sm:p-6 lg:p-7"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${color}08, transparent 50%)`,
          }}
        />
        <div
          className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}20, transparent 40%, ${color}10)`,
          }}
        />

        <div className="relative flex h-full flex-col">
          <div
            className="mb-3 inline-flex size-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 sm:mb-5 sm:size-12 sm:rounded-xl"
            style={{ background: `${color}12` }}
          >
            <Icon className="size-5 sm:size-6" style={{ color }} stroke={1.5} />
          </div>

          <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {title}
          </h3>
          <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
            {body}
          </p>

          <div
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 sm:mt-5"
            style={{ color }}
          >
            Learn more
            <IconArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              stroke={2}
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute -bottom-20 -right-20 size-40 rounded-full opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.08]"
          style={{ background: color }}
        />
      </div>
    </div>
  );
});
