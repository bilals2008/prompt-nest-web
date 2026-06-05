import { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconFolder,
  IconSearch,
  IconKeyboard,
  IconPalette,
  IconDatabase,
  IconCpu,
  IconCheck,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: IconFolder,
    eyebrow: "Workspaces",
    title: "Organize prompts into folders",
    body: "Group prompts by project, client, or topic. Nest folders, drag to reorganize, and keep your library structured without breaking workflows.",
    bullets: ["Nested folder hierarchy", "Drag & drop reordering", "Project-based grouping"],
    color: "#6366f1",
    image: "https://placehold.co/1000x650/0c0c14/ededee?text=Workspaces+%26+Folders",
    imageAlt: "Prompt Nest workspace folders panel",
  },
  {
    icon: IconSearch,
    eyebrow: "Search",
    title: "Find any prompt in milliseconds",
    body: "Full-text search across titles, bodies, and tags. Filter by workspace, tag, or recency. The results update as you type.",
    bullets: ["Live search-as-you-type", "Tag & workspace filters", "Recent & pinned shortcuts"],
    color: "#f59e0b",
    image: "https://placehold.co/1000x650/0c0c14/ededee?text=Instant+Search",
    imageAlt: "Prompt Nest search interface with filters",
    reverse: true,
  },
  {
    icon: IconKeyboard,
    eyebrow: "Shortcuts",
    title: "Keyboard-first navigation",
    body: "Every action has a shortcut. Open the command palette, copy, paste, switch workspaces — all without leaving the keyboard.",
    bullets: ["Ctrl+K command palette", "Global keyboard shortcuts", "Mouse-free workflows"],
    color: "#22d3ee",
    image: "https://placehold.co/1000x650/0c0c14/ededee?text=Keyboard+Shortcuts",
    imageAlt: "Prompt Nest command palette overlay",
  },
  {
    icon: IconPalette,
    eyebrow: "Themes",
    title: "15+ hand-tuned themes",
    body: "Dark, light, and vibrant accent themes. Pick what matches your setup. One click to switch, zero compromise on readability.",
    bullets: ["Dark, light & vibrant modes", "One-click theme switching", "Consistent contrast ratios"],
    color: "#f472b6",
    image: "https://placehold.co/1000x650/0c0c14/ededee?text=15%2B+Themes",
    imageAlt: "Prompt Nest theme picker with color previews",
    reverse: true,
  },
  {
    icon: IconDatabase,
    eyebrow: "Privacy",
    title: "Local-first & completely private",
    body: "Your prompts live in a local SQLite database. No accounts, no cloud sync, no telemetry. Your data never leaves your machine.",
    bullets: ["SQLite local database", "Zero cloud dependency", "No telemetry or tracking"],
    color: "#34d399",
    image: "https://placehold.co/1000x650/0c0c14/ededee?text=Local-First+Database",
    imageAlt: " Prompt Nest local database architecture",
  },
  {
    icon: IconCpu,
    eyebrow: "Performance",
    title: "Native, fast, and lightweight",
    body: "Built on Electron with a tiny footprint. Launches instantly, stays out of your way. Pure performance — no bloat, no lag.",
    bullets: ["Instant cold start", "Minimal RAM usage", "Smooth 60fps UI"],
    color: "#fb923c",
    image: "https://placehold.co/1000x650/0c0c14/ededee?text=Native+%26+Fast",
    imageAlt: "Prompt Nest performance metrics dashboard",
    reverse: true,
  },
];

