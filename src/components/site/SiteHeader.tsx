import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  ChevronDown,
  Heart,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Building2,
  GraduationCap,
  Utensils,
  Stethoscope,
  Briefcase,
  Trees,
  PawPrint,
  LifeBuoy,
  Scale,
  Palette,
  Lightbulb,
  Compass,
  ArrowUpRight,
  HandHeart,
  Users,
  Handshake,
} from "lucide-react";
import { workAreas, org } from "@/lib/site";
import { cn } from "@/lib/utils";

// Map each work area slug to a specific icon & gradient color
const workAreaMeta: Record<string, { icon: typeof Utensils; color: string; badge: string }> = {
  "food-and-nutrition": { icon: Utensils, color: "from-amber-500/20 to-orange-500/20 text-orange-600", badge: "Relief" },
  "education-and-literacy": { icon: GraduationCap, color: "from-blue-500/20 to-cyan-500/20 text-blue-600", badge: "Learn" },
  "student-empowerment": { icon: Compass, color: "from-indigo-500/20 to-purple-500/20 text-indigo-600", badge: "Futures" },
  "healthcare": { icon: Stethoscope, color: "from-emerald-500/20 to-teal-500/20 text-emerald-600", badge: "Health" },
  "livelihood": { icon: Briefcase, color: "from-amber-500/20 to-yellow-500/20 text-amber-600", badge: "Skills" },
  "animal-welfare": { icon: PawPrint, color: "from-emerald-500/20 to-green-500/20 text-emerald-700", badge: "Care" },
  "environment": { icon: Trees, color: "from-green-500/20 to-emerald-500/20 text-green-600", badge: "Eco" },
  "disaster-relief": { icon: LifeBuoy, color: "from-red-500/20 to-rose-500/20 text-rose-600", badge: "Emergency" },
  "rural-and-community-development": { icon: Building2, color: "from-teal-500/20 to-cyan-500/20 text-teal-600", badge: "Community" },
  "human-rights": { icon: Scale, color: "from-purple-500/20 to-pink-500/20 text-purple-600", badge: "Dignity" },
  "culture-and-sports": { icon: Palette, color: "from-rose-500/20 to-orange-500/20 text-rose-600", badge: "Youth" },
  "research-and-innovation": { icon: Lightbulb, color: "from-amber-500/20 to-sky-500/20 text-amber-600", badge: "Evidence" },
};

