import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const REPO = "bilals2008/prompt-nest";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function parseNotes(body) {
  if (!body) return [];
  return body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-") || line.startsWith("*"))
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 6);
}

export function Changelog() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/releases?per_page=4`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        if (cancelled) return;
        setReleases(
          data.map((r) => ({
            tag: r.tag_name,
            version: (r.tag_name || "").replace(/^v/, ""),
            date: r.published_at,
            notes: parseNotes(r.body),
            url: r.html_url,
          }))
        );
      } catch {
        if (cancelled) return;
        setReleases([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="changelog"
      className="border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Changelog
            </p>
            <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
              Recent releases.
            </h2>
          </div>
          <Button asChild variant="outline" size="sm">
            <a
              href={`https://github.com/${REPO}/releases`}
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandGithub className="size-4" stroke={1.75} />
              View all on GitHub
              <IconExternalLink className="size-3" stroke={1.75} />
            </a>
          </Button>
        </motion.div>

        <div className="mt-12 grid gap-3">
          {loading && <SkeletonRows />}
          {!loading && releases.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              Changelog will appear here once the first release is published.
            </div>
          )}
          {releases.map((r, i) => (
            <motion.a
              key={r.tag}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group block rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20 cursor-pointer"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm font-medium">
                    v{r.version}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(r.date)}
                  </span>
                </div>
                <IconExternalLink
                  className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  stroke={1.75}
                />
              </div>
              {r.notes.length > 0 ? (
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {r.notes.map((n, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 before:mt-2 before:size-1 before:shrink-0 before:rounded-full before:bg-muted-foreground/50"
                    >
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  No release notes provided.
                </p>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkeletonRows() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-3 w-full animate-pulse rounded bg-muted" />
          <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </>
  );
}
