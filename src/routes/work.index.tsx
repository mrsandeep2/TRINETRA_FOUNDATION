import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Search, Filter, Sparkles, CheckCircle2, HeartHandshake } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { images, workAreas } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "12 Welfare Programmes in Bihar — Trinetra Foundation | Forbesganj, Araria" },
      {
        name: "description",
        content:
          "Explore the 12 community welfare programmes run by Trinetra Foundation in Forbesganj, Araria & Bihar: child education, hunger relief, free healthcare camps, animal gaushala care, and afforestation.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "12 Welfare Programmes in Bihar — Trinetra Foundation" },
      {
        property: "og:description",
        content: "Verified social impact across education, healthcare, food relief, and environment in Forbesganj, Araria, Bihar.",
      },
      { property: "og:url", content: "https://trinetrafoundation.in/work" },
      { property: "og:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "12 Welfare Programmes in Bihar — Trinetra Foundation" },
      { name: "twitter:description", content: "Grassroots impact across 12 sectors in Forbesganj & Araria district, Bihar." },
      { name: "twitter:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://trinetrafoundation.in/work" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": "https://trinetrafoundation.in/work#webpage",
              name: "Our 12 Welfare Programmes in Bihar",
              description:
                "Twelve active social welfare programmes across education, healthcare, food security, animal welfare, and sustainable development by Trinetra Foundation in Forbesganj, Araria, Bihar.",
              url: "https://trinetrafoundation.in/work",
              isPartOf: {
                "@id": "https://trinetrafoundation.in/#website",
              },
              publisher: {
                "@id": "https://trinetrafoundation.in/#organization",
              },
              inLanguage: "en-IN",
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://trinetrafoundation.in/work#breadcrumb",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://trinetrafoundation.in/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Our Work",
                  item: "https://trinetrafoundation.in/work",
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: WorkIndex,
});

const categories = [
  { id: "all", label: "All 12 Areas" },
  { id: "relief", label: "Relief & Health", slugs: ["food-and-nutrition", "healthcare", "disaster-relief"] },
  { id: "education", label: "Education & Skills", slugs: ["education-and-literacy", "student-empowerment", "livelihood"] },
  { id: "eco", label: "Animals & Ecology", slugs: ["animal-welfare", "environment"] },
  { id: "community", label: "Community & Justice", slugs: ["rural-and-community-development", "human-rights", "culture-and-sports", "research-and-innovation"] },
];

function WorkIndex() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAreas = workAreas.filter((area) => {
    const matchesCat =
      selectedCat === "all" ||
      categories.find((c) => c.id === selectedCat)?.slugs?.includes(area.slug);

    const matchesSearch =
      searchQuery === "" ||
      area.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <>
      <PageHero
        eyebrow="Registered Objects"
        title="Twelve areas. One commitment to dignity."
        intro="Each programme area below is registered under Section 8. Select any area to see its verified scope, ground implementation, and how to support it."
        image={images.heroCommunity}
      />

      <section className="relative z-10 -mt-16 pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Dynamic Search and Filter Bar */}
          <div className="surface-lift mb-10 bg-white/90 dark:bg-[#0c1424]/90 p-5 sm:p-6 shadow-xl backdrop-blur-2xl border border-white/70">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Live Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search programmes (e.g. Health, School, Animals)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border bg-background/80 pl-10 pr-4 py-2 text-xs sm:text-sm text-navy focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCat(c.id)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer select-none",
                      selectedCat === c.id
                        ? "bg-navy text-white shadow-md scale-105"
                        : "bg-accent/60 text-navy hover:bg-accent border border-border/50",
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Grid of Programmes */}
          {filteredAreas.length === 0 ? (
            <div className="rounded-[2.5rem] bg-card p-16 text-center shadow-lg">
              <Sparkles className="mx-auto h-12 w-12 text-primary/40 mb-3" />
              <h3 className="font-display text-xl text-navy">No programmes matched your query</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try searching for another term or click "All 12 Areas".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCat("all");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-full bg-primary px-6 py-2 text-xs font-bold text-white uppercase"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAreas.map((area, i) => (
                <Reveal key={area.slug} delay={0.04 * i}>
                  <Link
                    to="/work/$slug"
                    params={{ slug: area.slug }}
                    className="group flex flex-col justify-between h-full overflow-hidden rounded-[2rem] bg-card border border-border/60 shadow-[0_20px_50px_-35px_rgba(20,28,50,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-20px_rgba(234,88,12,0.2)] hover:border-primary/40"
                  >
                    <div>
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={area.image}
                          alt={area.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute top-4 left-4 rounded-full bg-navy/85 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-white">
                          PROGRAMME {area.index}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <div className="p-6">
                        <h2 className="font-display text-xl font-bold text-navy group-hover:text-primary transition-colors">
                          {area.title}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {area.short}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-border/50 text-xs font-bold text-primary uppercase">
                      <span>Explore Scope</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}