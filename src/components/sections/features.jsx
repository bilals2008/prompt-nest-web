import { motion } from "motion/react";
import {
  IconFolders,
  IconSearch,
  IconKeyboard,
  IconPalette,
  IconShield,
  IconBolt,
} from "@tabler/icons-react";

const FEATURES = [
  {
    icon: IconFolders,
    title: "Workspaces & folders",
    body: "Group prompts by project, client, or topic. Drag, nest, and reorganize without breaking references.",
  },
  {
    icon: IconSearch,
    title: "Instant search",
    body: "Full-text search across every prompt, tag, and note. Find the right one in milliseconds.",
  },
  {
    icon: IconKeyboard,
    title: "Keyboard-first",
    body: "Every action has a shortcut. Open the palette, copy, paste, switch workspaces — without leaving the keys.",
  },
  {
    icon: IconPalette,
    title: "Themable",
    body: "15+ hand-tuned themes including dark, light, and vibrant accents. Pick what matches your setup.",
  },
  {
    icon: IconShield,
    title: "Local-first & private",
    body: "Your prompts live in a local SQLite database. No account, no cloud, no telemetry. You own the data.",
  },
  {
    icon: IconBolt,
    title: "Native & fast",
    body: "Built on Electron with a tiny footprint. Launches instantly, stays out of your way.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 },
  }),
};

export function Features() {
  return (
    <section
      id="features"
      className="border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Features
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
            Built for the way you actually work with prompts.
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            No bloated editor, no cloud lock-in, no accounts. Just a focused
            tool that gets out of your way.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
            >
              <div className="grid size-9 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors group-hover:text-primary">
                <f.icon className="size-4" stroke={1.75} />
              </div>
              <h3 className="mt-4 text-sm font-medium">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
