import { motion } from "motion/react";

const SHOTS = [
  {
    label: "Workspace",
    src: "https://placehold.co/1200x750/0c0c14/ededee?text=Workspace+View",
    alt: "Prompt Nest workspace showing folders and prompts",
    aspect: "aspect-[16/10]",
  },
  {
    label: "Editor",
    src: "https://placehold.co/1200x750/0c0c14/ededee?text=Editor+View",
    alt: "Prompt Nest editor with markdown preview",
    aspect: "aspect-[16/10]",
  },
  {
    label: "Search",
    src: "https://placehold.co/1200x750/0c0c14/ededee?text=Search+%26+Filter",
    alt: "Prompt Nest search and filter interface",
    aspect: "aspect-[16/10]",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

export function Screenshots() {
  return (
    <section
      id="screenshots"
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
            Screenshots
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
            A quick look at the interface.
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            Calm, focused, keyboard-first. No clutter, no learning curve.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SHOTS.map((s, i) => (
            <motion.figure
              key={s.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
              className="group overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className={`${s.aspect} overflow-hidden bg-muted`}>
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                {s.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
