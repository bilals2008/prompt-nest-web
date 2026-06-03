import { motion } from "motion/react";

const FEATURES = [
  {
    title: "Workspaces & folders",
    body: "Group prompts by project, client, or topic. Drag, nest, and reorganize without breaking workflows. Keep your prompt library structured the way your mind works.",
    images: ["Organized+Workspaces", "Drag+and+Drop", "Folder+Tree"],
  },
  {
    title: "Instant search",
    body: "Full text search across every prompt, tag, and note. Find the right one in milliseconds. No more scrolling through endless lists.",
    images: ["Search+Bar", "Filter+Results", "Quick+Find"],
  },
  {
    title: "Keyboard-first",
    body: "Every action has a shortcut. Open the palette, copy, paste, switch workspaces — without leaving the keys. Speed without compromise.",
    images: ["Command+Palette", "Keyboard+Shortcuts", "Quick+Actions"],
  },
  {
    title: "Themable",
    body: "15+ hand-tuned themes including dark, light, and vibrant accents. Pick what matches your setup. Make it truly yours.",
    images: ["Dark+Theme", "Light+Theme", "Vibrant+Accents"],
  },
  {
    title: "Local-first & private",
    body: "Your prompts live in a local SQLite database. No accounts, no cloud, no telemetry. You own the data. Period.",
    images: ["Local+Storage", "No+Cloud", "Your+Data"],
  },
  {
    title: "Native & fast",
    body: "Built on Electron with a tiny footprint. Launches instantly, stays out of your way. Pure performance.",
    images: ["Lightning+Fast", "Native+App", "Zero+Bloat"],
  },
];

const STACK_CARDS = [
  { rotate: -6, x: -32, y: 12, scale: 0.88, z: 0 },
  { rotate: 6, x: 32, y: 12, scale: 0.88, z: 1 },
  { rotate: 0, x: 0, y: 0, scale: 1, z: 2 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, rotate: 0, x: 0, y: 60, scale: 0.85 },
  show: (card) => ({
    opacity: 1,
    rotate: card.rotate,
    x: card.x,
    y: card.y,
    scale: card.scale,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-b border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Built for the way you
            <br className="hidden sm:block" />
            <span className="text-muted-foreground"> actually work with prompts.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
            No bloated editor, no cloud lock-in, no accounts. Just a focused
            tool that gets out of your way.
          </p>
        </motion.div>

        <div className="space-y-28">
          {FEATURES.map((feature, index) => (
            <FeatureRow key={feature.title} feature={feature} index={index} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ feature, reverse }) {
  return (
    <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reverse ? "lg:[direction:rtl]" : ""}`}>
      <motion.div
        className={reverse ? "lg:[direction:ltr]" : ""}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        custom={0}
      >
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {feature.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {feature.body}
        </p>
      </motion.div>

      <CardStack images={feature.images} />
    </div>
  );
}

function CardStack({ images }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative mx-auto h-[280px] w-full max-w-sm"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute h-64 w-80 rounded-3xl bg-backdrop opacity-60 blur-3xl"
        />
      </div>
      {STACK_CARDS.map((card, i) => (
        <motion.div
          key={i}
          custom={card}
          variants={cardVariants}
          className="absolute left-1/2 top-1/2 w-[85%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-xl"
          style={{ zIndex: card.z }}
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
            <span className="size-2 rounded-full bg-muted-foreground/20" />
            <span className="size-2 rounded-full bg-muted-foreground/20" />
            <span className="size-2 rounded-full bg-muted-foreground/20" />
            <div className="ml-3 flex-1 text-center text-[10px] font-medium text-muted-foreground">
              Prompt Nest
            </div>
          </div>
          <div className="aspect-video bg-muted/30">
            <img
              src={`https://placehold.co/800x500/12121a/ededee?text=${images[i]}`}
              alt=""
              loading="lazy"
              className="block size-full object-cover"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
