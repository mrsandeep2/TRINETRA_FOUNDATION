import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Heart, Share2, Sparkles, ArrowRight, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { workAreas, org } from "@/lib/site";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const area = workAreas.find((item) => item.slug === params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Programme not found — Trinetra Foundation" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.area.title} — Trinetra Foundation`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.area.short },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.area.short },
        { property: "og:url", content: `/work/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
    };
  },
  notFoundComponent: WorkNotFound,
  component: WorkDetail,
});

function WorkNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl text-navy">Programme not found</h1>
      <Link to="/work" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
        Back to all programmes
      </Link>
    </div>
  );
}

const quickSupportAmounts = [500, 1000, 2500, 5000];

function WorkDetail() {
  const { area } = Route.useLoaderData();
  const [selectedSupport, setSelectedSupport] = useState(1000);
  const others = workAreas.filter((item) => item.slug !== area.slug).slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${area.title} — Trinetra Foundation`,
          text: area.short,
          url: window.location.href,
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Programme link copied to clipboard!");
    }
  };

  return (
    <>
      <PageHero eyebrow={`Programme ${area.index}`} title={area.title} intro={area.short} image={area.image} />

      <section className="relative z-10 -mt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="surface-lift grid gap-10 bg-card p-6 sm:p-14 lg:grid-cols-[1.2fr_1fr] shadow-xl">
            {/* Left Narrative & Support Hub */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-border/60">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
                    <Sparkles className="h-3.5 w-3.5" /> Programme {area.index}
                  </span>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/40 px-3.5 py-1 text-xs font-semibold text-navy hover:bg-accent cursor-pointer"
                  >
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </button>
                </div>

                <p className="text-lg sm:text-xl leading-relaxed text-navy font-medium">
                  {area.description}
                </p>
              </div>

              {/* Dynamic 1-Click Support Engine */}
              <div className="mt-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-amber-500/5 to-transparent p-5">
                <h3 className="text-xs font-bold tracking-wider text-navy uppercase flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-primary fill-primary/20" /> Support this programme directly:
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {quickSupportAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedSupport(amt)}
                      className={cn(
                        "rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer",
                        selectedSupport === amt
                          ? "bg-primary text-white shadow-md scale-105"
                          : "bg-white dark:bg-white/5 border border-border text-navy hover:bg-accent",
                      )}
                    >
                      ₹{amt.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/donate"
                    search={{ amount: selectedSupport }}
                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md hover:scale-[1.02] transition-transform"
                  >
                    <Heart className="h-4 w-4 fill-white" /> Donate ₹{selectedSupport.toLocaleString("en-IN")}
                  </Link>

                  <Link
                    to="/volunteer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-navy/30 px-5 py-3 text-xs font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
                  >
                    Volunteer for this
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Scope Points */}
            <div className="rounded-3xl border border-border bg-secondary/15 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-navy">Specific Scope of Work</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Verified deliverables executed on the ground:
                </p>

                <ul className="mt-6 space-y-3.5">
                  {area.focus.map((point: string) => (
                    <li key={point} className="flex gap-3 text-sm text-navy leading-relaxed font-medium">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Location: Araria & Northern Bihar</span>
                <a href={`tel:${org.phone}`} className="font-semibold text-primary flex items-center gap-1">
                  <PhoneCall className="h-3 w-3" /> Enquire
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other Programmes Slider / Grid */}
      <section className="bg-secondary/15 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Other Core Programmes</h2>
              <p className="text-xs text-muted-foreground">Discover other active initiatives by Trinetra Foundation</p>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-4 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All 12 programmes
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                to="/work/$slug"
                params={{ slug: item.slug }}
                className="group rounded-3xl bg-card border border-border/60 p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
                    PROG {item.index}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-navy group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{item.short}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}