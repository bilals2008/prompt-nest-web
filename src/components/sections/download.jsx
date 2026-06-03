import { motion } from "motion/react";
import {
  IconBrandWindows,
  IconBrandApple,
  IconDownload,
  IconBrandGithub,
  IconExternalLink,
  IconPackage,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function formatBytes(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Download({ release }) {
  const {
    version,
    windows,
    mac,
    releaseUrl,
    publishedAt,
    assets,
    loading,
    error,
  } = release;

  return (
    <section
      id="download"
      className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Download
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Get Prompt Nest on your machine.
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            Pick your platform. Auto-updates keep you on the latest version
            without re-installing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-xl border border-border bg-card"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <Badge variant="muted" className="gap-1.5 font-mono">
                <IconPackage className="size-3" stroke={1.75} />
                v{version}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {loading
                  ? "Checking for the latest release…"
                  : error
                    ? "Could not reach GitHub — showing static link"
                    : `Released ${formatDate(publishedAt)}`}
              </span>
            </div>
            <Button asChild variant="ghost" size="sm">
              <a
                href={releaseUrl}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer"
              >
                <IconBrandGithub className="size-4" stroke={1.75} />
                All releases
                <IconExternalLink className="size-3" stroke={1.75} />
              </a>
            </Button>
          </div>

          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <PlatformCard
              icon={IconBrandWindows}
              name="Windows"
              meta="Windows 10+ · 64-bit · NSIS installer"
              asset={windows}
              disabled={loading && !windows}
            />
            <PlatformCard
              icon={IconBrandApple}
              name="macOS"
              meta="macOS 11+ · Universal (Intel + Apple Silicon)"
              asset={mac}
              disabled={loading && !mac}
            />
          </div>
        </motion.div>

        {assets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6"
          >
            <details className="group rounded-xl border border-border bg-card">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <span>All assets in this release ({assets.length})</span>
                <span className="text-xs group-open:rotate-180 transition-transform">
                  ▾
                </span>
              </summary>
              <div className="border-t border-border">
                {assets.map((a) => (
                  <a
                    key={a.url}
                    href={a.url}
                    className="flex items-center justify-between border-b border-border px-5 py-2.5 text-xs last:border-b-0 transition-colors hover:bg-accent cursor-pointer"
                  >
                    <span className="font-mono text-foreground">{a.name}</span>
                    <span className="text-muted-foreground">
                      {formatBytes(a.size)}
                    </span>
                  </a>
                ))}
              </div>
            </details>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function PlatformCard({ icon: Icon, name, meta, asset, disabled }) {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg border border-border bg-muted">
          <Icon className="size-5 text-primary" stroke={1.75} />
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground">{meta}</div>
        </div>
      </div>
      <Button
        asChild
        size="lg"
        className="w-full"
        disabled={disabled}
      >
        <a href={asset || "#"} aria-disabled={!asset}>
          <IconDownload className="size-4" stroke={1.75} />
          {asset ? `Download for ${name}` : `Not available yet`}
        </a>
      </Button>
    </div>
  );
}
