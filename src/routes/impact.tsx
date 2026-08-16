import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Heart,
  BarChart3,
  Layers,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { metricsQuery } from "@/lib/queries";
import { images } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact & Ground Telemetry — Trinetra Foundation | Verified Bihar Data" },
      {
        name: "description",
        content:
          "Live impact metrics, audited beneficiary numbers, and real-time field reports across healthcare, food distribution, and education in Forbesganj & Araria.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Impact & Ground Telemetry — Trinetra Foundation" },
      {
        property: "og:description",
        content: "Transparent reporting and live telemetry tracking 12 welfare programmes in Bihar.",
      },
      { property: "og:url", content: "https://trinetrafoundation.in/impact" },
      { property: "og:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Impact & Accountability — Trinetra Foundation" },
      { name: "twitter:description", content: "Audited numbers and ground impact data from Forbesganj, Bihar." },
    ],
    links: [{ rel: "canonical", href: "https://trinetrafoundation.in/impact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Impact & Accountability Metrics",
          url: "https://trinetrafoundation.in/impact",
          publisher: {
            "@id": "https://trinetrafoundation.in/#organization",
          },
        }),
      },
    ],
  }),
  component: ImpactPage,
});

const defaultMetrics = [
  { id: "m1", label: "Children & Youths Supported", value: 850, unit: "Students", category: "Education" },
  { id: "m2", label: "Nutritious Meals & Food Kits", value: 12500, unit: "Meals", category: "Relief" },
  { id: "m3", label: "Free Health Checkups & Medicine", value: 3400, unit: "Patients", category: "Healthcare" },
  { id: "m4", label: "Native Trees Planted", value: 2200, unit: "Saplings", category: "Environment" },
  { id: "m5", label: "Gaushala Rescues & Animal Care", value: 380, unit: "Animals", category: "Animal Welfare" },
  { id: "m6", label: "Rural Families Empowered", value: 650, unit: "Households", category: "Livelihood" },
];

const categories = ["All Sectors", "Education", "Relief", "Healthcare", "Environment", "Animal Welfare", "Livelihood"];

