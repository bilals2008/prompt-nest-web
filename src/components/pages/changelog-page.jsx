import { motion } from "motion/react";
import { IconHistory, IconListCheck, IconStar, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
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
  alpha: "bg-[#a78bfa]/10 text-[#a78bfa] border-[#a78bfa]/20",
  beta: "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/20",
  stable: "bg-[#00ff9c]/10 text-[#00ff9c] border-[#00ff9c]/20",
};

function VersionBadge({ type }) {
  return (
    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${typeStyles[type] || typeStyles.alpha}`}>
      {type}
    </span>
  );
}

export function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#06060c]">
      <div className="mx-auto max-w-4xl px-5 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
        >
          <Button asChild variant="ghost" size="sm" className="mb-6 text-[#7d7d9e] hover:text-[#e2e2f5]">
            <a href="/">
              <IconArrowLeft className="size-4" stroke={1.75} />
              Back to home
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="flex items-center gap-3"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-[#00f0ff]/10 text-[#00f0ff]">
            <IconHistory className="size-5" stroke={1.75} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#e2e2f5] sm:text-3xl">
              Changelog
            </h1>
            <p className="text-sm text-[#7d7d9e]">
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
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={2 + idx}
                className="group rounded-xl border border-[#181830] bg-[#0c0c16] p-5 transition-colors hover:border-[#00f0ff]/20 sm:p-6"
              >
                <div className="mb-3 flex items-start gap-3">
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isLatest ? 'bg-gradient-to-br from-[#00f0ff] to-[#ff2a9d] text-[#06060c]' : 'bg-[#00f0ff]/10 text-[#00f0ff]'}`}>
                    <IconStar className={`size-4 ${isLatest ? 'fill-current' : ''}`} stroke={1.75} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-[#e2e2f5]">
                        v{release.version}
                      </h3>
                      <VersionBadge type={release.type} />
                      {isLatest && (
                        <span className="rounded-md border border-[#ff2a9d]/20 bg-[#ff2a9d]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#ff2a9d]">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-[#7d7d9e]">{release.date}</p>
                  </div>
                </div>
                <div className="ml-11 space-y-1">
                  {release.changes.map((change, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded-lg px-2 py-1 text-sm text-[#7d7d9e] transition-colors hover:bg-[#101020]"
                    >
                      <div className="mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#00f0ff]/10 text-[#00f0ff]">
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
