import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { IconPalette, IconCheck, IconSparkles } from "@tabler/icons-react";
import { useTheme } from "@/components/theme-provider";
import { THEMES } from "@/data/themes";

gsap.registerPlugin(ScrollTrigger);

const GROUPS = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "color", label: "Vibrant" },
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

  const activeTheme = THEMES.find((t) => t.id === themeId);

  return (
    <section
      id="themes"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-background py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.04] px-3 py-1.5 text-xs font-medium text-primary">
            <IconSparkles className="size-3.5" stroke={1.75} />
            19 hand-tuned themes
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Choose your style.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground">
            Pick a theme and it applies everywhere — hero, navbar, download section, everything.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-[1fr_340px] lg:gap-6">
          <div className="space-y-3">
            {GROUPS.map((g) => {
              const themes = THEMES.filter((t) => getGroup(t.id) === g.key);
              if (themes.length === 0) return null;
              return (
                <div key={g.key}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {g.label}
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4">
                    {themes.map((t, idx) => {
                      const globalIdx = THEMES.findIndex((th) => th.id === t.id);
                      const isActive = t.id === themeId;
                      return (
                        <button
                          key={t.id}
                          ref={(el) => (swatchesRef.current[globalIdx] = el)}
                          onClick={() => handleThemeChange(t.id)}
                          className={`group relative flex items-center gap-3 rounded-xl border p-3 transition-all cursor-pointer ${
                            isActive
                              ? "border-primary bg-primary/5 shadow-lg shadow-primary/5"
                              : "border-border bg-card hover:border-muted-foreground/20 hover:bg-accent"
                          }`}
                        >
                          <div className="relative shrink-0">
                            <div
                              className="size-8 rounded-lg ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-110"
                              style={{ background: t.tokens.primary }}
                            />
                            {isActive && (
                              <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/25">
                                <IconCheck className="size-3.5 text-white" stroke={2.5} />
                              </span>
                            )}
                          </div>
                          <span
                            className={`truncate text-xs ${
                              isActive
                                ? "font-medium text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {t.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="hidden lg:block"
          >
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-xl">
              <div className="mb-4 flex items-center gap-2">
                <IconPalette className="size-4 text-muted-foreground" stroke={1.75} />
                <span className="text-sm font-medium text-foreground">
                  {activeTheme?.label || "Select a theme"}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <div
                    className="h-16 flex-1 rounded-xl ring-1 ring-black/5"
                    style={{ background: activeTheme?.tokens.primary }}
                  />
                  <div
                    className="h-16 flex-1 rounded-xl ring-1 ring-black/5"
                    style={{ background: activeTheme?.tokens.background }}
                  />
                  <div
                    className="h-16 flex-1 rounded-xl ring-1 ring-black/5"
                    style={{ background: activeTheme?.tokens.card }}
                  />
                </div>

                <div className="flex gap-2">
                  <div
                    className="h-10 flex-1 rounded-lg ring-1 ring-black/5"
                    style={{ background: activeTheme?.tokens.muted }}
                  />
                  <div
                    className="h-10 flex-1 rounded-lg ring-1 ring-black/5"
                    style={{ background: activeTheme?.tokens.secondary }}
                  />
                  <div
                    className="h-10 flex-1 rounded-lg ring-1 ring-black/5"
                    style={{ background: activeTheme?.tokens.accent }}
                  />
                </div>

                <div
                  className="flex items-center gap-3 rounded-xl border p-3"
                  style={{
                    borderColor: activeTheme?.tokens.border,
                    background: activeTheme?.tokens.background,
                  }}
                >
                  <div
                    className="size-8 rounded-lg"
                    style={{ background: activeTheme?.tokens.primary }}
                  />
                  <div className="flex-1">
                    <div
                      className="h-2.5 w-24 rounded-full"
                      style={{ background: activeTheme?.tokens.foreground }}
                    />
                    <div
                      className="mt-1.5 h-2 w-16 rounded-full"
                      style={{ background: activeTheme?.tokens["muted-foreground"] }}
                    />
                  </div>
                  <div
                    className="rounded-lg px-3 py-1.5 text-[10px] font-medium"
                    style={{
                      background: activeTheme?.tokens.primary,
                      color: activeTheme?.tokens["primary-foreground"],
                    }}
                  >
                    Button
                  </div>
                </div>

                <p className="text-center text-[11px] text-muted-foreground">
                  {THEMES.length} themes available
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground sm:hidden">
          Tap any theme — the whole site changes instantly.
        </p>
      </div>
    </section>
  );
}