export function Features() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const headingRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      }
    );

    itemsRef.current.forEach((item, i) => {
      if (!item) return;

      const content = item.querySelector("[data-content]");
      const visual = item.querySelector("[data-visual]");
      const number = item.querySelector("[data-number]");
      const bullets = item.querySelectorAll("[data-bullet]");
      const img = item.querySelector("[data-parallax-img]");

      if (img) {
        gsap.fromTo(img, { y: 40, scale: 1.08 }, {
          y: -40, scale: 1, ease: "none",
          scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 2 },
        });
      }

      if (content) {
        gsap.fromTo(content, { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }, {
          opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "play none none reverse" },
        });
      }

      if (visual) {
        gsap.fromTo(visual, { opacity: 0, y: 50, scale: 0.92 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 75%", toggleActions: "play none none reverse" },
        });
      }

      if (number) {
        gsap.fromTo(number, { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)",
          scrollTrigger: { trigger: item, start: "top 82%", toggleActions: "play none none reverse" },
        });
      }

      bullets.forEach((b, bi) => {
        gsap.fromTo(b, { opacity: 0, x: -15 }, {
          opacity: 1, x: 0, duration: 0.4, delay: bi * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 75%", toggleActions: "play none none reverse" },
        });
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 bg-hero-glow opacity-20"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 lg:py-28">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <Badge variant="tint" className="mb-4">
            <IconFolder className="size-3" stroke={1.75} />
            Features
          </Badge>
          <h2 className="mt-3 text-balance text-3xl font-serif italic tracking-tight sm:text-4xl">
            Everything you need, nothing you don&apos;t.
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground font-[var(--font-body)]">
            No bloated editor, no cloud lock-in, no accounts. Just a focused tool that gets out of your way.
          </p>
        </div>

        <div className="relative mt-20">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 bottom-0 -z-10 hidden w-px bg-gradient-to-b from-transparent via-border to-transparent lg:block"
          />

          <div className="flex flex-col gap-16 sm:gap-20 lg:gap-28">
            {FEATURES.map((feature, i) => (
              <FeatureBlock
                key={feature.title}
                feature={feature}
                index={i + 1}
                ref={(el) => (itemsRef.current[i] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureBlock = forwardRef(({ feature, index }, blockRef) => {
  const { reverse, icon: Icon, eyebrow, title, body, bullets, color, image, imageAlt } = feature;
  const visualRef = useRef(null);

  useGSAP(() => {
    const el = visualRef.current;
    if (!el) return;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el.querySelector("[data-mockup]"), {
        rotateX: -y * 3,
        rotateY: x * 3,
        duration: 0.8, ease: "power2.out", overwrite: "auto",
      });
      gsap.to(el.querySelector("[data-glow]"), {
        x: x * 10, y: y * 10, duration: 1, ease: "power2.out", overwrite: "auto",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el.querySelector("[data-mockup]"), { rotateX: 0, rotateY: 0, duration: 1, ease: "power2.out" });
      gsap.to(el.querySelector("[data-glow]"), { x: 0, y: 0, duration: 1.2, ease: "power2.out" });
    });
  }, { scope: visualRef });

  return (
    <div
      ref={blockRef}
      className={`relative grid items-center gap-8 sm:gap-10 lg:gap-16 ${
        reverse ? "lg:grid-flow-col-dense" : ""
      } lg:grid-cols-2`}
    >
      <div
        data-number
        className="absolute left-1/2 top-0 hidden -translate-x-1/2 lg:grid"
      >
        <div
          className="grid size-12 place-items-center rounded-full border-2 font-mono text-sm font-bold"
          style={{ borderColor: color, color, background: `${color}10` }}
        >
          {String(index).padStart(2, "0")}
        </div>
      </div>

      <div data-content className={reverse ? "lg:col-start-2" : ""}>
        <div
          className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
          style={{ borderColor: `${color}30`, background: `${color}08` }}
        >
          <Icon className="size-4" style={{ color }} stroke={1.75} />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color }}
          >
            {eyebrow}
          </span>
        </div>

        <h3 className="text-balance text-2xl font-serif italic tracking-tight sm:text-3xl">{title}</h3>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">{body}</p>

        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li
              key={b}
              data-bullet
              className="flex items-center gap-3 text-sm text-foreground"
            >
              <span
                className="grid size-6 shrink-0 place-items-center rounded-full"
                style={{ background: `${color}15`, color }}
              >
                <IconCheck className="size-3.5" stroke={2.5} />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={visualRef}
        data-visual
        className={`group ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}
        style={{ perspective: "1000px" }}
      >
        <div className="relative" data-mockup style={{ transformStyle: "preserve-3d" }}>
          <div
            data-glow
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: `${color}15` }}
          />

          <div
            className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${color}30, transparent 40%, transparent 60%, ${color}15)`,
            }}
          />

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-macos-red" />
              <span className="size-2.5 rounded-full bg-macos-yellow" />
              <span className="size-2.5 rounded-full bg-macos-green" />
              <div className="ml-4 flex-1 text-center text-[11px] font-medium text-muted-foreground">
                Prompt Nest
              </div>
            </div>
            <div className="group/img relative overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/img:opacity-100" />
              <div className="absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover/img:translate-x-full" />
              <img
                data-parallax-img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="block w-full transition-transform duration-700 ease-out will-change-transform group-hover/img:scale-[1.03]"
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-5 left-[15%] right-[15%] -z-10 h-8 rounded-[50%] blur-xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
            style={{ background: `${color}18` }}
          />
        </div>
      </div>
    </div>
  );
});
