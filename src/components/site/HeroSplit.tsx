import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Heart,
  Phone,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Utensils,
  Stethoscope,
  PawPrint,
  Globe2,
  Zap,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { images, org } from "@/lib/site";
import workEducation from "@/assets/work-education.jpg";
import workFood from "@/assets/work-food.jpg";
import workHealth from "@/assets/work-health.jpg";
import workAnimal from "@/assets/work-animal.jpg";
import { cn } from "@/lib/utils";

const heroPillars = [
  {
    id: "all",
    label: "Global Mission",
    icon: Globe2,
    badge: "Section 8 Non-Profit",
    title: "Serving Humanity.",
    accent: "Empowering Communities.",
    body: "Trinetra Foundation delivers verified grassroots relief, sustainable education, health access, animal welfare, and ecological restoration across Northern Bihar.",
    image: images.heroCommunity,
    alt: "Trinetra volunteers and community families together",
    stat: "12 Welfare Sectors",
    statDesc: "Active on ground",
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    badge: "Youth Empowerment",
    title: "Education That",
    accent: "Opens Every Door.",
    body: "Learning centres, digital libraries, school kits, and higher-education mentorship ensuring no capable student is stopped by circumstance.",
    image: workEducation,
    alt: "Children studying in a community learning session",
    stat: "500+ Students",
    statDesc: "Supported annually",
  },
  {
    id: "food",
    label: "Food Relief",
    icon: Utensils,
    badge: "Zero Hunger",
    title: "No Family Should",
    accent: "Sleep Hungry.",
    body: "Verified community kitchens, emergency dry ration drives, and surplus edible food redistribution for struggling and destitute households.",
    image: workFood,
    alt: "Cooked meal distribution by Trinetra team",
    stat: "10,000+ Meals",
    statDesc: "Verified distribution",
  },
  {
    id: "health",
    label: "Healthcare",
    icon: Stethoscope,
    badge: "Medical Access",
    title: "Healthcare Within",
    accent: "Everyone's Reach.",
    body: "Free specialist health camps, preventive diagnostics, medicine aid, and maternal-child support across rural villages in Araria.",
    image: workHealth,
    alt: "Community health checkup camp",
    stat: "24/7 Support",
    statDesc: "Emergency medical aid",
  },
  {
    id: "animal",
    label: "Animal & Eco",
    icon: PawPrint,
    badge: "Compassion & Ecology",
    title: "Greener Earth.",
    accent: "Kinder To All Life.",
    body: "Gaushala shelter care, veterinary rescue drives, tree plantations, and water harvesting as core commitments for sustainable harmony.",
    image: workAnimal,
    alt: "Animal welfare and tree plantation drive",
    stat: "Gaushala Care",
    statDesc: "Rescue & Afforestation",
  },
];

const donationChips = [
  { amount: 500, label: "Weekly Food Kit" },
  { amount: 1000, label: "Student Kit" },
  { amount: 2500, label: "Health Camp Aid" },
  { amount: 5000, label: "Gaushala / Rescue" },
];

const INTERVAL = 6000;

