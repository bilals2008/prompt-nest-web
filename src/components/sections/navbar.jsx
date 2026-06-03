import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { IconDownload, IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Download", href: "#download" },
  { label: "Changelog", href: "/changelog", external: true },
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
          ? "border-[#181830] bg-[#06060c]/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a
          href="/"
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Prompt Nest home"
        >
          <img src="/logo.png" alt="Prompt Nest" className="size-7 rounded-lg object-cover" />
          <span className="text-sm font-medium tracking-tight text-[#e2e2f5]">
            Prompt Nest
          </span>
          {version && (
            <span className="hidden sm:inline-flex items-center rounded-md border border-[#181830] bg-[#101020] px-1.5 py-0.5 text-[10px] font-medium text-[#7d7d9e]">
              v{version}
            </span>
          )}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) =>
            l.external ? (
              <Link
                key={l.href}
                to={l.href}
                className="rounded-md px-3 py-1.5 text-sm text-[#7d7d9e] transition-colors hover:bg-[#101020] hover:text-[#e2e2f5] cursor-pointer"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-1.5 text-sm text-[#7d7d9e] transition-colors hover:bg-[#101020] hover:text-[#e2e2f5] cursor-pointer"
              >
                {l.label}
              </a>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex border-0 bg-gradient-to-r from-[#00f0ff] to-[#ff2a9d] text-[#06060c] font-medium hover:opacity-90">
            <a href="#download">
              <IconDownload className="size-4" stroke={1.75} />
              Download
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#7d7d9e] hover:text-[#e2e2f5] hover:bg-[#101020]"
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
            className="overflow-hidden border-t border-[#181830] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3 bg-[#06060c]">
              {LINKS.map((l) =>
                l.external ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-[#7d7d9e] transition-colors hover:bg-[#101020] hover:text-[#e2e2f5] cursor-pointer"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-[#7d7d9e] transition-colors hover:bg-[#101020] hover:text-[#e2e2f5] cursor-pointer"
                  >
                    {l.label}
                  </a>
                )
              )}
              <Button asChild size="sm" className="mt-1 border-0 bg-gradient-to-r from-[#00f0ff] to-[#ff2a9d] text-[#06060c]">
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
