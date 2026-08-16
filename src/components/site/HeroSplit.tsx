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
  TrendingUp,
  MapPin,
  Radio,
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
    badge: "Global Mission",
    title: "Serving Humanity.",
    accent: "Empowering Lives.",
    body: "Grassroots relief, education, healthcare access, animal welfare, and ecological restoration across Northern Bihar.",
    image: images.heroCommunity,
    alt: "Trinetra volunteers and community families together",
    stat: "12 Welfare Sectors",
    statDesc: "Active across Bihar",
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    badge: "Youth Empowerment",
    title: "Education That",
    accent: "Opens Every Door.",
    body: "Learning centres, digital STEM labs, school supplies, and scholarship mentorship for rural children in Bihar.",
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
    accent: "Ever Sleep Hungry.",
    body: "Daily community kitchens, emergency ration drives, and hot meals delivered directly to destitute households.",
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
    body: "Free specialist diagnostic camps, emergency medicine aid, and maternal-child health across rural hamlets.",
    image: workHealth,
    alt: "Community health checkup camp",
    stat: "24/7 Medical Care",
    statDesc: "Direct on-ground relief",
  },
  {
    id: "animal",
    label: "Animal & Eco",
    icon: PawPrint,
    badge: "Compassion & Ecology",
    title: "Greener Earth.",
    accent: "Kinder To All Life.",
    body: "Gaushala shelter care, veterinary rescue operations, massive tree plantations, and clean water harvesting.",
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
  { amount: 5000, label: "Gaushala Rescue" },
];

interface SparkParticle {
  id: number;
  tx: number;
  ty: number;
  rot: number;
  emoji: string;
}

const INTERVAL = 5500;

