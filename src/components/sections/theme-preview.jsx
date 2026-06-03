import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import {
  IconCheck,
  IconSparkles,
} from "@tabler/icons-react";
import { useTheme } from "@/components/theme-provider";
import { THEMES } from "@/data/themes";

gsap.registerPlugin(ScrollTrigger);

const GROUPS = [
  { key: "light", label: "Light", hint: "Clean daylight palettes" },
  { key: "dark", label: "Dark", hint: "Low-glare workspace tones" },
  { key: "color", label: "Vibrant", hint: "High-contrast accents" },
];

function getGroup(id) {
  const t = THEMES.find((th) => th.id === id);
  if (!t) return "color";
  if (t.group === "light") return "light";
  if (t.group === "dark") return "dark";
  return "color";
}

export function ThemePreview() {
  const { themeId, setThemeId } = useTheme();
  const sectionRef = useRef(null);
  const swatchesRef = useRef([]);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  const handleThemeChange = (id) => {
    const oldSwatch = swatchesRef.current[THEMES.findIndex((t) => t.id === themeId)];
    gsap.to(oldSwatch, { scale: 1, duration: 0.2, ease: "power2.out" });

    setThemeId(id);

    const newIdx = THEMES.findIndex((t) => t.id === id);
    const newSwatch = swatchesRef.current[newIdx];
    if (newSwatch) {
      gsap.fromTo(
        newSwatch,
        { scale: 1.2 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" }
      );
    }
  };

  return (
    <section
      id="themes"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-background py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-[0.025]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[620px] w-[920px] -translate-x-1/2 bg-hero-glow opacity-30"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary/[0.09] px-2.5 py-1.5 text-xs font-semibold text-primary shadow-[inset_0_0_0_1px_var(--color-primary)/0.28,0_0_24px_var(--color-primary)/0.08]">
            <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_14px_var(--color-primary)/0.35]">
              <IconSparkles className="size-3" stroke={2} />
            </span>
            Theme studio
            <span className="rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
              {THEMES.length}
            </span>
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Make the whole app feel like yours.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            Pick a palette once and the interface responds instantly across every screen.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-5xl sm:mt-12">
          <div className="space-y-4">
            {GROUPS.map((g) => {
              const themes = THEMES.filter((t) => getGroup(t.id) === g.key);
              if (themes.length === 0) return null;
              return (
                <div
                  key={g.key}
                  ref={(el) => {
                    const idx = GROUPS.findIndex((group) => group.key === g.key);
                    cardsRef.current[idx] = el;
                  }}
                  className="rounded-2xl bg-card/45 p-3 shadow-sm shadow-black/[0.02] backdrop-blur sm:p-4"
                >
                  <div className="mb-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                        {g.label}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{g.hint}</p>
                    </div>
                    <span className="rounded-full bg-background/70 px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      {themes.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {themes.map((t) => {
                      const globalIdx = THEMES.findIndex((th) => th.id === t.id);
                      const isActive = t.id === themeId;
                      return (
                        <button
                          key={t.id}
                          ref={(el) => (swatchesRef.current[globalIdx] = el)}
                          onClick={() => handleThemeChange(t.id)}
                          className={`group relative flex min-h-20 cursor-pointer flex-col items-stretch overflow-hidden rounded-xl p-2.5 text-left transition-all duration-300 ${
                            isActive
                              ? "bg-primary/[0.08] shadow-lg shadow-primary/10 ring-1 ring-primary/60"
                              : "bg-background/60 hover:bg-accent/60"
                          }`}
                          aria-pressed={isActive}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div
                              className="flex h-8 flex-1 overflow-hidden rounded-lg ring-1 ring-black/5"
                              aria-hidden="true"
                            >
                              <span
                                className="flex-[1.4] transition-all duration-300 group-hover:scale-x-110 group-hover:brightness-110"
                                style={{ background: t.tokens.background }}
                              />
                              <span
                                className="flex-1 transition-all duration-300 group-hover:brightness-110"
                                style={{ background: t.tokens.card }}
                              />
                              <span
                                className="flex-[0.8] transition-all duration-300 group-hover:scale-x-110 group-hover:brightness-110"
                                style={{ background: t.tokens.primary }}
                              />
                            </div>
                            <span
                              className={`grid size-6 shrink-0 place-items-center rounded-full transition-all ${
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card/70 text-transparent group-hover:text-muted-foreground"
                              }`}
                            >
                              {isActive ? (
                                <IconCheck className="size-3.5 text-white" stroke={2.5} />
                              ) : (
                                <span className="size-1.5 rounded-full bg-current" />
                              )}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span
                              className={`min-w-0 truncate text-xs ${
                                isActive
                                  ? "font-semibold text-foreground"
                                  : "font-medium text-muted-foreground"
                              }`}
                            >
                              {t.label}
                            </span>
                            <span
                              className="size-3 rounded-full ring-1 ring-black/5"
                              style={{ background: t.tokens.primary }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
