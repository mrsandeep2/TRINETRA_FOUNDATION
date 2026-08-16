import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { workAreas } from "@/lib/site";
import { cn } from "@/lib/utils";

type Area = (typeof workAreas)[number];

const categories = [
  { id: "all", label: "All 12 Areas" },
  { id: "relief", label: "Relief & Health", slugs: ["food-and-nutrition", "healthcare", "disaster-relief"] },
  { id: "education", label: "Education & Skills", slugs: ["education-and-literacy", "student-empowerment", "livelihood"] },
  { id: "eco", label: "Ecology & Animals", slugs: ["animal-welfare", "environment"] },
  { id: "community", label: "Community & Rights", slugs: ["rural-and-community-development", "human-rights", "culture-and-sports", "research-and-innovation"] },
];

function FlipCard({ area }: { area: Area }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flip-card group h-[20rem] w-[18rem] shrink-0 select-none cursor-pointer"
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Toggle info for ${area.title}`}
    >
      <div className={`flip-inner ${flipped ? "is-flipped" : ""}`}>
        {/* front */}
        <div className="flip-face flex flex-col items-center justify-between rounded-[2rem] border border-white/80 dark:border-white/10 bg-white/90 dark:bg-[#0c1424]/90 p-7 text-center shadow-[0_20px_50px_-25px_rgba(20,28,50,0.18)] backdrop-blur-xl transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_25px_60px_-20px_rgba(234,88,12,0.2)]">
          <div className="flex w-full items-center justify-between">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-primary border border-primary/20">
              {area.index}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground">Tap to flip ↺</span>
          </div>

          <div className="relative my-2 h-20 w-20 overflow-hidden rounded-full ring-4 ring-primary/20 shadow-md">
            <img
              src={area.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-navy dark:text-white leading-tight">
              {area.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
              {area.short}
            </p>
          </div>

          <div className="w-full pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-primary font-semibold">
            <span>Learn details</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* back */}
        <div className="flip-face flip-back flex flex-col justify-between rounded-[2rem] border border-primary/40 bg-gradient-to-br from-navy via-[#101a35] to-[#0c1424] p-7 text-primary-foreground shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-white/15 pb-2 mb-3">
              <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                {area.index} · Focus Area
              </span>
              <span className="text-[10px] text-white/60">Tap to flip ↻</span>
            </div>
            <h3 className="font-display text-lg font-bold text-amber-400">{area.title}</h3>
            <p className="mt-2.5 line-clamp-4 text-xs leading-relaxed text-white/85">
              {area.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/15">
            <Link
              to="/work/$slug"
              params={{ slug: area.slug }}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[11px] font-bold tracking-wider text-white uppercase hover:bg-primary/90 transition-colors shadow-md"
            >
              Explore <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              to="/donate"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-semibold text-amber-400 hover:underline"
            >
              Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Dynamic 2035 continuous running marquee + interactive category filtering. */
export function WorkMarquee() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredAreas =
    activeCategory === "all"
      ? workAreas
      : workAreas.filter((item) => {
          const cat = categories.find((c) => c.id === activeCategory);
          return cat?.slugs?.includes(item.slug);
        });

  // Duplicate items for smooth continuous loop
  const row = [...filteredAreas, ...filteredAreas];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/10 via-secondary/20 to-secondary/10 py-20">
      {/* Top Header & Category Filter Pills */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider text-primary border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" /> Core Welfare Scope
              </span>
              <span className="text-xs font-semibold text-muted-foreground">Registered Objects</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-navy dark:text-white">
              Twelve Programmes. <span className="text-primary italic">One Commitment to Dignity.</span>
            </h2>
          </div>

          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/80 dark:bg-white/5 px-5 py-2.5 text-xs font-bold tracking-wider text-primary uppercase shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
          >
            <span>All 12 Programmes</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground pr-2 shrink-0">
            <Filter className="h-3.5 w-3.5" /> Filter:
          </span>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer select-none",
                activeCategory === c.id
                  ? "bg-navy text-white shadow-md scale-105"
                  : "bg-white/80 dark:bg-white/5 text-navy dark:text-white hover:bg-white border border-border/60",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Infinite Marquee Track with Flip Cards */}
      <div className="marquee-mask mt-10">
        <div
          className="marquee-track flex w-max gap-6 px-6"
          style={{ animationDuration: `${Math.max(40, row.length * 5)}s` }}
        >
          {row.map((area, i) => (
            <FlipCard key={`${area.slug}-${i}`} area={area} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
        <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
        <span>Tap any card to reveal details & direct actions · Continuous 2035 Stream</span>
      </div>
    </section>
  );
}