import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Heart,
  Globe2,
  UtensilsCrossed,
  GraduationCap,
  Stethoscope,
  Trees,
  Activity,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { HeroSplit } from "@/components/site/HeroSplit";
import { AboutIntro } from "@/components/site/AboutIntro";
import { WorkMarquee } from "@/components/site/WorkMarquee";
import { HelpAndDonateSection } from "@/components/site/HelpAndDonateSection";
import { OurTeamSection } from "@/components/site/OurTeamSection";
import { Marquee } from "@/components/site/ScrollEffects";
import { Counter } from "@/components/site/Counter";
import { metricsQuery } from "@/lib/queries";
import { images, values } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trinetra Foundation — Section 8 NGO in Forbesganj, Araria, Bihar | Social Welfare & Relief" },
      {
        name: "description",
        content:
          "Trinetra Foundation is a registered Section 8 NGO in Forbesganj, Araria, Bihar working in education, hunger relief, free health camps, gaushala animal welfare, and livelihood empowerment across Bihar.",
      },
      {
        name: "keywords",
        content:
          "NGO in Forbesganj, NGO in Araria, NGO in Bihar, Foundation in Bihar, Section 8 NGO Bihar, Education NGO Bihar, Food Relief NGO Forbesganj, Healthcare NGO Araria, Animal Welfare NGO Bihar, Donate NGO Bihar",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Trinetra Foundation — Section 8 NGO in Forbesganj, Araria, Bihar" },
      {
        property: "og:description",
        content:
          "A registered Section 8 NGO building sustainable community change through education, health camps, food relief, and environmental action in Bihar.",
      },
      { property: "og:url", content: "https://trinetrafoundation.in/" },
      { property: "og:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Trinetra Foundation — Section 8 NGO in Forbesganj, Araria, Bihar" },
      {
        name: "twitter:description",
        content: "Registered Section 8 NGO empowering communities across Forbesganj, Araria & Bihar.",
      },
      { name: "twitter:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://trinetrafoundation.in/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://trinetrafoundation.in/#webpage",
          url: "https://trinetrafoundation.in/",
          name: "Trinetra Foundation — Section 8 NGO in Forbesganj, Araria, Bihar",
          description:
            "Trinetra Foundation is a registered Section 8 NGO in Forbesganj, Araria, Bihar working in education, hunger relief, free health camps, gaushala animal welfare, and livelihood empowerment.",
          isPartOf: {
            "@id": "https://trinetrafoundation.in/#website",
          },
          about: {
            "@id": "https://trinetrafoundation.in/#organization",
          },
          inLanguage: "en-IN",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative w-full max-w-full overflow-x-clip">
      <HeroSplit />
      <AboutIntro />
      <div className="relative z-10 bg-background w-full max-w-full overflow-x-clip">
        <Marquee
          items={[
            { text: "Love & Humanitarian Care", emoji: "❤️", badge: "Core", color: "from-rose-500/15 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
            { text: "Food & Nutrition", emoji: "🍲", badge: "Relief", color: "from-orange-500/15 to-amber-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
            { text: "Education & STEM", emoji: "🎓", badge: "Future", color: "from-blue-500/15 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
            { text: "Healthcare & Diagnostics", emoji: "🩺", badge: "Health", color: "from-emerald-500/15 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
            { text: "Helping Hand & Inclusion", emoji: "🤝", badge: "Grassroots", color: "from-amber-500/15 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
            { text: "Gaushala & Animal Welfare", emoji: "🐮", badge: "Compassion", color: "from-amber-600/15 to-orange-500/10 text-amber-700 dark:text-amber-400 border-amber-600/20" },
            { text: "Afforestation & Ecology", emoji: "🌲", badge: "Ecology", color: "from-green-500/15 to-emerald-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
            { text: "Livelihood & Skills", emoji: "💼", badge: "Dignity", color: "from-purple-500/15 to-violet-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
            { text: "Emergency Relief", emoji: "🚨", badge: "Action", color: "from-red-500/15 to-rose-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
          ]}
        />
        <WorkMarquee />
        <HelpAndDonateSection />
        <DynamicImpactBarSection />
        <OurTeamSection />
        <div className="defer-paint">
          <ValuesSection />
          <JoinSection />
        </div>
      </div>
    </div>
  );
}

// Decorated 2035 Live Ground Telemetry & Impact Strip
function DynamicImpactBarSection() {
  const { data: dbMetrics } = useQuery(metricsQuery);
  const [cardTrigger, setCardTrigger] = useState<Record<string, number>>({});

  const triggerCard = (key: string) => {
    setCardTrigger((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  };

  const fallbackMetrics = [
    { label: "Meals & Food Kits", value: 25000, unit: "meals", sub: "Meals target for 2026", icon: UtensilsCrossed, glow: "from-amber-500 to-orange-600" },
    { label: "Students Supported", value: 500, unit: "students", sub: "Students to support", icon: GraduationCap, glow: "from-blue-500 to-cyan-500" },
    { label: "Health Camp Care", value: 2000, unit: "people", sub: "Health camp beneficiaries", icon: Stethoscope, glow: "from-emerald-500 to-teal-500" },
    { label: "Native Trees Planted", value: 10000, unit: "saplings", sub: "Trees to plant", icon: Trees, glow: "from-green-500 to-emerald-600" },
  ];

  const metricIcons = [UtensilsCrossed, GraduationCap, Stethoscope, Trees];
  const metricGlows = [
    "from-amber-500 to-orange-600",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-green-500 to-emerald-600",
  ];

  const displayMetrics = (dbMetrics && dbMetrics.length > 0 ? dbMetrics : fallbackMetrics).slice(0, 4).map((m: any, idx: number) => {
    const rawVal = Number(m.value);
    const validVal = !isNaN(rawVal) && rawVal > 0 ? rawVal : fallbackMetrics[idx]?.value || 0;
    return {
      label: m.label || fallbackMetrics[idx]?.label,
      value: validVal,
      unit: m.unit || fallbackMetrics[idx]?.unit || "",
      sub: m.sub || fallbackMetrics[idx]?.sub || m.label,
      icon: metricIcons[idx] || Zap,
      glow: metricGlows[idx] || "from-amber-500 to-orange-600",
    };
  });

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-[#060b17] via-[#0c1427] to-[#070c18] py-8 sm:py-10 text-white shadow-2xl">
      {/* Background Energy Flares */}
      <div className="pointer-events-none absolute -top-12 left-1/4 h-56 w-56 rounded-full bg-primary/15 blur-[100px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-10 right-1/4 h-52 w-52 rounded-full bg-amber-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#f59e0b_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TOP STATUS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 uppercase">
              Live Ground Telemetry & Impact
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-2.5 w-2.5" /> Verified Ground Data
            </span>
          </div>

          <Link
            to="/impact"
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-md transition-all hover:bg-white/15 hover:border-amber-400/50 hover:text-white"
          >
            <span>Full Accountability Report</span>
            <ArrowRight className="h-3 w-3 text-amber-400 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 4 STAT GLASSCARDS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {displayMetrics.map((item: any) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                onMouseEnter={() => triggerCard(item.label)}
                onPointerEnter={() => triggerCard(item.label)}
                onTouchStart={() => triggerCard(item.label)}
                onPointerDown={() => triggerCard(item.label)}
                onClick={() => triggerCard(item.label)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/[0.07] cursor-pointer select-none active:scale-98"
              >
                {/* Subtle Top Accent Line */}
                <div
                  className={cn(
                    "absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r transition-opacity duration-300 opacity-60 group-hover:opacity-100",
                    item.glow,
                  )}
                />

                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-amber-400 shadow-inner group-hover:scale-110 transition-transform">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2 py-0.5 rounded-full">
                    2026 Target
                  </span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <p className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 tracking-tight">
                    <Counter value={Number(item.value)} triggerKey={cardTrigger[item.label] || 0} />
                  </p>
                  {item.unit && (
                    <span className="text-xs font-mono font-bold text-white/75 lowercase">
                      {item.unit}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-[11px] sm:text-xs font-medium text-white/80 line-clamp-1">
                  {item.sub || item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="bg-secondary/20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              What Guides Us
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight text-navy">
              Four principles we do not trade away.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Every initiative launched by Trinetra Foundation is measured against these foundational values to ensure lasting human dignity.
            </p>
            <img
              src={images.students}
              alt="Students in a community learning session"
              loading="lazy"
              decoding="async"
              className="mt-8 h-72 w-full rounded-[2.5rem] object-cover shadow-xl border border-white/60"
            />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={0.07 * i}>
                <div className="h-full rounded-[2rem] bg-card border border-border/60 p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40">
                  <span className="font-display text-3xl font-bold text-primary">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl font-bold text-navy">{value.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JoinSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] py-24 text-white">
      {/* Decorative Blur Circles */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-navy/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Collective Action
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold leading-tight">
            Change needs people, not just intentions.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-white/90 leading-relaxed">
            Volunteer your time, partner your institution, or fund a programme. Every route into
            this work is open, and every single rupee is accounted for with public disclosure.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/volunteer"
              className="rounded-full bg-navy px-8 py-4 text-xs font-bold tracking-[0.16em] text-white uppercase shadow-lg transition-transform hover:scale-105"
            >
              Volunteer
            </Link>
            <Link
              to="/partner"
              className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-xs font-bold tracking-[0.16em] text-white uppercase transition-colors hover:bg-white hover:text-navy"
            >
              Partner With Us
            </Link>
            <Link
              to="/donate"
              className="rounded-full bg-white px-8 py-4 text-xs font-bold tracking-[0.16em] text-navy uppercase shadow-lg transition-transform hover:scale-105"
            >
              Donate Now
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}