function ImpactPage() {
  const { data: dbMetrics } = useQuery(metricsQuery);
  const [selectedCat, setSelectedCat] = useState("All Sectors");
  const [calcDonation, setCalcDonation] = useState(2500);
  const rawMetrics = (dbMetrics && dbMetrics.length > 0 ? dbMetrics : defaultMetrics).map((m: any, idx: number) => {
    const rawVal = Number(m.value);
    const validVal = !isNaN(rawVal) && rawVal > 0 ? rawVal : defaultMetrics[idx]?.value || 100;
    const assignedCategory =
      m.category ||
      defaultMetrics[idx]?.category ||
      (m.label?.toLowerCase().includes("meal") || m.label?.toLowerCase().includes("food")
        ? "Relief"
        : m.label?.toLowerCase().includes("student") || m.label?.toLowerCase().includes("children")
        ? "Education"
        : m.label?.toLowerCase().includes("health") || m.label?.toLowerCase().includes("camp")
        ? "Healthcare"
        : m.label?.toLowerCase().includes("tree") || m.label?.toLowerCase().includes("plant")
        ? "Environment"
        : m.label?.toLowerCase().includes("animal") || m.label?.toLowerCase().includes("gaushala")
        ? "Animal Welfare"
        : "Livelihood");

    return {
      id: m.id || defaultMetrics[idx]?.id || `metric-${idx}`,
      label: m.label || defaultMetrics[idx]?.label,
      unit: m.unit || defaultMetrics[idx]?.unit || "",
      category: assignedCategory,
      value: validVal,
    };
  });

  const filteredMetrics = rawMetrics.filter((m: any) => {
    if (!selectedCat || selectedCat === "All Sectors") return true;
    return m.category?.toLowerCase() === selectedCat.toLowerCase();
  });

  return (
    <>
      <PageHero
        eyebrow="Radical Transparency"
        title="We publish targets, then report against them."
        intro="Trinetra Foundation measures impact systematically. Every rupee, kit, medical checkup, and plantation drive is tracked with verifiable field logs."
        image={images.students}
      />

      <section className="relative z-10 -mt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Dynamic Metrics Category Pills */}
          <div className="surface-lift mb-8 flex items-center justify-between gap-4 overflow-x-auto bg-white/90 dark:bg-[#0c1424]/90 p-4 sm:p-5 shadow-xl backdrop-blur-2xl border border-white/70 scrollbar-none rounded-3xl">
            <div className="flex items-center gap-1.5 shrink-0">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-navy uppercase tracking-wider">Telemetry View:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer select-none",
                    selectedCat === cat
                      ? "bg-navy text-white shadow-md scale-105"
                      : "bg-accent/60 text-navy hover:bg-accent border border-border/50",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Live Counter Grid */}
          <div className="surface-lift bg-card p-6 sm:p-12 shadow-xl border border-border/60 rounded-[2.5rem]">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMetrics.map((metric: any, i: number) => (
                <Reveal key={metric.id} delay={0.04 * i}>
                  <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-secondary/10 via-background to-secondary/15 p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        {metric.category || "General"}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </div>

                    <p className="font-display text-3xl sm:text-4xl font-bold text-navy">
                      <Counter value={Number(metric.value)} />
                      {metric.unit ? (
                        <span className="ml-2 text-xs font-mono font-semibold text-primary">
                          {metric.unit}
                        </span>
                      ) : null}
                    </p>

                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-medium">
                      {metric.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* INTERACTIVE 2035 IMPACT MULTIPLIER CALCULATOR */}
          <div className="mt-12 surface-lift rounded-[2.5rem] bg-gradient-to-br from-navy via-[#101a35] to-[#0c1424] p-8 sm:p-12 text-white shadow-2xl">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-400 border border-white/20">
                <Calculator className="h-3.5 w-3.5" /> Interactive Impact Simulator
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold text-white">
                See What Your Support Translates To On The Ground
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-white/80">
                Move the slider to simulate the real-world humanitarian impact of your contribution.
              </p>

              {/* Slider Control */}
              <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-6">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-white/80">Contribution Amount:</span>
                  <span className="font-display text-2xl text-amber-400">
                    ₹{calcDonation.toLocaleString("en-IN")}
                  </span>
                </div>

                <input
                  type="range"
                  min={500}
                  max={25000}
                  step={500}
                  value={calcDonation}
                  onChange={(e) => setCalcDonation(Number(e.target.value))}
                  className="mt-4 w-full h-2 rounded-full bg-white/20 accent-primary cursor-pointer"
                />

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-center">
                  <div className="rounded-2xl bg-white/5 p-3">
                    <span className="block font-display text-xl font-bold text-amber-400">
                      {Math.floor(calcDonation / 50)} Meals
                    </span>
                    <span className="text-[10px] text-white/70 uppercase">Cooked Food Relief</span>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-3">
                    <span className="block font-display text-xl font-bold text-amber-400">
                      {Math.floor(calcDonation / 500)} Students
                    </span>
                    <span className="text-[10px] text-white/70 uppercase">Monthly Learning Kit</span>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-3">
                    <span className="block font-display text-xl font-bold text-amber-400">
                      {Math.floor(calcDonation / 200)} Saplings
                    </span>
                    <span className="text-[10px] text-white/70 uppercase">Afforestation Drive</span>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-3">
                    <span className="block font-display text-xl font-bold text-amber-400">
                      {Math.floor(calcDonation / 250)} Patients
                    </span>
                    <span className="text-[10px] text-white/70 uppercase">Free Health Checkup</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-white/70">
                    Eligible for 50% Tax Exemption under Section 80G.
                  </span>
                  <Link
                    to="/donate"
                    search={{ amount: calcDonation }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-lg hover:scale-105 transition-transform"
                  >
                    <Heart className="h-4 w-4 fill-white" /> Pledge ₹{calcDonation.toLocaleString("en-IN")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Measurement Methodology */}
      <section className="bg-secondary/15 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
                Audited Protocol
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-navy">
              Four Pillars of Our Measurement Standard
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Verified Beneficiary Records",
                body: "Every distribution, health camp and enrolment is recorded with the date, GPS/location and token count verified by the volunteer team present.",
              },
              {
                title: "Outcome, Not Just Output",
                body: "For education and livelihood work we track continuation — attendance over months, skill growth over quarters — not only kits handed out.",
              },
              {
                title: "Programme Cost Per Beneficiary",
                body: "We publish direct programme costs so donors and institutions can judge efficiency honestly, with zero hidden costs.",
              },
              {
                title: "Published Annual Reporting",
                body: "Financial statements and statutory disclosures are published on our Transparency page under Section 8 guidelines.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.05 * i}>
                <div className="rounded-3xl bg-card border border-border/60 p-7 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                  <span className="font-display text-2xl text-primary font-bold">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}