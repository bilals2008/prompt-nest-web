import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion, AnimatePresence } from "motion/react";
import {
  IconArrowUpRight,
  IconDownload,
  IconMenu2,
  IconX,
  IconBrandGithub,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Themes", href: "#themes" },
];

const EXTERNAL_LINKS = [
  { label: "Changelog", href: "/changelog" },
  {
    label: "GitHub",
    href: "https://github.com/bilals2008/prompt-nest",
    icon: IconBrandGithub,
    external: true,
  },
];

export function Navbar({ version }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setActiveHash(window.location.hash);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, []);

  useGSAP(() => {
    if (!headerRef.current) return;
    if (scrolled) {
      gsap.to(headerRef.current, {
        borderColor: "var(--color-border)",
        backgroundColor: "color-mix(in srgb, var(--color-background) 80%, transparent)",
        backdropFilter: "blur(20px) saturate(180%)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else {
      gsap.to(headerRef.current, {
        borderColor: "transparent",
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, { scope: headerRef, dependencies: [scrolled] });

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, { scope: headerRef });

  const isHome = pathname === "/";

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-transparent"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-5">
        <Link
          to="/"
          className="group flex cursor-pointer items-center gap-3"
          aria-label="Prompt Nest home"
        >
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-2xl bg-primary/0 opacity-0 blur-md transition-all duration-300 group-hover:bg-primary/15 group-hover:opacity-100" />
            <img
              src="/logo.png"
              alt="Prompt Nest"
              className="relative size-8 rounded-xl object-cover shadow-[0_0_0_1px_var(--color-border)]"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-foreground sm:text-[15px]">
              Prompt Nest
            </span>
            {version && (
              <span className="mt-1 hidden w-fit rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary sm:inline-flex">
                v{version}
              </span>
            )}
          </div>
        </Link>

        <div className="hidden items-center gap-1 rounded-full bg-card/65 p-1 shadow-[inset_0_0_0_1px_var(--color-border),0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl md:flex">
          {LINKS.map((l) => {
            const isActive = activeHash === l.href;
            return (
              <Link
                key={l.href}
                to={isHome ? l.href : `/${l.href}`}
                className={`group/nav relative cursor-pointer overflow-hidden rounded-full px-3.5 py-2 text-[13px] font-medium ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {!isActive && (
                  <span className="absolute inset-0 rounded-lg bg-accent scale-y-0 origin-bottom transition-all duration-200 ease-out group-hover/nav:scale-y-100" />
                )}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-primary/12 shadow-[inset_0_0_0_1px_var(--color-primary)/0.18]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
          {EXTERNAL_LINKS.map((l) =>
            l.icon ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group/github ml-1 grid size-8 cursor-pointer place-items-center rounded-full text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
                aria-label={l.label}
              >
                <l.icon className="size-4 transition-transform group-hover/github:scale-110" stroke={1.75} />
              </a>
            ) : (
              <Link
                key={l.href}
                to={l.href}
                className="relative cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden rounded-full px-4 shadow-[0_0_24px_var(--color-primary)/0.16] sm:inline-flex"
          >
            <Link to={isHome ? "#download" : "/#download"}>
              <IconDownload className="size-3.5" stroke={2} />
              Download
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full bg-card/70 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? (
              <IconX className="size-4" stroke={2} />
            ) : (
              <IconMenu2 className="size-4" stroke={2} />
            )}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="bg-background/95 px-4 py-4 backdrop-blur-xl">
              <div className="rounded-2xl bg-card/70 p-2 shadow-[inset_0_0_0_1px_var(--color-border)]">
              {LINKS.map((l, i) => {
                const isActive = activeHash === l.href;
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={isHome ? l.href : `/${l.href}`}
                      onClick={() => setOpen(false)}
                      className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isActive && (
                          <span className="size-1.5 rounded-full bg-primary" />
                        )}
                        {l.label}
                      </span>
                      <IconArrowUpRight className="size-3.5 opacity-45" stroke={1.8} />
                    </Link>
                  </motion.div>
                );
              })}
              {EXTERNAL_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (LINKS.length + i) * 0.04 }}
                >
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        {l.icon && <l.icon className="size-4" stroke={1.75} />}
                        {l.label}
                      </span>
                      <IconArrowUpRight className="size-3.5 opacity-45" stroke={1.8} />
                    </a>
                  ) : (
                    <Link
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {l.label}
                      <IconArrowUpRight className="size-3.5 opacity-45" stroke={1.8} />
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (LINKS.length + EXTERNAL_LINKS.length) * 0.04 }}
              >
                <Button asChild size="sm" className="mt-2 h-10 w-full rounded-xl">
                  <Link
                    to={isHome ? "#download" : "/#download"}
                    onClick={() => setOpen(false)}
                  >
                    <IconDownload className="size-3.5" stroke={2} />
                    Download
                  </Link>
                </Button>
              </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
