// File: src/components/sections/download.jsx
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useForm, ValidationError } from "@formspree/react";
import {
  IconDownload,
  IconBrandGithub,
  IconExternalLink,
  IconBell,
  IconRefresh,
  IconShieldCheck,
  IconBolt,
  IconLock,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  {
    id: "windows",
    name: "Windows",
    meta: "Windows 10+ · 64-bit",
    icon: WindowsLogo,
    comingSoon: false,
    glowColor: "#3b82f6",
    badgeLabel: "Stable & Optimized",
    badgeVariant: "default",
  },
  {
    id: "mac",
    name: "macOS",
    meta: "macOS 11+ · Universal",
    icon: AppleLogo,
    comingSoon: true,
    glowColor: "#a855f7",
    badgeLabel: "Coming soon",
    badgeVariant: "muted",
  },
  {
    id: "linux",
    name: "Linux",
    meta: "All major distros",
    icon: LinuxLogo,
    comingSoon: true,
    glowColor: "#f97316",
    badgeLabel: "Coming soon",
    badgeVariant: "muted",
  },
];

const FEATURES = [
  { icon: IconRefresh, label: "Auto Updates", sub: "Always up to date", color: "#22d3ee" },
  { icon: IconShieldCheck, label: "Safe & Secure", sub: "Verified & trusted", color: "#34d399" },
  { icon: IconBolt, label: "Lightweight", sub: "Fast & efficient", color: "#facc15" },
  { icon: IconLock, label: "Your Data, Yours", sub: "100% Local & Private", color: "#c084fc" },
];

export function Download({ release }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const metaRef = useRef(null);
  const featuresRef = useRef(null);
  const [notifyPlatform, setNotifyPlatform] = useState(null);

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

    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -6,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
        card.style.setProperty("--mouse-x", "50%");
        card.style.setProperty("--mouse-y", "50%");
      });
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mouse-x", `${x}%`);
        card.style.setProperty("--mouse-y", `${y}%`);
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
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="tint" className="mb-4">
            <IconDownload className="size-3" stroke={1.75} />
            Download
          </Badge>
          <h2 className="text-balance text-3xl font-serif italic tracking-tight text-foreground sm:text-4xl">
            Get Prompt Nest on your machine.
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground font-[var(--font-body)]">
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
              glowColor={p.glowColor}
              badgeLabel={p.badgeLabel}
              badgeVariant={p.badgeVariant}
              disabled={loading && !assets[p.id]}
              onNotify={() => setNotifyPlatform(p)}
              ref={(el) => (cardsRef.current[i] = el)}
            />
          ))}
        </div>

        <div
          ref={featuresRef}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
        >
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="group/item relative rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-transparent hover:bg-card/80"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover/item:opacity-100"
                style={{
                  background: `radial-gradient(300px circle at 50% 0%, ${f.color}10, transparent 60%)`,
                }}
              />
              <div className="relative">
                <div
                  className="mb-3 inline-flex size-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover/item:scale-110"
                  style={{ background: `${f.color}15` }}
                >
                  <f.icon
                    className="size-5"
                    style={{ color: f.color }}
                    stroke={1.75}
                  />
                </div>
                <p className="text-sm font-semibold text-foreground">{f.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{f.sub}</p>
              </div>
            </div>
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

      <NotifyDialog
        platform={notifyPlatform}
        open={Boolean(notifyPlatform)}
        onOpenChange={(open) => {
          if (!open) setNotifyPlatform(null);
        }}
      />
    </section>
  );
}

const PlatformCard = ({
  name,
  meta,
  Icon,
  asset,
  comingSoon,
  glowColor,
  badgeLabel,
  badgeVariant,
  disabled,
  onNotify,
}) => {
  return (
    <div
      className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 will-change-transform hover:border-transparent"
      style={{
        "--glow": glowColor,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}12, transparent 40%)`,
        }}
      />
      <div
        className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${glowColor}30, transparent 50%, ${glowColor}15)`,
        }}
      />

      {comingSoon && (
        <div className="absolute top-4 left-4">
          <span
            className="inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ background: glowColor }}
          >
            Soon
          </span>
        </div>
      )}

      <div className="relative flex flex-col items-center text-center">
        <div
          data-icon-wrap
          className="relative grid size-20 place-items-center rounded-full transition-transform duration-300"
        >
          <div
            className="absolute inset-0 rounded-full opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40"
            style={{ background: glowColor }}
          />
          <div
            className="absolute inset-0 rounded-full border transition-all duration-500"
            style={{ borderColor: `${glowColor}25` }}
          />
          <div
            className="absolute -inset-2 rounded-full border border-dashed transition-all duration-500 group-hover:rotate-90"
            style={{ borderColor: `${glowColor}18` }}
          />
          <Icon className="relative z-10 size-10" />
        </div>

        <h3 className="mt-6 text-xl font-semibold text-foreground">{name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{meta}</p>

        <Badge variant={badgeVariant} className="mt-4">
          {!comingSoon && (
            <span
              className="mr-1 inline-block size-1.5 rounded-full bg-success"
            />
          )}
          {comingSoon && <IconBell className="size-3" stroke={1.75} />}
          {badgeLabel}
        </Badge>

        {comingSoon ? (
          <Button
            variant="outline"
            size="lg"
            className="mt-6 w-full"
            disabled={disabled}
            onClick={onNotify}
          >
            <IconBell className="size-4" stroke={1.75} />
            Notify me
          </Button>
        ) : (
          <Button
            asChild
            size="lg"
            className="mt-6 w-full"
            disabled={disabled}
          >
            <a href={asset || "#"} aria-disabled={!asset}>
              <IconDownload className="size-4" stroke={1.75} />
              {asset ? `Download for ${name}` : "Not available yet"}
            </a>
          </Button>
        )}

        {comingSoon ? null : (
          <p className="mt-3 text-xs text-muted-foreground">
            Secure · Fast · Auto-updates
          </p>
        )}
        {comingSoon && (
          <p className="mt-3 text-xs text-muted-foreground">
            Be the first to know
          </p>
        )}
      </div>
    </div>
  );
};

function NotifyDialog({ platform, open, onOpenChange }) {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;
  const [state, handleSubmit] = useForm(formId || null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-1 grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
            <IconBell className="size-5" stroke={1.75} />
          </div>
          <DialogTitle>Get notified for {platform?.name || "this build"}</DialogTitle>
          <DialogDescription>
            Leave your email and we'll send the download link when the{" "}
            {platform?.name || "next"} build is ready.
          </DialogDescription>
        </DialogHeader>

        {state.succeeded ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="grid size-12 place-items-center rounded-full bg-success/10 text-success">
              <IconBell className="size-6" stroke={1.75} />
            </div>
            <p className="text-center text-sm text-foreground">
              You're on the list! We'll email you when it's ready.
            </p>
            <DialogClose asChild>
              <Button variant="outline" className="mt-2">
                Close
              </Button>
            </DialogClose>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-11 rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/15"
                autoFocus
              />
              <ValidationError
                field="email"
                errors={state.errors}
                className="text-xs text-error"
              />
            </label>

            <input
              type="hidden"
              name="platform"
              value={platform?.name || "Unknown"}
            />
            <input
              type="hidden"
              name="source"
              value="Prompt Nest download section"
            />

            <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              Platform:{" "}
              <span className="font-semibold text-foreground">
                {platform?.name || "Coming soon"}
              </span>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={state.submitting}>
                {state.submitting ? "Joining..." : "Notify me"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