export function HeroSplit() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchFlash, setTouchFlash] = useState(false);

  // 3D Parallax & Border Light State
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showScanToast, setShowScanToast] = useState(false);
  const [sparks, setSparks] = useState<SparkParticle[]>([]);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const activePillar = heroPillars[activeIdx] || heroPillars[0]!;

  // Circle drawing progress: anchored at start point, grows around 360°, and on touching start point changes content
  useEffect(() => {
    if (isPaused) return;

    setProgress(0);
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / INTERVAL) * 100);
      setProgress(pct);

      if (elapsed >= INTERVAL) {
        // Circle is fully drawn and touches start point!
        setTouchFlash(true);
        setTimeout(() => setTouchFlash(false), 500);

        // Advance to next mission slide content
        setActiveIdx((prev) => (prev + 1) % heroPillars.length);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [activeIdx, isPaused]);

  // Handle Card Mouse Move for 3D Tilt & Glare
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltY = ((x - centerX) / centerX) * 7;
    const tiltX = -((y - centerY) / centerY) * 7;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setCardTilt({ x: tiltX, y: tiltY, glareX, glareY });
  };

  const handleCardMouseLeave = () => {
    setIsPaused(false);
    setIsCardHovered(false);
    setCardTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  // Trigger Quantum Scan Beam & Advance on Click / Tap
  const triggerCardInteraction = () => {
    setIsScanning(true);
    setShowScanToast(true);
    setTouchFlash(true);

    const emojis = ["⚡", "✨", "🌟", "💫", "💎", "🔥", "🌿", "🛰️"];
    const newSparks: SparkParticle[] = Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
      const dist = 70 + Math.random() * 120;
      return {
        id: Date.now() + i,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        rot: (Math.random() - 0.5) * 120,
        emoji: emojis[Math.floor(Math.random() * emojis.length)] || "✨",
      };
    });

    setSparks(newSparks);

    // Immediately cycle to next mission slide
    setActiveIdx((prev) => (prev + 1) % heroPillars.length);
    setProgress(0);

    setTimeout(() => {
      setIsScanning(false);
      setTouchFlash(false);
    }, 600);

    setTimeout(() => {
      setSparks([]);
    }, 1100);

    setTimeout(() => {
      setShowScanToast(false);
    }, 2200);
  };

  // Circle drawing stroke offset:
  // Starts anchored at start point (1000 = 0% drawn) and draws forward to 0 (100% drawn = complete circle touching start point)
  const drawOffset = 1000 - (progress / 100) * 1000;

  return (
    <section className="relative w-full max-w-full overflow-x-clip flex flex-col justify-start lg:justify-between pt-20 sm:pt-24 lg:pt-24 xl:pt-28 pb-8 sm:pb-12 lg:pb-3 xl:pb-4 lg:h-[100svh] lg:min-h-[640px] lg:max-h-[100svh] bg-gradient-to-b from-[#fdfbf7] via-[#f8f3ec] to-[#f4ece0] dark:from-[#070c18] dark:via-[#0b1222] dark:to-[#060a14]">
      {/* Ambient Glowing Energy Mesh */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-[130px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-1/4 -right-32 h-[30rem] w-[30rem] rounded-full bg-amber-500/15 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]" />

      {/* Cyber-Mesh Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ea580c_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.06] dark:opacity-[0.1]" />

      <div className="relative mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* TOP HUD ROW: RADAR STATUS CAPSULE + DYNAMIC CAUSE SWITCHER */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 shrink-0 mb-1.5 lg:mb-2 pt-1 sm:pt-0">
          {/* Section 8 Radar Beacon */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-primary/30 bg-white/80 dark:bg-white/5 px-3 sm:px-4 py-1 sm:py-1.5 shadow-[0_10px_25px_-8px_rgba(234,88,12,0.2)] backdrop-blur-2xl">
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500" />
            </span>
            <span className="font-display text-[11px] sm:text-xs font-bold tracking-wider text-primary uppercase">
              Section 8 Non-Profit
            </span>
            <span className="text-muted-foreground/40 font-bold">·</span>
            <span className="font-mono text-[10px] sm:text-[11px] text-muted-foreground">CIN {org.cin}</span>
            <span className="hidden sm:inline text-muted-foreground/40 font-bold">|</span>
            <span className="hidden sm:inline text-xs font-medium text-navy dark:text-white flex items-center gap-1">
              <MapPin className="h-3 w-3 text-primary" /> Forbesganj, Bihar
            </span>
          </div>

          {/* Interactive Cause Pills Bar */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
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
                    "group relative flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer select-none",
                    isActive
                      ? "bg-navy text-white shadow-[0_8px_20px_-4px_rgba(20,28,50,0.4)] scale-102 sm:scale-105"
                      : "bg-white/70 dark:bg-white/5 text-navy dark:text-white hover:bg-white border border-border/60 hover:scale-102",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3 sm:h-3.5 w-3 sm:w-3.5 transition-transform group-hover:scale-110",
                      isActive ? "text-amber-400" : "text-primary",
                    )}
                  />
                  <span>{p.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER STAGE: ROCK-SOLID ZERO-SHIFT GRID */}
        <div className="grid items-center gap-5 sm:gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 xl:gap-12 flex-1 my-auto">
          {/* LEFT: GRAND TYPOGRAPHY & COMMAND CONSOLE */}
          <div className="flex flex-col justify-center">
            {/* Priority Mission Badge */}
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 sm:px-3 py-0.5 text-[11px] sm:text-xs font-bold tracking-wider text-primary border border-primary/25">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {activePillar.badge}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500" />
                80G & 12A Certified
              </span>
            </div>

            {/* Stable Height Headline Box */}
            <div className="min-h-[4.2rem] sm:min-h-[5.8rem] lg:min-h-[6.2rem] xl:min-h-[6.8rem] flex flex-col justify-center">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.25rem] 2xl:text-[3.6rem] font-extrabold tracking-tight text-navy dark:text-white leading-[1.08]">
                {activePillar.title}{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706]">
                  {activePillar.accent}
                </span>
              </h1>
            </div>

            {/* Stable Height Narrative Box */}
            <div className="mt-1 sm:mt-2 min-h-[2.2rem] lg:min-h-[2.6rem] flex items-center">
              <p className="max-w-xl text-xs sm:text-sm lg:text-[0.92rem] leading-relaxed text-muted-foreground dark:text-muted-foreground/90 line-clamp-2">
                {activePillar.body}
              </p>
            </div>

            {/* 2035 HORIZONTAL COMMAND CONSOLE */}
            <div className="mt-2.5 sm:mt-3.5 rounded-3xl border border-white/80 dark:border-white/10 bg-white/80 dark:bg-white/5 p-3 sm:p-4 lg:p-4.5 shadow-[0_20px_50px_-20px_rgba(20,28,50,0.15)] backdrop-blur-2xl">
              {/* Preset Matrix Header */}
              <div className="flex items-center justify-between mb-1.5 sm:mb-2.5">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-navy dark:text-white flex items-center gap-1.5">
                  <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" /> Instant Support Console
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                  Tax Exempt 80G
                </span>
              </div>

              {/* 4 Instant Amount Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {donationChips.map((chip) => {
                  const isChosen = selectedAmount === chip.amount;
                  return (
                    <button
                      key={chip.amount}
                      type="button"
                      onClick={() => setSelectedAmount(chip.amount)}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-2xl py-1.5 sm:py-2 px-2 sm:px-2.5 transition-all duration-200 cursor-pointer select-none",
                        isChosen
                          ? "bg-gradient-to-br from-primary to-[#d97706] text-white shadow-lg shadow-primary/30 scale-102 sm:scale-105"
                          : "bg-accent/50 dark:bg-white/5 text-navy dark:text-white hover:bg-accent hover:scale-102 border border-border/60",
                      )}
                    >
                      <span className="font-display text-sm sm:text-base lg:text-base xl:text-lg font-bold leading-tight">
                        ₹{chip.amount.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={cn(
                          "text-[9px] sm:text-[10px] line-clamp-1 mt-0.5 font-medium",
                          isChosen ? "text-white/90" : "text-muted-foreground",
                        )}
                      >
                        {chip.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Unified Action Dock */}
              <div className="mt-2.5 sm:mt-3.5 flex flex-wrap items-center gap-2 sm:gap-2.5">
                {/* Donate CTA with Selected Amount */}
                <Link
                  to="/donate"
                  search={{ amount: selectedAmount }}
                  className="group flex-1 min-w-[130px] sm:min-w-[150px] inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-bold tracking-[0.12em] text-white uppercase shadow-[0_10px_24px_-4px_rgba(234,88,12,0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-white transition-transform group-hover:scale-125" />
                  <span>Donate ₹{selectedAmount.toLocaleString("en-IN")}</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Volunteer Action */}
                <Link
                  to="/volunteer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy/30 dark:border-white/20 bg-white/70 dark:bg-white/5 px-3.5 sm:px-4.5 py-2.5 sm:py-3 text-xs font-bold tracking-[0.1em] text-navy dark:text-white uppercase transition-all duration-200 hover:bg-navy hover:text-white hover:border-navy"
                >
                  Volunteer
                </Link>

                {/* Direct Phone Helpline */}
                <a
                  href={`tel:${org.phone}`}
                  className="hidden sm:flex items-center gap-1.5 rounded-full bg-card px-3 sm:px-3.5 py-2.5 sm:py-3 text-xs font-bold text-navy shadow-xs ring-1 ring-border/80 hover:bg-accent transition-colors"
                  title="Call Trinetra Helpline"
                >
                  <span className="flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </span>
                  <span className="font-mono text-xs">{org.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: CARD WITH ANCHORED BORDER LIGHT FORMING A FULL CIRCLE AND CHANGING CONTENT ON START TOUCH */}
          <div
            ref={cardRef}
            onMouseEnter={() => {
              setIsPaused(true);
              setIsCardHovered(true);
            }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            onTouchStart={() => {
              setIsPaused(true);
              setIsCardHovered(true);
            }}
            onTouchEnd={() => {
              setIsPaused(false);
              setIsCardHovered(false);
            }}
            onClick={triggerCardInteraction}
            role="button"
            tabIndex={0}
            aria-label="Tap card to warp to next mission"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerCardInteraction();
              }
            }}
            className="relative mx-auto w-full max-w-[22.5rem] sm:max-w-[26rem] lg:max-w-[28rem] xl:max-w-[32rem] mt-6 sm:mt-8 lg:mt-0 cursor-pointer select-none perspective-[1000px] transform-gpu"
          >
            {/* CONTINUOUS DRAWING BORDER LIGHT CIRCLE (ANCHORED AT START POINT) */}
            <svg
              className="pointer-events-none absolute -inset-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)] overflow-visible z-30"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Ultra-Fine Sleek Neon Glow Filter */}
                <filter id="draw-circle-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation={isCardHovered ? "1.4" : "0.7"} result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Idle Saffron-Amber Laser Gradient (Start Point Anchor -> Hot White Leading Tip) */}
                <linearGradient id="draw-circle-idle" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="85%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>

                {/* Active Electric Emerald-Cyan-Purple Plasma Gradient */}
                <linearGradient id="draw-circle-active" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="30%" stopColor="#8b5cf6" />
                  <stop offset="70%" stopColor="#06b6d4" />
                  <stop offset="92%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>

              {/* Ultra-Thin Micro Ambient Border Track */}
              <rect
                x="1.5"
                y="1.5"
                width="97"
                height="97"
                rx="12"
                ry="12"
                fill="none"
                stroke="currentColor"
                className="text-black/8 dark:text-white/10"
                strokeWidth="0.4"
              />

              {/* ANCHORED GROWING LASER BORDER (ULTRA-THIN, HELD AT START POINT, EXTENDING FORWARD TO COMPLETE CIRCLE) */}
              <rect
                x="1.5"
                y="1.5"
                width="97"
                height="97"
                rx="12"
                ry="12"
                fill="none"
                stroke={isCardHovered ? "url(#draw-circle-active)" : "url(#draw-circle-idle)"}
                strokeWidth={isCardHovered ? "1.3" : "0.8"}
                strokeLinecap="round"
                pathLength="1000"
                strokeDasharray="1000 1000"
                style={{
                  strokeDashoffset: drawOffset,
                  transition: "stroke-dashoffset 35ms linear",
                }}
                filter="url(#draw-circle-glow)"
              />

              {/* Whisper-Fine Core Laser Thread */}
              <rect
                x="1.5"
                y="1.5"
                width="97"
                height="97"
                rx="12"
                ry="12"
                fill="none"
                stroke={isCardHovered ? "url(#draw-circle-active)" : "url(#draw-circle-idle)"}
                strokeWidth={isCardHovered ? "0.7" : "0.45"}
                strokeLinecap="round"
                pathLength="1000"
                strokeDasharray="1000 1000"
                style={{
                  strokeDashoffset: drawOffset,
                  transition: "stroke-dashoffset 35ms linear",
                }}
              />

              {/* START POINT ANCHOR NODE (Micro Beacon) */}
              <circle
                cx="13.5"
                cy="1.5"
                r={isCardHovered ? "1.4" : "0.9"}
                fill={isCardHovered ? "#10b981" : "#ea580c"}
                className={cn(touchFlash && "animate-ping")}
              />
            </svg>

            {/* Corner Touch Flash Beacon when light reaches start point */}
            {touchFlash && (
              <div className="pointer-events-none absolute -top-2 -left-2 h-8 w-8 rounded-full bg-amber-400/80 animate-ping z-40" />
            )}

            {/* Inner Frosted Card Container */}
            <div
              className={cn(
                "relative rounded-[2.5rem] sm:rounded-[3rem] p-2.5 sm:p-3.5 border border-white/90 dark:border-white/15 bg-white/60 dark:bg-white/5 shadow-2xl backdrop-blur-3xl transition-all duration-300",
                isCardHovered
                  ? "scale-[1.03] shadow-[0_30px_70px_-15px_rgba(234,88,12,0.35)]"
                  : "scale-100 shadow-[0_25px_60px_-20px_rgba(20,28,50,0.2)]",
              )}
              style={{
                transform: isCardHovered
                  ? `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`
                  : "rotateX(0deg) rotateY(0deg)",
              }}
            >
              {/* Media Window - 100% Constant Height Across All 5 Slides */}
              <div className="relative aspect-[4/3.4] sm:aspect-[4/3.4] lg:aspect-[4/3.1] h-[310px] sm:h-[340px] lg:h-[310px] xl:h-[360px] w-full overflow-hidden rounded-[2.25rem] bg-navy/10 shadow-inner">
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
                      isCardHovered && "scale-105",
                    )}
                  />
                ))}

                {/* Holographic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />

                {/* Dynamic Light Glare Reflection Following Pointer */}
                {isCardHovered && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay transition-opacity"
                    style={{
                      background: `radial-gradient(circle at ${cardTilt.glareX}% ${cardTilt.glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                    }}
                  />
                )}

                {/* QUANTUM SCAN LASER BEAM ON CLICK / TAP */}
                {isScanning && (
                  <div className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent shadow-[0_0_25px_#10b981] animate-[scan-sweep_0.75s_ease-in-out_forwards] z-30" />
                )}

                {/* CONCENTRIC SHOCKWAVE PULSE RINGS */}
                {isScanning && (
                  <div className="pointer-events-none absolute inset-0 rounded-full border-4 border-emerald-400/80 animate-ping z-30" />
                )}

                {/* FLOATING SPARK BURST PARTICLES */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-40">
                  {sparks.map((s) => (
                    <div
                      key={s.id}
                      className="absolute text-xl sm:text-2xl animate-[love-burst_0.8s_cubic-bezier(0.25,1,0.5,1)_forwards]"
                      style={
                        {
                          "--tw-translate-x": `${s.tx}px`,
                          "--tw-translate-y": `${s.ty}px`,
                          "--tw-rotate": `${s.rot}deg`,
                        } as React.CSSProperties
                      }
                    >
                      <span>{s.emoji}</span>
                    </div>
                  ))}
                </div>

                {/* FLOATING TOP-LEFT VERIFIED BADGE */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full border border-white/50 bg-white/90 dark:bg-[#0c1424]/90 px-3.5 py-1.5 shadow-lg backdrop-blur-xl animate-[float-subtle_4s_ease-in-out_infinite] z-20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="font-display text-xs font-bold text-navy dark:text-white">
                    Verified Grassroots
                  </span>
                </div>

                {/* FLOATING TOP-RIGHT PROGRAMME PILL */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/95 px-3.5 py-1.5 text-white shadow-lg backdrop-blur-xl z-20">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold">{activePillar.stat}</span>
                </div>

                {/* FLOATING BOTTOM SPOTLIGHT CARD */}
                <div className="absolute inset-x-2.5 sm:inset-x-3.5 bottom-2.5 sm:bottom-3.5 rounded-2xl sm:rounded-3xl border border-white/30 bg-white/90 dark:bg-[#0c1424]/90 p-2.5 sm:p-3.5 shadow-xl backdrop-blur-2xl z-20 transition-transform duration-300 hover:scale-102">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-primary uppercase flex items-center gap-1">
                        <Radio className="h-3 w-3 animate-pulse text-emerald-500" />
                        Current Mission Focus
                      </span>
                      <h4 className="font-display text-base font-bold text-navy dark:text-white">
                        {activePillar.label} Programme
                      </h4>
                    </div>
                    <Link
                      to="/work"
                      onClick={(e) => e.stopPropagation()}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:scale-110 transition-transform shadow-md shadow-primary/30"
                      title="Explore programme"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-2 font-medium">
                    <span>{activePillar.statDesc}</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live in Bihar
                    </span>
                  </div>
                </div>

                {/* FLOATING CELEBRATION TOAST ON CARD CLICK */}
                {showScanToast && (
                  <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-[float-heart-up_1.8s_ease-out_forwards]">
                    <div className="flex items-center gap-2 rounded-full bg-navy/95 text-white px-5 py-2.5 text-xs font-bold shadow-2xl border border-emerald-400 backdrop-blur-xl whitespace-nowrap">
                      <Zap className="h-4 w-4 text-emerald-400 animate-spin" />
                      <span>{activePillar.label} Mission Engaged! ⚡</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM HUD DOCK: 4 STATUTORY PILLARS */}
        <div className="shrink-0 pt-1">
          {/* 4-Point Statutory Telemetry Dock */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: "12 Focus Sectors", sub: "Universal Welfare", dot: "bg-primary" },
              { label: "Section 8 Non-Profit", sub: "CIN " + org.cin.slice(0, 10) + "...", dot: "bg-amber-500" },
              { label: "80G & 12A Certified", sub: "100% Tax Exempt", dot: "bg-emerald-500" },
              { label: "Forbesganj, Bihar", sub: "Grassroots HQ", dot: "bg-indigo-500" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 rounded-2xl border border-white/80 dark:border-white/10 bg-white/60 dark:bg-white/5 py-1.5 px-3 shadow-xs backdrop-blur-xl"
              >
                <span className={cn("h-2 w-2 rounded-full shrink-0", stat.dot)} />
                <div className="truncate">
                  <p className="font-display text-xs font-bold text-navy dark:text-white truncate">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
