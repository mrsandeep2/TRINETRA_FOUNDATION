import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronsRight,
  Heart,
  HeartHandshake,
  Phone,
  Sparkles,
  Zap,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { images, org } from "@/lib/site";
import { cn } from "@/lib/utils";
import teamDirector from "@/assets/team-director.jpg";
import teamCofounder from "@/assets/team-cofounder.jpg";

// Smooth, mathematically balanced SVG heart path
const HEART_PATH =
  "M250,440 C110,340 30,250 30,150 C30,70 90,25 160,25 C205,25 240,55 250,85 C260,55 295,25 340,25 C410,25 470,70 470,150 C470,250 390,340 250,440 Z";

const teamAvatars = [
  teamDirector,
  teamCofounder,
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  rot: number;
  scale: number;
  emoji: string;
  color: string;
}

export function AboutIntro() {
  const [isHovered, setIsHovered] = useState(false);
  const [isBlasting, setIsBlasting] = useState(false);
  const [loveCount, setLoveCount] = useState(148);
  const [showToast, setShowToast] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const triggerHeartBlast = (e?: React.MouseEvent | React.TouchEvent) => {
    setIsBlasting(true);
    setLoveCount((c) => c + 1);
    setShowToast(true);

    const emojis = ["❤️", "💖", "✨", "🧡", "🌟", "💛", "💚", "🕊️", "💫"];
    const colors = ["#ef4444", "#f97316", "#eab308", "#10b981", "#ec4899", "#8b5cf6"];

    // Generate 16-20 burst particles with radial trajectory
    const newParticles: Particle[] = Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
      const distance = 80 + Math.random() * 140;
      return {
        id: Date.now() + i,
        x: 0,
        y: 0,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance - 20,
        rot: (Math.random() - 0.5) * 90,
        scale: 0.8 + Math.random() * 0.9,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    setParticles((prev) => [...prev.slice(-20), ...newParticles]);

    setTimeout(() => {
      setIsBlasting(false);
    }, 450);

    setTimeout(() => {
      setParticles([]);
    }, 1200);

    setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f8f3ec] to-[#f4ece0] dark:from-[#090e1c] dark:via-[#0c1424] dark:to-[#070b16] py-14 sm:py-20 lg:py-28">
      {/* Dynamic Ambient Background Glow Mesh */}
      <div
        className={cn(
          "pointer-events-none absolute -left-32 top-1/4 h-[32rem] w-[32rem] rounded-full transition-all duration-700 blur-[130px]",
          isHovered ? "bg-primary/25 scale-110" : "bg-primary/10",
        )}
      />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* LEFT: INTERACTIVE HEART MASK WITH LOVE EXPLOSION ON TOUCH/CLICK */}
          <Reveal>
            <div
              ref={containerRef}
              className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[32rem] select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Artistic Watercolor Splash Behind Heart */}
              <div
                className={cn(
                  "pointer-events-none absolute -left-12 -bottom-10 w-[95%] h-[75%] opacity-85 z-0 transition-all duration-700",
                  isHovered && "scale-105 opacity-100 rotate-1",
                )}
              >
                <svg viewBox="0 0 400 300" className="w-full h-full fill-[#fca580]/45 dark:fill-[#ea580c]/25">
                  <path d="M45,180 C20,130 60,60 140,50 C210,40 260,90 320,80 C365,70 395,120 370,170 C345,220 300,240 230,260 C160,280 80,240 45,180 Z" />
                  <path d="M20,220 C5,190 25,160 55,175 C85,190 95,230 75,250 C55,270 30,250 20,220 Z" opacity="0.6" />
                  <path d="M15,260 C5,250 15,235 30,245 C45,255 40,275 25,280 C15,285 5,275 15,260 Z" opacity="0.4" />
                </svg>
              </div>

              {/* MAIN INTERACTIVE HEART CLICKABLE CONTAINER */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Tap to blast love and support"
                onClick={triggerHeartBlast}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    triggerHeartBlast();
                  }
                }}
                className={cn(
                  "relative z-10 w-full aspect-square cursor-pointer transition-all duration-500 transform-gpu",
                  isHovered && "animate-[heart-throb_1.8s_ease-in-out_infinite]",
                  isBlasting
                    ? "scale-110 rotate-1 filter drop-shadow-[0_0_50px_rgba(234,88,12,0.8)]"
                    : isHovered
                      ? "scale-[1.04] filter drop-shadow-[0_25px_60px_rgba(234,88,12,0.45)]"
                      : "scale-100 filter drop-shadow-[0_20px_45px_rgba(20,28,50,0.18)]",
                )}
              >
                {/* SVG Heart Clipping Mask */}
                <svg viewBox="0 0 500 500" className="w-full h-full">
                  <defs>
                    <clipPath id="trinetra-interactive-heart">
                      <path d={HEART_PATH} />
                    </clipPath>
                  </defs>

                  <image
                    href={images.heroCommunity}
                    x="0"
                    y="0"
                    width="500"
                    height="500"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#trinetra-interactive-heart)"
                    className={cn(
                      "transition-transform duration-700",
                      isHovered ? "scale-108" : "scale-100",
                    )}
                  />
                </svg>

                {/* HEART PULSE SHOCKWAVE RING ON CLICK */}
                {isBlasting && (
                  <div className="pointer-events-none absolute inset-0 rounded-full border-4 border-primary/80 animate-ping" />
                )}

                {/* OVERLAID CONNECTED ORANGE MAP-PIN / BADGE COMPONENT */}
                <div
                  className={cn(
                    "absolute left-[6%] top-[14%] flex items-center z-20 transition-all duration-500 filter",
                    isHovered ? "drop-shadow-[0_20px_35px_rgba(234,88,12,0.55)] -translate-y-1" : "drop-shadow-[0_16px_30px_rgba(234,88,12,0.35)]",
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerHeartBlast();
                  }}
                >
                  {/* Left Circular Inset Frame with Thick Orange Ring */}
                  <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full border-[6px] sm:border-[8px] border-primary bg-white overflow-hidden shadow-xl shrink-0 z-20 transition-transform duration-500 hover:scale-110">
                    <img
                      src={images.students}
                      alt="Student supported by foundation"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Connected Right Orange Banner */}
                  <div className="-ml-5 sm:-ml-7 rounded-r-[2.5rem] rounded-tl-[1.5rem] bg-gradient-to-r from-primary to-[#ea580c] py-3.5 sm:py-4 pl-8 sm:pl-10 pr-6 sm:pr-8 text-white shadow-xl">
                    <span className="block font-display text-2xl sm:text-4xl font-bold leading-none">
                      12+
                    </span>
                    <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.18em] uppercase whitespace-nowrap text-white/95">
                      Areas Of Welfare
                    </span>
                  </div>
                </div>

                {/* FLOATING INTERACTIVE LOVE BURST PARTICLES */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-30">
                  {particles.map((p) => (
                    <div
                      key={p.id}
                      className="absolute text-xl sm:text-2xl animate-[love-burst_0.9s_cubic-bezier(0.25,1,0.5,1)_forwards]"
                      style={
                        {
                          "--tw-translate-x": `${p.tx}px`,
                          "--tw-translate-y": `${p.ty}px`,
                          "--tw-rotate": `${p.rot}deg`,
                        } as React.CSSProperties
                      }
                    >
                      <span>{p.emoji}</span>
                    </div>
                  ))}
                </div>

                {/* FLOATING LOVE REACTION COUNTER BADGE */}
                <div
                  className={cn(
                    "absolute -bottom-4 right-6 z-30 flex items-center gap-2 rounded-full bg-white/95 dark:bg-[#0c1424]/95 px-4 py-1.5 shadow-xl border border-primary/30 backdrop-blur-xl transition-all duration-300",
                    isHovered ? "scale-105 border-primary shadow-[0_0_20px_rgba(234,88,12,0.3)]" : "scale-100",
                  )}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                  </span>
                  <span className="font-display text-xs font-bold text-navy dark:text-white">
                    {loveCount} Loves Shared
                  </span>
                  <Heart className="h-3.5 w-3.5 fill-primary text-primary animate-pulse" />
                </div>

                {/* CELEBRATORY FLOATING TOAST NOTIFICATION ON BLAST */}
                {showToast && (
                  <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 animate-[float-heart-up_1.8s_ease-out_forwards]">
                    <div className="flex items-center gap-2 rounded-full bg-navy/90 text-white px-5 py-2 text-xs font-bold shadow-2xl border border-amber-400 backdrop-blur-xl whitespace-nowrap">
                      <Sparkles className="h-4 w-4 text-amber-400 animate-spin shrink-0" />
                      <span>Love Sent to Trinetra Foundation! ❤️</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hover Prompt Cue */}
              <p className="mt-4 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" />
                <span>Tap or touch heart to blast love & support</span>
              </p>
            </div>
          </Reveal>

          {/* RIGHT: TEXT CONTENT & TEAM AVATARS & CTAS */}
          <Reveal delay={0.08}>
            <div>
              {/* Red/Orange Heart + About Us Eyebrow */}
              <div className="flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3">
                <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
                <span>About Us</span>
              </div>

              {/* Bold Headline */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy dark:text-white leading-[1.12]">
                Helping Each Other can Make World Better
              </h2>

              {/* Body Narrative */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground dark:text-muted-foreground/90">
                {org.shortName} is a Section 8 not-for-profit company (CIN {org.cin}) working from
                Forbesganj, Araria, Bihar. We pair immediate relief — food, medical aid and disaster
                response — with the slower work that changes a household permanently: education, student
                support, skills, livelihood, environment and animal welfare.
              </p>

              {/* MIDDLE ROW: START HELPING TEAM + TEAM AVATARS PILL */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-6 pt-2 border-t border-border/50">
                {/* Left: Start Helping Team Pod */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/20">
                      <HeartHandshake className="h-5 w-5 text-primary" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-navy dark:text-white">
                      Start Helping Team
                    </h3>
                  </div>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>There are many ways to support our ground missions</span>
                  </p>
                </div>

                {/* Right: Overlapping Team Avatars Capsule */}
                <div className="flex items-center rounded-full bg-secondary/35 dark:bg-white/10 p-2 shadow-xs border border-border/70">
                  <div className="flex -space-x-3 overflow-hidden">
                    {teamAvatars.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`Volunteer ${i + 1}`}
                        className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white dark:ring-navy object-cover shadow-xs transition-transform hover:scale-110 hover:z-10"
                        width={40}
                        height={40}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: EXPLORE MORE BUTTON + CALL ANY TIME */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {/* Explore More Button with Circle Chevron Badge */}
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] pl-2.5 pr-7 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-white uppercase shadow-[0_12px_28px_-6px_rgba(234,88,12,0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary transition-transform group-hover:translate-x-0.5 shadow-sm">
                    <ChevronsRight className="h-5 w-5 stroke-[2.5]" />
                  </span>
                  <span>Explore More</span>
                </Link>

                {/* Call Any Time Phone Pod */}
                <a
                  href={`tel:${org.phone}`}
                  className="group flex items-center gap-3 select-none"
                  title="Call Trinetra Helpline"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy/25 dark:border-white/25 text-navy dark:text-white transition-all group-hover:border-primary group-hover:text-primary group-hover:scale-105 shadow-xs">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Call Any Time
                    </span>
                    <span className="font-display text-xs sm:text-sm font-bold text-navy dark:text-white group-hover:text-primary transition-colors">
                      +91 {org.phone}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
