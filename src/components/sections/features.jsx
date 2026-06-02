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
    body: "Group prompts by project, client, or topic. Drag, nest, and reorganize without breaking workflows.",
  },
  {
    icon: IconSearch,
    title: "Instant search",
    body: "Full text search across every prompt, tag, and note. Find the right one in milliseconds.",
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
    body: "Your prompts live in a local SQLite database. No accounts, no cloud, no telemetry. You own the data.",
  },
  {
    icon: IconBolt,
    title: "Native & fast",
    body: "Built on Electron with a tiny footprint. Launches instantly, stays out of your way.",
  },
];

const STACK_CARDS = [
  { rotate: -5, x: -28, y: -14, scale: 0.92, opacity: 0.7 },
  { rotate: 3, x: 24, y: 10, scale: 0.95, opacity: 0.85 },
  { rotate: -1, x: -8, y: -4, scale: 0.98, opacity: 0.95 },
  { rotate: 0, x: 0, y: 0, scale: 1, opacity: 1 },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: () => ({
    opacity: 0,
    rotate: 0,
    x: 0,
    y: 60,
    scale: 0.85,
  }),
  show: (card) => ({
    opacity: card.opacity,
    rotate: card.rotate,
    x: card.x,
    y: card.y,
    scale: card.scale,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="bg-hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2"
      />

      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <CardStack />

          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
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

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="mt-10 divide-y divide-border border-y border-border"
            >
              {FEATURES.map((f) => (
                <motion.li
                  key={f.title}
                  variants={itemVariants}
                  className="group flex items-start gap-4 px-1 py-4 transition-colors hover:bg-muted/40"
                >
                  <div className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background text-foreground transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:text-primary">
                    <f.icon className="size-4" stroke={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{f.title}</div>
                    <div className="mt-0.5 text-sm text-muted-foreground">
                      {f.body}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardStack() {
  return (
    <motion.div
      className="relative mx-auto h-[560px] w-full max-w-md"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        },
      }}
    >
          {STACK_CARDS.map((card, i) => {
            const isFront = i === STACK_CARDS.length - 1;
            return (
              <motion.div
                key={i}
                custom={card}
                variants={cardVariants}
                custom={card}
            className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card"
            style={{ zIndex: i + 1 }}
            whileHover={
              isFront
                ? { y: card.y - 6, transition: { duration: 0.3 } }
                : undefined
            }
          >
            {isFront && <FrontCardContent />}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function FrontCardContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <div className="ml-3 flex-1 text-center text-[11px] font-medium text-muted-foreground">
          Prompt Nest
        </div>
      </div>
      <div className="flex-1 divide-y divide-border p-2">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group/row flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/40"
          >
            <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors group-hover/row:border-primary/30 group-hover/row:text-primary">
              <f.icon className="size-4" stroke={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{f.title}</div>
              <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {f.body}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
