import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { IconArrowsMove, IconSparkles, IconRefresh } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    icon: IconArrowsMove,
    eyebrow: "Organize",
    title: "Workspaces that scale with you",
    body: "Nest folders inside folders. Drag prompts between workspaces. Your library stays clean even when it crosses 10,000 entries.",
    bullets: ["Unlimited workspaces", "Drag-and-drop reordering", "Folder nesting"],
    image: "https://placehold.co/1000x650/0c0c14/ededee?text=Workspaces",
    imageAlt: "Prompt Nest workspaces panel with nested folders",
  },
  {
    icon: IconSparkles,
    eyebrow: "Search",
    title: "Find any prompt in milliseconds",
    body: "Full-text search across titles, bodies, and tags. Filter by workspace, tag, or recency. The result updates as you type.",
    bullets: ["Live search-as-you-type", "Tag & workspace filters", "Recent & pinned shortcuts"],
    image: "https://placehold.co/1000x650/0c0c14/ededee?text=Search+%26+Filter",
    imageAlt: "Prompt Nest search interface with results and filters",
    reverse: true,
  },
  {
    icon: IconRefresh,
    eyebrow: "Updates",
    title: "Always on the latest version",
    body: "Auto-updates run in the background. When a new release ships, you get a subtle prompt — not a surprise restart. Blockmap diffs keep downloads tiny.",
    bullets: ["Background auto-updates", "Differential downloads", "Zero surprise restarts"],
    image: "https://placehold.co/1000x650/0c0c14/ededee?text=Auto+Updates",
    imageAlt: "Prompt Nest update notification and release notes",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export function Showcase() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const headingRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      const img = item.querySelector("[data-parallax-img]");
      if (img) {
        gsap.fromTo(
          img,
          { y: 30, scale: 1.05 },
          {
            y: -30,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          }
        );
      }

      gsap.fromTo(
        item.querySelector("[data-content]"),
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        item.querySelector("[data-visual]"),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="border-b border-border bg-background"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Walkthrough
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
            A closer look at the details.
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            Every screen, every shortcut — designed to disappear once you start
            using it.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 flex flex-col gap-24 sm:gap-32"
        >
          {ITEMS.map((item, i) => (
            <ShowcaseBlock
              key={item.title}
              item={item}
              ref={(el) => (itemsRef.current[i] = el)}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const ShowcaseBlock = ({ item, index: _index }) => {
  const { reverse, icon: Icon, eyebrow, title, body, bullets, image, imageAlt } = item;

  return (
    <div
      className={`grid items-center gap-10 lg:gap-16 ${
        reverse ? "lg:grid-flow-col-dense" : ""
      } lg:grid-cols-2`}
    >
      <div data-content className={reverse ? "lg:col-start-2" : ""}>
        <div className="grid size-10 place-items-center rounded-xl border border-border bg-card text-foreground">
          <Icon className="size-5" stroke={1.75} />
        </div>
        <p className="mt-5 text-xs font-medium uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-balance text-2xl font-medium tracking-tight sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-pretty text-base text-muted-foreground">
          {body}
        </p>
        <ul className="mt-6 space-y-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-center gap-2.5 text-sm text-foreground"
            >
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <svg
                  viewBox="0 0 12 12"
                  className="size-2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2.5 6.5L5 9L9.5 3.5" strokeLinecap="round" />
                </svg>
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div data-visual className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <div className="ml-3 flex-1 text-center text-[11px] font-medium text-muted-foreground">
              Prompt Nest
            </div>
          </div>
          <div className="overflow-hidden">
            <img
              data-parallax-img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="block w-full will-change-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
