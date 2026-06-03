import { motion } from "motion/react";
import {
  IconDownload,
  IconBrandGithub,
  IconExternalLink,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { WindowsLogo } from "@/components/icons/windows-logo";
import { AppleLogo } from "@/components/icons/apple-logo";
import { LinuxLogo } from "@/components/icons/linux-logo";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const PLATFORMS = [
  { id: "windows", name: "Windows", meta: "Windows 10+ · 64-bit", icon: WindowsLogo },
  { id: "mac", name: "macOS", meta: "macOS 11+ · Universal", icon: AppleLogo },
  { id: "linux", name: "Linux", meta: "All major distros", icon: LinuxLogo },
];

export function Download({ release }) {
  const { version, windows, mac, releaseUrl, publishedAt, loading, error } =
    release;

  const assets = { windows, mac };

  return (
    <section
      id="download"
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
          {PLATFORMS.map((p) => (
            <PlatformCard
              key={p.id}
              name={p.name}
              meta={p.meta}
              Icon={p.icon}
              asset={assets[p.id]}
              disabled={loading && !assets[p.id]}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
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
          {loading && <span>Checking for updates…</span>}
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
        </motion.div>
      </div>
    </section>
  );
}

function PlatformCard({ name, meta, Icon, asset, disabled }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="group relative rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_var(--color-primary)/0.08]">
        <div className="flex flex-col items-center text-center">
          <div className="grid size-16 place-items-center rounded-2xl border border-border bg-muted transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/5">
            <Icon />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-foreground">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
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
        </div>
      </div>
    </motion.div>
  );
}
