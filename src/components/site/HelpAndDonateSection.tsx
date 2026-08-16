import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Zap,
  CheckCircle2,
  Users,
  Coins,
  MapPin,
  Flame,
  Radio,
  X,
} from "lucide-react";
import { org } from "@/lib/site";
import donateFood from "@/assets/donate-food.jpg";
import donateEducation from "@/assets/donate-education.jpg";
import donateHealth from "@/assets/donate-health.jpg";
import donateAnimal from "@/assets/donate-animal.jpg";
import donateEnvironment from "@/assets/donate-environment.jpg";
import { cn } from "@/lib/utils";

interface CampaignItem {
  id: string;
  category: string;
  categoryGradient: string;
  tagColor: string;
  title: string;
  desc: string;
  image: string;
  raised: number;
  goal: number;
  basePercentage: number;
  donorCount: number;
  location: string;
  urgentNote?: string;
  tiers: {
    amount: number;
    label: string;
    impact: string;
  }[];
}

const campaigns: CampaignItem[] = [
  {
    id: "food-relief",
    category: "Foods & Nutrition",
    categoryGradient: "from-orange-500 to-amber-600",
    tagColor: "bg-orange-500",
    title: "Daily Nutrition & Emergency Ration for Destitute Families",
    desc: "Delivering hot cooked meals and monthly dry ration kits to impoverished households across Forbesganj.",
    image: donateFood,
    raised: 195000,
    goal: 250000,
    basePercentage: 78,
    donorCount: 428,
    location: "Forbesganj & Araria",
    urgentNote: "Urgent Hunger Relief",
    tiers: [
      { amount: 500, label: "10 Warm Meals", impact: "Feeds a vulnerable family for 3 days" },
      { amount: 1000, label: "Monthly Ration", impact: "Rice, dal, oil & spices kit" },
      { amount: 2500, label: "Kitchen Sponsor", impact: "Funds 50 fresh hot meals" },
    ],
  },
  {
    id: "education-stem",
    category: "Education & STEM",
    categoryGradient: "from-blue-600 to-indigo-600",
    tagColor: "bg-blue-600",
    title: "STEM Learning Labs & School Kits for Rural Girls",
    desc: "Providing textbooks, digital tablets, and certified coaching mentorship so financial hardship never halts education.",
    image: donateEducation,
    raised: 270000,
    goal: 300000,
    basePercentage: 90,
    donorCount: 684,
    location: "Village Learning Hubs",
    urgentNote: "Active Term Drive",
    tiers: [
      { amount: 500, label: "Study Books", impact: "Books, geometry set & bag" },
      { amount: 1000, label: "Scholarship", impact: "Covers books & coaching fees" },
      { amount: 2500, label: "STEM Lab Kit", impact: "Provides digital tablet access" },
    ],
  },
  {
    id: "medical-aid",
    category: "Medical & Health",
    categoryGradient: "from-emerald-600 to-teal-700",
    tagColor: "bg-emerald-600",
    title: "Free Diagnostics, Surgery Support & Emergency Medicine",
    desc: "Organising free specialist diagnostic camps, diabetes/BP screenings, and emergency medical surgery funds.",
    image: donateHealth,
    raised: 160000,
    goal: 250000,
    basePercentage: 64,
    donorCount: 312,
    location: "Rural Bihar Hamlets",
    urgentNote: "Mobile Health Camp",
    tiers: [
      { amount: 500, label: "Prescription Aid", impact: "Essential medicines for 1 patient" },
      { amount: 1000, label: "Diagnostic Panel", impact: "Blood, sugar, BP & consultation" },
      { amount: 2500, label: "Surgical Fund", impact: "Emergency specialized hospital treatment" },
    ],
  },
  {
    id: "gaushala-care",
    category: "Gaushala & Animals",
    categoryGradient: "from-amber-600 to-yellow-600",
    tagColor: "bg-amber-600",
    title: "Shelter, Green Fodder & Rescue for Abandoned Cattle",
    desc: "24/7 veterinary assistance, rescue vehicles, clean Gaushala shelter, and daily green fodder for stray animals.",
    image: donateAnimal,
    raised: 380000,
    goal: 400000,
    basePercentage: 95,
    donorCount: 896,
    location: "Trinetra Gaushala",
    urgentNote: "24/7 Rescue Active",
    tiers: [
      { amount: 500, label: "Green Fodder", impact: "Nutritious fodder for 2 cattle" },
      { amount: 1500, label: "Sanctuary Care", impact: "Weekly shelter & veterinary care" },
      { amount: 3000, label: "Rescue Fund", impact: "Veterinary surgery & ambulance" },
    ],
  },
  {
    id: "afforestation-water",
    category: "Ecology & Water",
    categoryGradient: "from-green-600 to-emerald-700",
    tagColor: "bg-green-600",
    title: "Native Tree Plantation & Clean Arsenic-Free Village Wells",
    desc: "Restoring native forest cover along the Kosi river basin and installing deep-bore drinking water pumps.",
    image: donateEnvironment,
    raised: 125000,
    goal: 250000,
    basePercentage: 50,
    donorCount: 249,
    location: "Kosi Basin, Forbesganj",
    urgentNote: "Clean Water Drive",
    tiers: [
      { amount: 500, label: "5 Native Trees", impact: "Neem, Peepal & Fruit saplings" },
      { amount: 1000, label: "10 Tree Plot", impact: "Afforestation plot with drip watering" },
      { amount: 2500, label: "Water Filter", impact: "Clean drinking filtration unit" },
    ],
  },
];

