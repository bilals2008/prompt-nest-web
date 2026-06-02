import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconDownload, IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Download", href: "#download" },
  { label: "Changelog", href: "#changelog" },
];

export function Navbar({ version }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background/0"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Prompt Nest home"
        >
          <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
            <svg
              viewBox="0 0 32 32"
              className="size-4"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 11.5C9 10.6716 9.67157 10 10.5 10H21.5C22.3284 10 23 10.6716 23 11.5V13.5C23 14.3284 22.3284 15 21.5 15H10.5C9.67157 15 9 14.3284 9 13.5V11.5Z"
                fill="currentColor"
              />
              <path
                d="M9 18.5C9 17.6716 9.67157 17 10.5 17H17.5C18.3284 17 19 17.6716 19 18.5V20.5C19 21.3284 18.3284 22 17.5 22H10.5C9.67157 22 9 21.3284 9 20.5V18.5Z"
                fill="currentColor"
                fillOpacity="0.65"
              />
            </svg>
          </span>
          <span className="text-sm font-medium tracking-tight">
            Prompt Nest
          </span>
          {version && (
            <span className="hidden sm:inline-flex items-center rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              v{version}
            </span>
          )}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#download">
              <IconDownload className="size-4" stroke={1.75} />
              Download
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <IconX className="size-4" /> : <IconMenu2 className="size-4" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild size="sm" className="mt-1">
                <a href="#download" onClick={() => setOpen(false)}>
                  <IconDownload className="size-4" stroke={1.75} />
                  Download
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
