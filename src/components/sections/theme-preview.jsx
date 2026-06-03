import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { IconPalette, IconCheck } from "@tabler/icons-react";
import { useTheme } from "@/components/theme-provider";
import { THEMES } from "@/data/themes";

gsap.registerPlugin(ScrollTrigger);

export function ThemePreview() {
  const { themeId, setThemeId } = useTheme();
  const sectionRef = useRef(null);
  const swatchesRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      swatchesRef.current.filter(Boolean),
      { opacity: 0, scale: 0.8, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: "back.out(1.7)",
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
        { scale: 1.25 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" }
      );
    }
  };

  return (
    <section
      id="themes"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Themes
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Choose your style.
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            All 19 themes from the desktop app. Pick one and it applies
            everywhere — hero, navbar, download section, everything.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-10 rounded-xl border border-border bg-card p-5"
        >
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <IconPalette className="size-4" stroke={1.75} />
            <span>Pick a theme — changes the whole site instantly</span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
            {THEMES.map((t, idx) => {
              const isActive = t.id === themeId;
              return (
                <button
                  key={t.id}
                  ref={(el) => (swatchesRef.current[idx] = el)}
                  onClick={() => handleThemeChange(t.id)}
                  className={`group relative flex flex-col items-center gap-1.5 rounded-lg p-2.5 transition-all cursor-pointer ${
                    isActive
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-accent"
                  }`}
                >
                  <span
                    className="relative size-7 rounded-md ring-1 ring-border"
                    style={{ background: t.tokens.primary }}
                  >
                    {isActive && (
                      <span className="absolute inset-0 flex items-center justify-center rounded-md bg-black/20 text-white">
                        <IconCheck className="size-3.5" stroke={2} />
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-[10px] leading-tight ${
                      isActive ? "font-medium text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            More themes keep coming with every update.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
