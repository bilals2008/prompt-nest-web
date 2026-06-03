import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import {
  IconDownload,
  IconBrandGithub,
  IconExternalLink,
  IconClock,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { WindowsLogo } from "@/components/icons/windows-logo";
import { AppleLogo } from "@/components/icons/apple-logo";
import { LinuxLogo } from "@/components/icons/linux-logo";

gsap.registerPlugin(ScrollTrigger);

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const PLATFORMS = [
  { id: "windows", name: "Windows", meta: "Windows 10+ · 64-bit", icon: WindowsLogo, comingSoon: false },
  { id: "mac", name: "macOS", meta: "macOS 11+ · Universal", icon: AppleLogo, comingSoon: true },
  { id: "linux", name: "Linux", meta: "All major distros", icon: LinuxLogo, comingSoon: true },
];

export function Download({ release }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const metaRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { opacity: 0, y: 40, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      metaRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: metaRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -6,
          boxShadow: "0 0 40px var(--color-primary)/0.15",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(card.querySelector("[data-icon-wrap]"), {
          scale: 1.08,
          borderColor: "var(--color-primary)/0.3",
          duration: 0.4,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "none",
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(card.querySelector("[data-icon-wrap]"), {
          scale: 1,
          borderColor: "var(--color-border)",
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });
  }, { scope: sectionRef });

  const { version, windows, mac, releaseUrl, publishedAt, loading, error } =
    release;

  const assets = { windows, mac };

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Download
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Get Prompt Nest on your machine.
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            Auto-updates keep you on the latest version without re-installing.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {PLATFORMS.map((p, i) => (
            <PlatformCard
              key={p.id}
              name={p.name}
              meta={p.meta}
              Icon={p.icon}
              asset={assets[p.id]}
              comingSoon={p.comingSoon}
              disabled={loading && !assets[p.id]}
              ref={(el) => (cardsRef.current[i] = el)}
            />
          ))}
        </div>

        <div
          ref={metaRef}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
        >
          <span>
            Latest version{" "}
            <span className="font-medium text-foreground">v{version}</span>
          </span>
          {publishedAt && (
            <span>
              Released{" "}
              <span className="font-medium text-foreground">
                {formatDate(publishedAt)}
              </span>
            </span>
          )}
          {loading && <span>Checking for updates...</span>}
          {error && <span>Could not reach GitHub</span>}
          <a
            href={releaseUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground cursor-pointer"
          >
            <IconBrandGithub className="size-3.5" stroke={1.75} />
            All releases
            <IconExternalLink className="size-3" stroke={1.75} />
          </a>
        </div>
      </div>
    </section>
  );
}

const PlatformCard = ({ name, meta, Icon, asset, comingSoon, disabled }) => {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-8 transition-colors duration-300 will-change-transform">
      <div className="flex flex-col items-center text-center">
        <div
          data-icon-wrap
          className="grid size-16 place-items-center rounded-2xl border border-border bg-muted transition-colors duration-300"
        >
          <Icon />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
        <Button
          asChild
          size="lg"
          className="mt-6 w-full"
          disabled={disabled || comingSoon}
        >
          <a href={asset || "#"} aria-disabled={!asset || comingSoon}>
            {comingSoon ? (
              <IconClock className="size-4" stroke={1.75} />
            ) : (
              <IconDownload className="size-4" stroke={1.75} />
            )}
            {comingSoon ? "Coming soon" : asset ? `Download for ${name}` : "Not available yet"}
          </a>
        </Button>
      </div>
    </div>
  );
};
