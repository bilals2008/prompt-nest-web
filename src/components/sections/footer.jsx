import { useEffect, useState } from "react";
import { IconArrowUp, IconBrandGithub } from "@tabler/icons-react";
import { useTheme } from "@/components/theme-provider";
import { THEMES } from "@/data/themes";
import SOCIALS from "@/data/socials.json";

const SOCIAL_ORDER = ["github", "x", "linkedin", "youtube", "discord"];

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  const { themeId } = useTheme();
  const currentTheme = THEMES.find((t) => t.id === themeId);
  const isDark = currentTheme?.group === "dark";

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 520);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-8 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
            <img
              src="/logo.avif"
              alt="Prompt Nest"
              className="size-5 rounded object-cover"
            />
            <span>Built by</span>
            <a
              href="https://github.com/bilals2008"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer font-medium text-foreground transition-colors hover:text-primary"
            >
              Muhammad Bilal Hassan
            </a>
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL_ORDER.map((key) => {
              const s = SOCIALS[key];
              return (
                <a
                  key={key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-accent"
                >
                  <img
                    src={isDark ? s.icon.dark : s.icon.light}
                    alt={s.label}
                    className="size-5"
                  />
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://github.com/bilals2008/prompt-nest"
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <IconBrandGithub className="size-4" stroke={1.75} />
              Source
            </a>
            <a
              href="https://github.com/bilals2008/prompt-nest/issues"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition-colors hover:text-foreground"
            >
              Issues
            </a>
            <a
              href="https://github.com/bilals2008/prompt-nest/releases"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition-colors hover:text-foreground"
            >
              Releases
            </a>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-50 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_34px_var(--color-primary)/0.22] transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <IconArrowUp className="size-5" stroke={2} />
      </button>
    </>
  );
}