export function HeroSplit() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activePillar = heroPillars[activeIdx];

  // Smooth progress bar timer for 2035 feel
  useEffect(() => {
    if (isPaused) return;

    setProgress(0);
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / INTERVAL) * 100);
      setProgress(pct);

      if (elapsed >= INTERVAL) {
        setActiveIdx((prev) => (prev + 1) % heroPillars.length);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [activeIdx, isPaused]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 sm:pt-28 pb-14 sm:pb-20 bg-gradient-to-b from-[#fdfbf7] via-[#f7f3ec] to-[#f4ede2] dark:from-[#080e1e] dark:via-[#0c1424] dark:to-[#090d18]">
      {/* 2035 Ambient Glowing Mesh Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TOP STATUS CAPSULE WITH RADAR BEACON */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 dark:bg-white/5 px-4 py-1.5 shadow-[0_10px_25px_-10px_rgba(234,88,12,0.2)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-primary uppercase">
              Section 8 Non-Profit · CIN {org.cin}
            </span>
            <span className="hidden sm:inline text-muted-foreground/50">|</span>
            <span className="hidden sm:inline text-[11px] font-medium text-navy/80 dark:text-white/80">
              Forbesganj, Bihar
            </span>
          </div>

          {/* Quick Transparency Pill */}
          <Link
            to="/transparency"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-navy/5 dark:bg-white/10 hover:bg-navy/10 px-3.5 py-1 text-[11px] font-semibold text-navy dark:text-white transition-all hover:scale-105"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Audited & 80G Compliant</span>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          </Link>
        </div>

        {/* 2035 DYNAMIC CAUSE SELECTOR BAR (INTERACTIVE PILLS) */}
        <div
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {heroPillars.map((p, idx) => {
            const Icon = p.icon;
            const isActive = idx === activeIdx;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  setProgress(0);
                }}
                className={cn(
                  "group relative flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap select-none cursor-pointer",
                  isActive
                    ? "bg-navy text-white shadow-[0_10px_25px_-5px_rgba(20,28,50,0.35)] scale-[1.02]"
                    : "bg-white/70 dark:bg-white/5 text-navy dark:text-white hover:bg-white dark:hover:bg-white/10 border border-black/5 hover:scale-[1.01]",
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:scale-110",
                    isActive ? "text-amber-400" : "text-primary",
                  )}
                />
                <span>{p.label}</span>
                {isActive && (
                  <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* MAIN HERO GRID */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 items-center">
          {/* LEFT CONTENT COLUMN */}
          <div
            className="flex flex-col justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Animated Category Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider text-primary border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                {activePillar.badge}
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                Priority Mission
              </span>
            </div>

            {/* Dynamic Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-navy dark:text-white leading-[1.08]">
              {activePillar.title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706]">
                {activePillar.accent}
              </span>
            </h1>

            {/* Mission Narrative */}
            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground dark:text-muted-foreground/90">
              {activePillar.body}
            </p>

            {/* 2035 QUICK DONATION CHIP MATRIX */}
            <div className="mt-8 rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 sm:p-5 shadow-[0_20px_40px_-20px_rgba(20,28,50,0.1)] backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold tracking-wider uppercase text-navy dark:text-white flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-primary" /> Instant Support Preset:
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Tax Exempt 80G
                </span>
              </div>

              {/* Amount Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {donationChips.map((chip) => {
                  const isChosen = selectedAmount === chip.amount;
                  return (
                    <button
                      key={chip.amount}
                      type="button"
                      onClick={() => setSelectedAmount(chip.amount)}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-2xl p-2.5 transition-all duration-200 cursor-pointer",
                        isChosen
                          ? "bg-gradient-to-br from-primary to-[#d97706] text-white shadow-md shadow-primary/25 scale-[1.03]"
                          : "bg-accent/40 dark:bg-white/5 text-navy dark:text-white hover:bg-accent hover:scale-[1.01] border border-border/50",
                      )}
                    >
                      <span className="font-display text-base font-bold">₹{chip.amount.toLocaleString("en-IN")}</span>
                      <span className={cn("text-[9px] line-clamp-1 mt-0.5", isChosen ? "text-white/90" : "text-muted-foreground")}>
                        {chip.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons Hub */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {/* Donate CTA with Selected Amount */}
                <Link
                  to="/donate"
                  search={{ amount: selectedAmount }}
                  className="group flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-white uppercase shadow-[0_12px_30px_-5px_rgba(234,88,12,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-95"
                >
                  <Heart className="h-4 w-4 fill-white transition-transform group-hover:scale-125" />
                  <span>Donate ₹{selectedAmount.toLocaleString("en-IN")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Volunteer Action */}
                <Link
                  to="/volunteer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/30 dark:border-white/20 bg-white/60 dark:bg-white/5 px-5 py-3.5 text-xs font-semibold tracking-[0.14em] text-navy dark:text-white uppercase transition-all duration-200 hover:bg-navy hover:text-white hover:border-navy"
                >
                  Join as Volunteer
                </Link>

                {/* Direct Phone Helpline */}
                <a
                  href={`tel:${org.phone}`}
                  className="hidden sm:flex items-center gap-2.5 rounded-full bg-card px-4 py-3 text-xs font-semibold text-navy shadow-sm ring-1 ring-border/80 hover:bg-accent transition-colors"
                  title="Call Trinetra"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-mono text-xs">{org.phone}</span>
                </a>
              </div>
            </div>

            {/* Active Slide Timer Bar */}
            <div className="mt-5 flex items-center gap-3">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-amber-500 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground font-semibold">
                0{activeIdx + 1} / 0{heroPillars.length}
              </span>
            </div>
          </div>

          {/* RIGHT 2035 HOLOGRAPHIC GLASS PORTAL */}
          <div
            className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[34rem]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Multi-layer Organic Glass Capsule */}
            <div className="relative rounded-[3rem] p-3 sm:p-4 border border-white/80 dark:border-white/15 bg-white/40 dark:bg-white/5 shadow-[0_35px_80px_-25px_rgba(20,28,50,0.25),0_0_30px_rgba(234,88,12,0.12)] backdrop-blur-3xl">
              {/* Media Window with Smooth Aspect Frame */}
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-[2.5rem] bg-navy/10">
                {heroPillars.map((pillar, idx) => (
                  <img
                    key={pillar.id}
                    src={pillar.image}
                    alt={pillar.alt}
                    aria-hidden={idx !== activeIdx}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                      idx === activeIdx
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105 pointer-events-none",
                    )}
                  />
                ))}

                {/* Holographic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

                {/* FLOATING TELEMETRY CARD: TOP-LEFT VERIFIED BADGE */}
                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/40 bg-white/85 dark:bg-[#0c1424]/90 px-3.5 py-1.5 shadow-lg backdrop-blur-xl animate-[float-subtle_4s_ease-in-out_infinite]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="font-display text-xs font-bold text-navy dark:text-white">
                    Verified Grassroots
                  </span>
                </div>

                {/* FLOATING TELEMETRY CARD: TOP-RIGHT PROGRAMMES */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/90 px-3.5 py-1.5 text-white shadow-lg backdrop-blur-xl">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold">{activePillar.stat}</span>
                </div>

                {/* BOTTOM SPOTLIGHT HERO INFO OVERLAY */}
                <div className="absolute inset-x-4 bottom-4 rounded-3xl border border-white/30 bg-white/90 dark:bg-[#0c1424]/90 p-4 shadow-xl backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-primary uppercase">
                        Current Spotlight
                      </span>
                      <h4 className="font-display text-base font-bold text-navy dark:text-white">
                        {activePillar.label} Programme
                      </h4>
                    </div>
                    <Link
                      to="/work"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:scale-110 transition-transform shadow-md shadow-primary/30"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60 pt-2">
                    <span>{activePillar.statDesc}</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live in Bihar
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Accent Orb underneath */}
            <div className="pointer-events-none absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-primary/25 blur-2xl animate-[pulse-ring_4s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* BOTTOM 2035 TELEMETRY METRIC STRIP */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              metric: "12 Focus Sectors",
              title: "Comprehensive Welfare",
              desc: "Education, Health, Food, Animals & Earth",
              highlight: "text-primary",
            },
            {
              metric: "100% Direct Impact",
              title: "Radical Transparency",
              desc: "Verified ground logs & public reporting",
              highlight: "text-amber-600",
            },
            {
              metric: "80G & 12A Certified",
              title: "Tax Exemption",
              desc: "Govt. registered Section 8 entity",
              highlight: "text-emerald-600",
            },
            {
              metric: "Forbesganj HQ",
              title: "Grassroots Centred",
              desc: "Serving Bihar border & rural districts",
              highlight: "text-indigo-600",
            },
          ].map((card, i) => (
            <div
              key={card.metric}
              className="rounded-3xl border border-white/80 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 sm:p-5 shadow-[0_15px_35px_-20px_rgba(20,28,50,0.12)] backdrop-blur-xl hover:translate-y-[-2px] transition-transform duration-300"
            >
              <p className={cn("font-display text-base sm:text-lg font-bold", card.highlight)}>
                {card.metric}
              </p>
              <h4 className="mt-1 font-semibold text-xs sm:text-sm text-navy dark:text-white">
                {card.title}
              </h4>
              <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
