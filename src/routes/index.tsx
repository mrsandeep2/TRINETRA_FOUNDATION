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
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { HeroSplit } from "@/components/site/HeroSplit";
import { AboutIntro } from "@/components/site/AboutIntro";
import { WorkMarquee } from "@/components/site/WorkMarquee";
import { Marquee } from "@/components/site/ScrollEffects";
import { Counter } from "@/components/site/Counter";
import { eventsQuery, metricsQuery } from "@/lib/queries";
import { images, values } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trinetra Foundation — Serving Humanity, Empowering Communities" },
      {
        name: "description",
        content:
          "Trinetra Foundation works across education, food, healthcare, livelihood, environment and animal welfare from Forbesganj, Araria, Bihar. Volunteer, partner or donate.",
      },
      { property: "og:title", content: "Trinetra Foundation — Serving Humanity, Empowering Communities" },
      {
        property: "og:description",
        content:
          "A Section 8 non-profit building sustainable change through education, health, livelihood and environmental work in Bihar.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative">
      <HeroSplit />
      <AboutIntro />
      <div className="relative z-10 bg-background">
        <Marquee
          items={[
            "Food & Nutrition",
            "Education & Literacy",
            "Healthcare & Diagnostics",
            "Livelihood & Skills",
            "Afforestation & Environment",
            "Gaushala & Animal Welfare",
            "Disaster Relief",
            "Human Rights & Inclusion",
          ]}
        />
        <WorkMarquee />
        <LiveDrivesHomeSection />
        <DynamicImpactBarSection />
        <div className="defer-paint">
          <ValuesSection />
          <JoinSection />
        </div>
      </div>
    </div>
  );
}

// Dynamic Upcoming Drives & Events on the Home page
function LiveDrivesHomeSection() {
  const { data: dbEvents } = useQuery(eventsQuery);

  const defaultFeaturedDrives = [
    {
      id: "f1",
      title: "Rural Health Checkup & Diagnostics Camp",
      category: "Healthcare",
      starts_at: new Date(Date.now() + 86400000 * 4).toISOString(),
      location: "Forbesganj Community Centre, Araria",
      desc: "Free specialist checkups, sugar & BP testing, and essential medicine aid.",
    },
    {
      id: "f2",
      title: "Monsoon Afforestation & Native Tree Drive",
      category: "Environment",
      starts_at: new Date(Date.now() + 86400000 * 10).toISOString(),
      location: "Kosi Belt, Northern Bihar",
      desc: "Planting 500+ Neem, Peepal, and Fruit saplings with local student volunteers.",
    },
    {
      id: "f3",
      title: "Student STEM Learning & Book Distribution",
      category: "Education",
      starts_at: new Date(Date.now() + 86400000 * 16).toISOString(),
      location: "Trinetra Youth Centre",
      desc: "Digital learning modules and free study kits for rural high-school students.",
    },
  ];

  const featuredList = (dbEvents && dbEvents.length > 0 ? dbEvents : defaultFeaturedDrives).slice(0, 3);

  return (
    <section className="bg-secondary/15 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
                <CalendarDays className="h-3.5 w-3.5" /> Upcoming Action
              </span>
              <span className="text-xs font-semibold text-muted-foreground">Open to All</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              Ground Drives & Events
            </h2>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-white dark:bg-white/5 px-5 py-2.5 text-xs font-bold text-primary uppercase shadow-sm hover:bg-primary hover:text-white transition-all"
          >
            <span>View All Camps & Drives</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {featuredList.map((ev: any, i: number) => {
            const date = new Date(ev.starts_at);
            return (
              <Reveal key={ev.id} delay={0.05 * i}>
                <div className="group rounded-[2rem] bg-card border border-border/60 p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                        {ev.category || "Field Drive"}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-muted-foreground">
                        {date.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-navy group-hover:text-primary transition-colors">
                      {ev.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {ev.desc || ev.description}
                    </p>

                    {ev.location && (
                      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-navy/80 bg-secondary/30 px-2.5 py-1 rounded-full">
                        <MapPin className="h-3 w-3 text-primary shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                    <Link
                      to="/events"
                      className="text-xs font-bold text-primary uppercase flex items-center gap-1 hover:underline"
                    >
                      <span>RSVP Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Drive
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Dynamic Live Impact Numbers connected to database
function DynamicImpactBarSection() {
  const { data: dbMetrics } = useQuery(metricsQuery);

  const fallbackMetrics = [
    { label: "Students Supported", value: 850, unit: "Learners" },
    { label: "Meals & Food Kits", value: 12500, unit: "Served" },
    { label: "Medical Diagnostics", value: 3400, unit: "Patients" },
    { label: "Trees Planted", value: 2200, unit: "Saplings" },
  ];

  const displayMetrics = (dbMetrics && dbMetrics.length > 0 ? dbMetrics : fallbackMetrics).slice(0, 4);

  return (
    <section className="border-y border-border/60 bg-gradient-to-r from-navy via-[#101a35] to-[#0c1424] py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              Live Ground Telemetry & Impact
            </span>
          </div>
          <Link
            to="/impact"
            className="text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1"
          >
            Full Accountability Report →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMetrics.map((item: any, i: number) => (
            <div key={item.label} className="border-l-2 border-primary/60 pl-4">
              <p className="font-display text-3xl sm:text-4xl font-bold text-amber-400">
                <Counter value={Number(item.value)} />
                {item.unit && <span className="ml-1.5 text-xs text-white/80 font-mono">{item.unit}</span>}
              </p>
              <p className="mt-1 text-xs text-white/80 font-medium">{item.label}</p>
            </div>
          ))}
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