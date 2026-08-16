import { Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronsRight, Heart, HeartHandshake, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { images, org } from "@/lib/site";

// Accurate smooth SVG heart path
const HEART_PATH =
  "M250,440 C110,340 30,250 30,150 C30,70 90,25 160,25 C205,25 240,55 250,85 C260,55 295,25 340,25 C410,25 470,70 470,150 C470,250 390,340 250,440 Z";

const teamAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
];

export function AboutIntro() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f8f3ec] to-[#f4ece0] dark:from-[#090e1c] dark:via-[#0c1424] dark:to-[#070b16] py-20 sm:py-28">
      {/* Subtle Background Glow Elements */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* LEFT: HEART MASK WITH CONNECTED PIN BADGE & BRUSH SPLASH */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[32rem]">
              {/* Artistic Watercolor / Brush Splash Behind Heart */}
              <div className="pointer-events-none absolute -left-12 -bottom-10 w-[95%] h-[75%] opacity-85 z-0">
                <svg viewBox="0 0 400 300" className="w-full h-full fill-[#fca580]/40 dark:fill-[#ea580c]/20">
                  <path d="M45,180 C20,130 60,60 140,50 C210,40 260,90 320,80 C365,70 395,120 370,170 C345,220 300,240 230,260 C160,280 80,240 45,180 Z" />
                  <path d="M20,220 C5,190 25,160 55,175 C85,190 95,230 75,250 C55,270 30,250 20,220 Z" opacity="0.6" />
                  <path d="M15,260 C5,250 15,235 30,245 C45,255 40,275 25,280 C15,285 5,275 15,260 Z" opacity="0.4" />
                </svg>
              </div>

              {/* Main SVG Heart Container with ClipPath Photo */}
              <div className="relative z-10 w-full aspect-square filter drop-shadow-[0_25px_50px_rgba(20,28,50,0.18)]">
                <svg viewBox="0 0 500 500" className="w-full h-full">
                  <defs>
                    <clipPath id="trinetra-about-heart">
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
                    clipPath="url(#trinetra-about-heart)"
                  />
                </svg>

                {/* OVERLAID CONNECTED ORANGE MAP-PIN / BADGE COMPONENT */}
                <div className="absolute left-[6%] top-[14%] flex items-center z-20 filter drop-shadow-[0_16px_30px_rgba(234,88,12,0.35)]">
                  {/* Left Circular Inset Frame with Thick Orange Ring */}
                  <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full border-[6px] sm:border-[8px] border-primary bg-white overflow-hidden shadow-xl shrink-0 z-20 transition-transform duration-300 hover:scale-105">
                    <img
                      src={images.students}
                      alt="Student supported by foundation"
                      className="h-full w-full object-cover"
                    />
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
              </div>
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
                        className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white dark:ring-navy object-cover shadow-xs"
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