const involvedCards = [
  {
    to: "/donate",
    label: "Donate Now",
    desc: "Fund verified relief, education, food & animal care",
    icon: HandHeart,
    gradient: "from-orange-500/15 via-amber-500/10 to-transparent",
    accent: "text-primary",
    badge: "Immediate Impact",
  },
  {
    to: "/volunteer",
    label: "Join as Volunteer",
    desc: "Contribute time & skills across on-ground centres",
    icon: Users,
    gradient: "from-blue-500/15 via-indigo-500/10 to-transparent",
    accent: "text-blue-600",
    badge: "Be on Ground",
  },
  {
    to: "/partner",
    label: "Partner With Us",
    desc: "CSR, academic & institutional high-scale impact",
    icon: Handshake,
    gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
    accent: "text-emerald-600",
    badge: "Institutional",
  },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [involvedOpen, setInvolvedOpen] = useState(false);
  const workTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const involvedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHomePage = pathname === "/";
  // Compact mode is active on all inner pages, OR when scrolled on homepage
  const isCompact = !isHomePage || scrolled;

  useEffect(() => {
    let frame = 0;
    let isScrolled = window.scrollY > 10;

    const update = () => {
      frame = 0;
      const next = window.scrollY > 10;
      if (next !== isScrolled) {
        isScrolled = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menus on page route change
  useEffect(() => {
    setMobileOpen(false);
    setWorkOpen(false);
    setInvolvedOpen(false);
  }, [pathname]);

  const handleWorkEnter = () => {
    if (workTimeoutRef.current) clearTimeout(workTimeoutRef.current);
    setWorkOpen(true);
    setInvolvedOpen(false);
  };
  const handleWorkLeave = () => {
    workTimeoutRef.current = setTimeout(() => setWorkOpen(false), 150);
  };

  const handleInvolvedEnter = () => {
    if (involvedTimeoutRef.current) clearTimeout(involvedTimeoutRef.current);
    setInvolvedOpen(true);
    setWorkOpen(false);
  };
  const handleInvolvedLeave = () => {
    involvedTimeoutRef.current = setTimeout(() => setInvolvedOpen(false), 150);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 px-2.5 sm:px-6 pointer-events-none transition-all duration-150 ease-out",
        isCompact ? "top-1 sm:top-2" : "top-2.5 sm:top-4",
      )}
    >
      <div className="mx-auto max-w-7xl pointer-events-auto">
        {/* Floating Futuristic Island Capsule */}
        <div
          className={cn(
            "relative flex items-center justify-between gap-2 sm:gap-3 rounded-full transition-all duration-150 ease-out",
            "border backdrop-blur-2xl shadow-[0_15px_45px_-12px_rgba(20,28,50,0.18),0_0_20px_rgba(234,88,12,0.06)]",
            isCompact
              ? "bg-white/95 dark:bg-[#080e1d]/95 border-white/80 dark:border-white/20 py-1.5 px-3 sm:px-4.5 shadow-md"
              : "bg-white/90 dark:bg-[#0c1424]/90 border-white/70 dark:border-white/10 py-2.5 px-3.5 sm:px-6",
          )}
        >
          {/* Top subtle aurora gradient shimmer line */}
          <div className="pointer-events-none absolute -top-px inset-x-12 h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary/70 to-transparent blur-[0.5px] opacity-75" />

          {/* BRAND LOGO & IDENTITY */}
          <Link
            to="/"
            className="group flex items-center gap-2 sm:gap-3 focus:outline-none select-none shrink-0"
          >
            {/* Logo Emblem Pebble */}
            <div
              className={cn(
                "relative flex items-center justify-center rounded-2xl bg-white shadow-xs ring-1 ring-black/5 p-1 overflow-hidden transition-all duration-150 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.35)]",
                isCompact ? "h-8 w-8 sm:h-9 sm:w-9 rounded-xl" : "h-10 w-10 sm:h-12 sm:w-12",
              )}
            >
              <img
                src="/trinetra-logo.png"
                alt="Trinetra Foundation Emblem"
                className="h-full w-full object-contain"
                width={48}
                height={48}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Brand Titles */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "font-display font-extrabold tracking-[0.14em] text-navy dark:text-white leading-tight transition-all duration-150",
                    isCompact ? "text-xs sm:text-sm" : "text-sm sm:text-base",
                  )}
                >
                  TRINETRA
                </span>
                {!isCompact && (
                  <span className="hidden xl:inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-primary border border-primary/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SEC 8 NGO
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "font-bold tracking-[0.3em] text-primary flex items-center gap-1 leading-none transition-all duration-150",
                  isCompact ? "text-[8px] sm:text-[8.5px]" : "text-[9px] sm:text-[10px]",
                )}
              >
                FOUNDATION
              </span>
            </div>
          </Link>

          {/* DESKTOP 2035 PILL NAVIGATION */}
          <nav
            className={cn(
              "hidden lg:flex items-center gap-0.5 xl:gap-1 font-sans font-semibold transition-all duration-150",
              isCompact ? "text-xs" : "text-xs xl:text-sm",
            )}
          >
            <PillLink to="/" label="Home" active={pathname === "/"} compact={isCompact} />
            <PillLink to="/about" label="About" active={pathname === "/about"} compact={isCompact} />

            {/* OUR WORK MEGAMENU DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={handleWorkEnter}
              onMouseLeave={handleWorkLeave}
            >
              <button
                type="button"
                onClick={() => setWorkOpen(!workOpen)}
                className={cn(
                  "flex items-center gap-1 rounded-full transition-all duration-150 select-none cursor-pointer",
                  isCompact ? "px-2.5 py-1 text-xs font-semibold" : "px-2.5 xl:px-3.5 py-1.5 xl:py-2 font-bold",
                  "text-navy dark:text-white hover:text-primary hover:bg-primary/10 active:scale-95",
                  pathname.startsWith("/work") && "bg-primary/15 text-primary font-bold ring-1 ring-primary/30",
                )}
              >
                <span>Our Work</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-150 text-muted-foreground",
                    workOpen && "rotate-180 text-primary",
                  )}
                />
              </button>

              {/* 2035 FLOATING MEGAMENU DOCK */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[780px] transition-all duration-150 origin-top z-50",
                  workOpen
                    ? "opacity-100 translate-y-0 visible pointer-events-auto scale-100"
                    : "opacity-0 -translate-y-2 invisible pointer-events-none scale-95",
                )}
              >
                <div className="overflow-hidden rounded-3xl border border-white/80 dark:border-white/15 bg-white/95 dark:bg-[#0c1424]/95 p-5 shadow-[0_25px_70px_-20px_rgba(15,23,42,0.25),0_0_30px_rgba(234,88,12,0.1)] backdrop-blur-3xl">
                  {/* Header bar inside megamenu */}
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-display text-sm font-bold text-navy dark:text-white">
                          Twelve Impact Areas
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Systematic human, animal and environmental welfare across Bihar
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/work"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline group"
                      onClick={() => setWorkOpen(false)}
                    >
                      View Overview <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>

                  {/* 3-Column Interactive Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {workAreas.map((area) => {
                      const meta = workAreaMeta[area.slug] || {
                        icon: Sparkles,
                        color: "from-primary/20 to-gold/20 text-primary",
                        badge: "Program",
                      };
                      const Icon = meta.icon;
                      const isActive = pathname === `/work/${area.slug}`;

                      return (
                        <Link
                          key={area.slug}
                          to="/work/$slug"
                          params={{ slug: area.slug }}
                          onClick={() => setWorkOpen(false)}
                          className={cn(
                            "group/item relative flex items-start gap-2.5 rounded-2xl p-2.5 transition-all duration-150",
                            "hover:bg-accent/80 hover:scale-[1.02] active:scale-[0.98]",
                            isActive && "bg-primary/12 ring-1 ring-primary/30",
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-xs transition-transform duration-150 group-hover/item:scale-110",
                              meta.color,
                            )}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="truncate text-xs font-bold text-navy dark:text-white group-hover/item:text-primary transition-colors">
                                {area.title}
                              </span>
                              <span className="text-[9px] font-mono text-muted-foreground/80 opacity-60">
                                {area.index}
                              </span>
                            </div>
                            <p className="line-clamp-1 mt-0.5 text-[11px] text-muted-foreground font-medium">
                              {area.short}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Bottom Megamenu Action Ribbon */}
                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs bg-secondary/15 rounded-2xl px-4 py-2.5">
                    <span className="text-muted-foreground font-medium">
                      One commitment to dignity across every programme.
                    </span>
                    <Link
                      to="/donate"
                      className="font-bold text-primary hover:text-primary/80 flex items-center gap-1"
                      onClick={() => setWorkOpen(false)}
                    >
                      Support These Causes <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <PillLink to="/impact" label="Impact" active={pathname === "/impact"} compact={isCompact} />

            {/* GET INVOLVED INTERACTIVE DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={handleInvolvedEnter}
              onMouseLeave={handleInvolvedLeave}
            >
              <button
                type="button"
                onClick={() => setInvolvedOpen(!involvedOpen)}
                className={cn(
                  "flex items-center gap-1 rounded-full transition-all duration-150 select-none cursor-pointer",
                  isCompact ? "px-2.5 py-1 text-xs font-semibold" : "px-3.5 py-2 font-bold",
                  "text-navy dark:text-white hover:text-primary hover:bg-primary/10 active:scale-95",
                  ["/donate", "/volunteer", "/partner"].includes(pathname) &&
                    "bg-primary/15 text-primary font-bold ring-1 ring-primary/30",
                )}
              >
                <span>Get Involved</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-150 text-muted-foreground",
                    involvedOpen && "rotate-180 text-primary",
                  )}
                />
              </button>

              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 top-full pt-3 w-80 transition-all duration-150 origin-top z-50",
                  involvedOpen
                    ? "opacity-100 translate-y-0 visible pointer-events-auto scale-100"
                    : "opacity-0 -translate-y-2 invisible pointer-events-none scale-95",
                )}
              >
                <div className="overflow-hidden rounded-3xl border border-white/80 dark:border-white/15 bg-white/95 dark:bg-[#0c1424]/95 p-3 shadow-[0_25px_70px_-20px_rgba(15,23,42,0.25),0_0_30px_rgba(234,88,12,0.1)] backdrop-blur-3xl space-y-1.5">
                  {involvedCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <Link
                        key={card.to}
                        to={card.to}
                        onClick={() => setInvolvedOpen(false)}
                        className={cn(
                          "group/inv relative flex items-start gap-3 rounded-2xl p-3 transition-all duration-150",
                          "hover:bg-accent/80 hover:translate-x-1 active:scale-[0.98]",
                          pathname === card.to && "bg-primary/12 ring-1 ring-primary/25",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-transform group-hover/inv:scale-110",
                            card.gradient,
                            card.accent,
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-navy dark:text-white group-hover/inv:text-primary transition-colors">
                              {card.label}
                            </span>
                            <span className="rounded-full bg-secondary/60 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-muted-foreground uppercase">
                              {card.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground font-medium">
                            {card.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <PillLink
              to="/transparency"
              label="Transparency"
              active={pathname === "/transparency"}
              icon={ShieldCheck}
              compact={isCompact}
            />
            <PillLink to="/contact" label="Contact" active={pathname === "/contact"} compact={isCompact} />
          </nav>

          {/* RIGHT ACTION DOCK: HELPLINE & 2035 FUTURISTIC DONATE CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Helpline Pill */}
            <a
              href={`tel:${org.phone}`}
              className={cn(
                "hidden md:inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-accent/50 text-navy dark:text-white transition-all duration-150 hover:bg-accent hover:border-primary/40 hover:scale-105 active:scale-95 font-bold",
                isCompact ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-xs",
              )}
              title="Call Trinetra Helpline"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <PhoneCall className="h-3 w-3 text-primary" />
              <span className="hidden xl:inline">{org.phone}</span>
              <span className="xl:hidden">Call</span>
            </a>

            {/* 2035 SUPER CTA BUTTON: DONATE NOW */}
            <Link
              to="/donate"
              className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px] focus:outline-none select-none cursor-pointer",
                "transition-all duration-150 hover:scale-105 active:scale-95",
                "shadow-[0_8px_20px_-4px_rgba(234,88,12,0.45)] hover:shadow-[0_12px_30px_-2px_rgba(234,88,12,0.7)]",
              )}
            >
              {/* Outer Animated Gradient Border */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] animate-[shimmer_3s_linear_infinite] bg-[length:200%_auto]" />

              {/* Inner Pill Content */}
              <span
                className={cn(
                  "relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] text-white uppercase transition-all duration-150 group-hover:bg-transparent font-extrabold tracking-[0.12em]",
                  isCompact ? "px-3 py-1.5 sm:px-4 sm:py-1.5 text-[11px]" : "px-4 py-2 sm:px-5 sm:py-2.5 text-xs tracking-[0.14em]",
                )}
              >
                <Heart className={cn("fill-white transition-transform group-hover:scale-125", isCompact ? "h-3 w-3" : "h-3.5 w-3.5")} />
                <span>Donate</span>
                {/* Light reflection sheen */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </span>
            </Link>

            {/* MOBILE MENU TOGGLE BUTTON */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden flex items-center justify-center rounded-full border border-border/80 bg-accent/70 text-navy dark:text-white transition-all duration-150 cursor-pointer",
                "hover:bg-primary/20 hover:text-primary active:scale-90",
                isCompact ? "h-8 w-8" : "h-10 w-10",
              )}
            >
              {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {/* 2035 MOBILE FLOATING GLASS DRAWER */}
        {mobileOpen ? (
          <div className="lg:hidden mt-2.5 overflow-hidden rounded-[2.5rem] border border-white/80 dark:border-white/15 bg-white/95 dark:bg-[#0c1424]/95 p-4 sm:p-5 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.3),0_0_35px_rgba(234,88,12,0.12)] backdrop-blur-3xl animate-in slide-in-from-top-3 fade-in duration-150 max-h-[82vh] overflow-y-auto">
            {/* Top Identity Card */}
            <div className="flex items-center justify-between pb-3.5 border-b border-border/70">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-1 overflow-hidden">
                  <img src="/trinetra-logo.png" alt="Logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="font-display font-extrabold text-sm text-navy dark:text-white tracking-wider">
                    TRINETRA FOUNDATION
                  </p>
                  <p className="text-[10px] font-bold text-primary">Registered Section 8 NGO</p>
                </div>
              </div>
              <a
                href={`tel:${org.phone}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                title="Call Now"
              >
                <PhoneCall className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Mobile Nav Links */}
            <div className="py-3 space-y-1">
              <MobilePillLink to="/" label="Home" onDone={() => setMobileOpen(false)} active={pathname === "/"} />
              <MobilePillLink to="/about" label="About Foundation" onDone={() => setMobileOpen(false)} active={pathname === "/about"} />

              {/* Mobile Our Work Expansion */}
              <div className="rounded-2xl border border-border/70 bg-secondary/15 p-3 my-2">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50">
                  <span className="font-display font-bold text-xs text-navy dark:text-white flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Twelve Welfare Programmes
                  </span>
                  <Link
                    to="/work"
                    onClick={() => setMobileOpen(false)}
                    className="text-[11px] font-bold text-primary"
                  >
                    All →
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {workAreas.map((area) => (
                    <Link
                      key={area.slug}
                      to="/work/$slug"
                      params={{ slug: area.slug }}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-xl px-2.5 py-1.5 text-xs font-bold text-navy dark:text-white transition-colors",
                        "hover:bg-primary/15 hover:text-primary truncate block",
                        pathname === `/work/${area.slug}` && "bg-primary text-white font-bold",
                      )}
                    >
                      {area.title}
                    </Link>
                  ))}
                </div>
              </div>

              <MobilePillLink to="/impact" label="Impact & Targets" onDone={() => setMobileOpen(false)} active={pathname === "/impact"} />
              <MobilePillLink to="/volunteer" label="Volunteer With Us" onDone={() => setMobileOpen(false)} active={pathname === "/volunteer"} />
              <MobilePillLink to="/partner" label="Partner / CSR" onDone={() => setMobileOpen(false)} active={pathname === "/partner"} />
              <MobilePillLink to="/events" label="Upcoming Events" onDone={() => setMobileOpen(false)} active={pathname === "/events"} />
              <MobilePillLink to="/transparency" label="Legal & Transparency" onDone={() => setMobileOpen(false)} active={pathname === "/transparency"} />
              <MobilePillLink to="/contact" label="Contact Office" onDone={() => setMobileOpen(false)} active={pathname === "/contact"} />
            </div>

            {/* Mobile Bottom CTA */}
            <div className="pt-3 border-t border-border/70 flex gap-2">
              <Link
                to="/donate"
                onClick={() => setMobileOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-primary/25"
              >
                <Heart className="h-4 w-4 fill-white" /> Donate Now
              </Link>
              <a
                href={`tel:${org.phone}`}
                className="flex items-center justify-center rounded-full border border-border px-3.5 py-2.5 text-xs font-bold text-navy dark:text-white bg-accent/40"
              >
                <PhoneCall className="h-3.5 w-3.5 text-primary mr-1" /> Call
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function PillLink({
  to,
  label,
  active,
  icon: Icon,
  compact,
}: {
  to: string;
  label: string;
  active: boolean;
  icon?: typeof ShieldCheck;
  compact?: boolean;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className={cn(
        "relative flex items-center gap-1 rounded-full transition-all duration-150 select-none cursor-pointer",
        compact ? "px-2.5 py-1 text-xs font-semibold" : "px-3 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-sm font-bold",
        "text-navy dark:text-white hover:text-primary hover:bg-primary/10 active:scale-95",
        active && "bg-primary/15 text-primary font-bold ring-1 ring-primary/30 shadow-xs",
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5 text-primary" />}
      <span>{label}</span>
    </Link>
  );
}

function MobilePillLink({
  to,
  label,
  onDone,
  active,
}: {
  to: string;
  label: string;
  onDone: () => void;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onDone}
      className={cn(
        "block rounded-2xl px-4 py-2 text-sm font-bold text-navy dark:text-white transition-colors",
        "hover:bg-primary/15 hover:text-primary active:scale-[0.99]",
        active && "bg-primary/15 text-primary font-bold",
      )}
    >
      {label}
    </Link>
  );
}