const liveDonationFeed = [
  { donor: "Aarav S.", amount: 1000, cause: "Food Relief", time: "2m ago" },
  { donor: "Priya M.", amount: 2500, cause: "STEM Education", time: "5m ago" },
  { donor: "Rajiv K.", amount: 5000, cause: "Gaushala Care", time: "12m ago" },
  { donor: "Dr. Sunita", amount: 2500, cause: "Diagnostics", time: "18m ago" },
  { donor: "Vikram M.", amount: 1000, cause: "Tree Drive", time: "27m ago" },
];

export function HelpAndDonateSection() {
  const [selectedTiers, setSelectedTiers] = useState<Record<string, number>>({
    "food-relief": 1000,
    "education-stem": 1000,
    "medical-aid": 1000,
    "gaushala-care": 1500,
    "afforestation-water": 1000,
  });

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [lovedCards, setLovedCards] = useState<Record<string, number>>({
    "food-relief": 142,
    "education-stem": 218,
    "medical-aid": 96,
    "gaushala-care": 315,
    "afforestation-water": 84,
  });
  const [activeHeartAnimation, setActiveHeartAnimation] = useState<string | null>(null);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Quick Pledge Modal State
  const [quickPledgeModal, setQuickPledgeModal] = useState<{
    isOpen: boolean;
    campaign: CampaignItem | null;
    amount: number;
  }>({
    isOpen: false,
    campaign: null,
    amount: 1000,
  });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveDonationFeed.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 350;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleHeartBurst = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLovedCards((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setActiveHeartAnimation(id);
    setTimeout(() => setActiveHeartAnimation(null), 1200);
  };

  const openQuickPledge = (campaign: CampaignItem, amount: number) => {
    setQuickPledgeModal({
      isOpen: true,
      campaign,
      amount,
    });
  };

  const currentLiveFeed = liveDonationFeed[tickerIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f2] via-[#f7f2e8] to-[#f4ece0] dark:from-[#070c18] dark:via-[#0b1222] dark:to-[#060a14] min-h-[660px] lg:h-[100svh] lg:max-h-[960px] flex flex-col justify-between py-4 sm:py-5 lg:py-6 border-t border-border/50">
      {/* Dynamic Ambient Energy Flares */}
      <div className="pointer-events-none absolute top-8 left-10 h-80 w-80 rounded-full bg-primary/15 blur-[120px] animate-[pulse_9s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-1/2 right-10 h-72 w-72 rounded-full bg-amber-500/15 blur-[110px] animate-[pulse_11s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-10 left-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />

      {/* Cyber Mesh Background Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ea580c_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.05] dark:opacity-[0.08]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* COMPACT TOP CANOPY: HEADER ROW */}
        <div className="flex flex-wrap items-center justify-between gap-3 shrink-0 mb-2 sm:mb-3">
          <div>
            {/* Live Trust Beacon */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary border border-primary/20">
                <Heart className="h-3 w-3 fill-primary text-primary animate-pulse" />
                Help & Donate us
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                80G Certified
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary" /> Forbesganj HQ
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold tracking-tight text-navy dark:text-white leading-tight">
              Inspiring and Helping for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706]">
                Better Lifestyle
              </span>
            </h2>
          </div>

          {/* RIGHT SIDE: LIVE DONOR POD + NAVIGATION CONTROLS */}
          <div className="flex items-center gap-3">
            {/* Live Donor Hub Capsule */}
            <div className="hidden sm:flex items-center gap-2.5 rounded-full border border-white/90 dark:border-white/10 bg-white/80 dark:bg-white/5 py-1 px-3 shadow-xs backdrop-blur-xl">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-white dark:ring-navy bg-gradient-to-tr from-amber-400 to-orange-500 text-white font-bold text-[10px]">
                  AK
                </div>
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-white dark:ring-navy bg-gradient-to-tr from-emerald-400 to-teal-600 text-white font-bold text-[10px]">
                  PS
                </div>
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-white dark:ring-navy bg-navy text-white font-bold text-[9px]">
                  2.8K
                </div>
              </div>
              <div className="text-left">
                <p className="font-display text-[11px] font-bold text-navy dark:text-white leading-none">
                  2,840+ Donors
                </p>
                <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span>{currentLiveFeed.donor} gave ₹{currentLiveFeed.amount} ({currentLiveFeed.time})</span>
                </p>
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous campaigns"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-white/90 dark:bg-white/5 text-navy dark:text-white shadow-xs hover:bg-navy hover:text-white dark:hover:bg-primary transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next campaigns"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-white/90 dark:bg-white/5 text-navy dark:text-white shadow-xs hover:bg-navy hover:text-white dark:hover:bg-primary transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* CAMPAIGN CARDS HORIZONTAL CAROUSEL - COMPACT ADAPTIVE HEIGHT */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory scrollbar-none flex-1 my-auto items-center"
        >
          {campaigns.map((item) => {
            const isHovered = hoveredCard === item.id;
            const currentSelectedAmount = selectedTiers[item.id] || item.tiers[0].amount;
            const activeTier = item.tiers.find((t) => t.amount === currentSelectedAmount) || item.tiers[0];
            const loves = lovedCards[item.id] || 120;
            const isHeartBursting = activeHeartAnimation === item.id;

            const dynamicProgress = Math.min(
              100,
              item.basePercentage + (currentSelectedAmount > 1000 ? 3 : 0),
            );

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onTouchStart={() => setHoveredCard(item.id)}
                className="group relative flex-none w-[290px] sm:w-[325px] lg:w-[345px] snap-start rounded-[2rem] border border-white/90 dark:border-white/10 bg-white/95 dark:bg-[#0d1527]/95 p-3.5 sm:p-4 shadow-[0_12px_35px_-12px_rgba(20,28,50,0.12)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-12px_rgba(234,88,12,0.25)] flex flex-col justify-between"
              >
                {/* Glowing Laser Perimeter Border on Hover */}
                <div
                  className={cn(
                    "pointer-events-none absolute -inset-[1.5px] rounded-[2.1rem] transition-all duration-500",
                    isHovered
                      ? "opacity-100 bg-gradient-to-br from-primary via-amber-400 to-emerald-500 blur-[0.5px]"
                      : "opacity-0",
                  )}
                />

                <div className="relative z-10">
                  {/* TOP HEADER ROW: CENTERED CATEGORY PILL ABOVE PHOTO */}
                  <div className="flex items-center justify-center relative mb-2 px-0.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-0.5 text-[11px] font-bold text-white shadow-xs",
                        item.tagColor,
                      )}
                    >
                      <Sparkles className="h-3 w-3" />
                      {item.category}
                    </span>

                    {/* Heart Reaction Button with Live Count on Right */}
                    <button
                      type="button"
                      onClick={(e) => handleHeartBurst(e, item.id)}
                      title="Send Love"
                      aria-label="Send Love"
                      className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-full bg-accent/60 dark:bg-white/10 px-2 py-0.5 text-primary shadow-xs hover:scale-110 active:scale-90 transition-transform cursor-pointer border border-border/60"
                    >
                      <Heart
                        className={cn(
                          "h-3 w-3 fill-primary text-primary transition-transform",
                          isHeartBursting && "scale-150 animate-ping",
                        )}
                      />
                      <span className="text-[10px] font-bold text-navy dark:text-white">{loves}</span>
                    </button>
                  </div>

                  {/* COMPACT PHOTO CONTAINER */}
                  <div className="relative h-[130px] sm:h-[145px] lg:h-[155px] w-full overflow-hidden rounded-[1.3rem] bg-navy/10 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                    {/* Floating Burst Particles on Click */}
                    {isHeartBursting && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-30">
                        <span className="animate-[love-burst_0.8s_cubic-bezier(0.25,1,0.5,1)_forwards] text-2xl">
                          ❤️ ✨ 💖
                        </span>
                      </div>
                    )}

                    {/* Bottom Ground Location & Urgency Pill */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 text-white px-2 py-0.5 text-[9px] font-medium backdrop-blur-md">
                        <MapPin className="h-2.5 w-2.5 text-amber-400" />
                        {item.location}
                      </span>
                      {item.urgentNote && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-600/90 text-white px-2 py-0.5 text-[9px] font-bold shadow-md backdrop-blur-md">
                          <Flame className="h-2.5 w-2.5 fill-white animate-pulse" />
                          {item.urgentNote}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PROGRESS BAR & STATS */}
                  <div className="mt-3 relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-2.5 w-2.5 text-primary" /> Progress
                      </span>
                      <span className="font-display font-bold text-[11px] text-primary bg-primary/10 px-2 py-0.2 rounded-full border border-primary/20">
                        {dynamicProgress}%
                      </span>
                    </div>

                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10 shadow-inner">
                      <div
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r transition-all duration-500 relative overflow-hidden",
                          item.categoryGradient,
                        )}
                        style={{ width: `${dynamicProgress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[holo-shimmer_2s_infinite]" />
                      </div>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-navy dark:text-white">
                        Raised: <span className="font-mono text-primary">₹{item.raised.toLocaleString("en-IN")}</span>
                      </span>
                      <span className="text-muted-foreground font-mono text-[10px]">
                        Goal: ₹{item.goal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* CAMPAIGN TITLE */}
                  <div className="mt-2.5">
                    <h3 className="font-display text-sm sm:text-[15px] font-bold text-navy dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* INTERACTIVE INSTANT TIER SELECTOR */}
                  <div className="mt-2.5 pt-2 border-t border-border/50">
                    <div className="grid grid-cols-3 gap-1">
                      {item.tiers.map((tier) => {
                        const isChosen = currentSelectedAmount === tier.amount;
                        return (
                          <button
                            key={tier.amount}
                            type="button"
                            onClick={() =>
                              setSelectedTiers((prev) => ({
                                ...prev,
                                [item.id]: tier.amount,
                              }))
                            }
                            className={cn(
                              "rounded-lg py-1 px-1 text-center transition-all duration-200 cursor-pointer select-none border",
                              isChosen
                                ? "bg-primary text-white border-primary shadow-xs scale-102"
                                : "bg-accent/40 dark:bg-white/5 text-navy dark:text-white hover:bg-accent border-border/60",
                            )}
                          >
                            <p className="font-display text-[11px] font-bold leading-tight">
                              ₹{tier.amount}
                            </p>
                            <p
                              className={cn(
                                "text-[8.5px] line-clamp-1 mt-0.5",
                                isChosen ? "text-white/90" : "text-muted-foreground",
                              )}
                            >
                              {tier.label}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-1.5 rounded-lg bg-primary/8 dark:bg-white/5 border border-primary/15 py-1 px-2">
                      <p className="text-[10px] font-medium text-primary flex items-center gap-1 truncate">
                        <Sparkles className="h-2.5 w-2.5 shrink-0 text-primary" />
                        <span className="truncate">{activeTier.impact}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* BOTTOM ACTION BUTTON */}
                <div className="mt-3 pt-2.5 border-t border-border/50 relative z-10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => openQuickPledge(item, currentSelectedAmount)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-navy dark:bg-primary px-4 py-2 text-[11px] font-bold tracking-wider text-white uppercase shadow-xs transition-all duration-300 hover:bg-primary dark:hover:bg-primary/90 hover:scale-102 active:scale-98 cursor-pointer group/btn"
                  >
                    <span>Donate ₹{currentSelectedAmount.toLocaleString("en-IN")}</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3 text-emerald-500" />
                    {item.donorCount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPACT BOTTOM STATUTORY TELEMETRY DOCK */}
        <div className="shrink-0 pt-2 pb-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: "100% Tax Deductible", sub: "Section 80G Compliant", dot: "bg-emerald-500" },
              { label: "Public Ground Audit", sub: "Forbesganj, Bihar", dot: "bg-primary" },
              { label: "Instant SMS & Receipt", sub: "Digital Verification", dot: "bg-amber-500" },
              { label: "Direct Field Action", sub: "12 Welfare Sectors", dot: "bg-indigo-500" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 rounded-xl border border-white/80 dark:border-white/10 bg-white/60 dark:bg-white/5 py-1 px-2.5 shadow-xs backdrop-blur-xl"
              >
                <span className={cn("h-2 w-2 rounded-full shrink-0", stat.dot)} />
                <div className="truncate">
                  <p className="font-display text-[11px] font-bold text-navy dark:text-white truncate">
                    {stat.label}
                  </p>
                  <p className="text-[9px] text-muted-foreground truncate">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK PLEDGE INSTANT MODAL */}
      {quickPledgeModal.isOpen && quickPledgeModal.campaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="relative w-full max-w-lg rounded-[2.25rem] border border-white/80 dark:border-white/10 bg-white dark:bg-[#0c1424] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setQuickPledgeModal({ isOpen: false, campaign: null, amount: 1000 })}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-navy dark:text-white hover:bg-primary hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Heart className="h-5 w-5 fill-primary" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  Direct Grassroots Support
                </span>
                <h3 className="font-display text-lg font-bold text-navy dark:text-white">
                  Pledge ₹{quickPledgeModal.amount.toLocaleString("en-IN")}
                </h3>
              </div>
            </div>

            <div className="rounded-xl bg-accent/40 dark:bg-white/5 p-3 mb-4 border border-border/60">
              <p className="text-xs font-bold text-navy dark:text-white">
                {quickPledgeModal.campaign.title}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {quickPledgeModal.campaign.desc}
              </p>
            </div>

            <div className="space-y-1.5 mb-5 text-[11px] text-muted-foreground">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>100% Tax Exemption certificate under Section 80G issued instantly.</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>Instant confirmation SMS and verified ground delivery video.</span>
              </p>
            </div>

            <Link
              to="/donate"
              search={{
                amount: quickPledgeModal.amount,
                cause: quickPledgeModal.campaign.id,
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg hover:scale-102 active:scale-98 transition-all text-center"
            >
              <span>Proceed with UPI / Card</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
