import { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

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

export function Features() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);
  const headingRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      const isEven = i % 2 === 0;
      gsap.fromTo(
        row,
        { opacity: 0, x: isEven ? -40 : 40, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div ref={headingRef} className="mb-20 text-center">
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
        </div>

        <div className="space-y-28">
          {FEATURES.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              feature={feature}
              reverse={index % 2 !== 0}
              ref={(el) => (rowsRef.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureRow = forwardRef(({ feature, reverse }, rowRef) => {
  const stackRef = useRef(null);

  useGSAP(() => {
    if (!stackRef.current) return;

    const cards = stackRef.current.querySelectorAll("[data-card]");
    gsap.set(cards, { transformPerspective: 800, x: 0, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    cards.forEach((card, i) => {
      tl.fromTo(
        card,
        { opacity: 0, rotate: 0, x: 0, y: 60, scale: 0.85 },
        {
          opacity: 1,
          rotate: STACK_CARDS[i].rotate,
          x: STACK_CARDS[i].x,
          y: STACK_CARDS[i].y,
          scale: STACK_CARDS[i].scale,
          duration: 0.6,
          ease: "power2.out",
        },
        i === 0 ? 0 : "-=0.35"
      );
    });

    stackRef.current.addEventListener("mousemove", (e) => {
      const rect = stackRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      cards.forEach((card, i) => {
        gsap.to(card, {
          rotateX: -y * (3 + i),
          rotateY: x * (3 + i),
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    });

    stackRef.current.addEventListener("mouseleave", () => {
      cards.forEach((card) => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power2.out",
        });
      });
    });
  }, { scope: stackRef });

  return (
    <div
      ref={rowRef}
      className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
    >
      <motion.div
        className={reverse ? "lg:order-2" : ""}
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

      <CardStack images={feature.images} stackRef={stackRef} />
    </div>
  );
});

function CardStack({ images, stackRef }) {
  return (
    <div
      ref={stackRef}
      className="relative mx-auto h-[280px] w-full max-w-sm"
      style={{ perspective: "800px" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute h-64 w-80 rounded-3xl bg-backdrop opacity-60 blur-3xl"
        />
      </div>
      {STACK_CARDS.map((card, i) => (
        <div
          key={i}
          data-card
          className="absolute left-1/2 top-1/2 w-[85%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-xl will-change-transform"
          style={{ zIndex: card.z, transformStyle: "preserve-3d" }}
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
        </div>
      ))}
    </div>
  );
}
