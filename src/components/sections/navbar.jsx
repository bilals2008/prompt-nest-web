import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { IconDownload, IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Themes", href: "#themes" },
  { label: "Download", href: "#download" },
  { label: "Changelog", href: "/changelog", external: true },
];

export function Navbar({ version }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled
          ? "border-border/80 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          to="/"
          className="flex items-center gap-2.5 cursor-pointer group"
          aria-label="Prompt Nest home"
        >
          <div className="relative">
            <img src="/logo.png" alt="Prompt Nest" className="size-8 rounded-lg object-cover transition-shadow duration-300 group-hover:shadow-[0_0_16px_var(--color-primary)/0.3]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Prompt Nest
            </span>
            {version && (
              <span className="hidden sm:inline-flex items-center rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                v{version}
              </span>
            )}
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) =>
            l.external ? (
              <Link
                key={l.href}
                to={l.href}
                className="relative rounded-md px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
              >
                {l.label}
              </Link>
            ) : (
              <Link
                key={l.href}
                to={isHome ? l.href : `/${l.href}`}
                className="relative rounded-md px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
              >
                {l.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to={isHome ? "#download" : "/#download"}>
              <IconDownload className="size-4" stroke={1.75} />
              Download
            </Link>
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
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 bg-background px-5 py-4">
              {LINKS.map((l) =>
                l.external ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <Link
                    key={l.href}
                    to={isHome ? l.href : `/${l.href}`}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
                  >
                    {l.label}
                  </Link>
                )
              )}
              <Button asChild size="sm" className="mt-2">
                <Link to={isHome ? "#download" : "/#download"} onClick={() => setOpen(false)}>
                  <IconDownload className="size-4" stroke={1.75} />
                  Download
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
