import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "motion/react";
import { IconHistory, IconListCheck, IconStar, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/navbar";
import { ScrollToHash } from "@/components/scroll-to-hash";
import changelogData from "@/data/changelog.json";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
};

const typeStyles = {
  alpha: "bg-destructive/10 text-destructive border-destructive/20",
  beta: "bg-primary/10 text-primary border-primary/20",
  stable: "bg-primary/10 text-primary border-primary/20",
};

function VersionBadge({ type }) {
  return (
    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${typeStyles[type] || typeStyles.alpha}`}>
      {type}
    </span>
  );
}

export function ChangelogPage() {
  const releasesRef = useRef([]);
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      releasesRef.current.filter(Boolean),
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, { scope: headerRef });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToHash />
      <div ref={headerRef} className="mx-auto max-w-4xl px-5 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
        >
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/">
              <IconArrowLeft className="size-4" stroke={1.75} />
              Back to home
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="flex items-center gap-3"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <IconHistory className="size-5" stroke={1.75} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Changelog
            </h1>
            <p className="text-sm text-muted-foreground">
              Every release, every improvement — tracked.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 space-y-4">
          {changelogData.releases.map((release, idx) => {
            const isLatest = idx === 0;
            return (
              <motion.div
                key={release.version}
                ref={(el) => (releasesRef.current[idx] = el)}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={2 + idx}
                className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/20 sm:p-6"
              >
                <div className="mb-3 flex items-start gap-3">
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isLatest ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                    <IconStar className={`size-4 ${isLatest ? 'fill-current' : ''}`} stroke={1.75} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-foreground">
                        v{release.version}
                      </h3>
                      <VersionBadge type={release.type} />
                      {isLatest && (
                        <span className="rounded-md border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{release.date}</p>
                  </div>
                </div>
                <div className="ml-11 space-y-1">
                  {release.changes.map((change, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded-lg px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent"
                    >
                      <div className="mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <IconListCheck className="size-2.5" stroke={1.75} />
                      </div>
                      <span>{change}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
