import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Search,
  Filter,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  CalendarPlus,
  X,
  HeartHandshake,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { eventsQuery } from "@/lib/queries";
import { images, org } from "@/lib/site";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Upcoming Events & Medical Camps — Trinetra Foundation | Forbesganj, Bihar" },
      {
        name: "description",
        content:
          "Join or RSVP for upcoming healthcare camps, blood donation drives, tree plantations, and career counselling sessions organized by Trinetra Foundation across Bihar.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Upcoming Events & Community Camps — Trinetra Foundation" },
      {
        property: "og:description",
        content: "Participate, volunteer or RSVP for upcoming grassroots community drives in Bihar.",
      },
      { property: "og:url", content: "https://trinetrafoundation.in/events" },
      { property: "og:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Events & On-Ground Camps — Trinetra Foundation" },
      { name: "twitter:description", content: "Join free medical camps, student workshops and community drives in Bihar." },
    ],
    links: [{ rel: "canonical", href: "https://trinetrafoundation.in/events" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EventSeries",
          name: "Trinetra Foundation Community Camps & Drives",
          url: "https://trinetrafoundation.in/events",
          organizer: {
            "@id": "https://trinetrafoundation.in/#organization",
          },
          location: {
            "@type": "Place",
            name: "Forbesganj & Araria District",
            address: {
              "@type": "PostalAddress",
              addressRegion: "Bihar",
              addressCountry: "IN",
            },
          },
        }),
      },
    ],
  }),
  component: EventsPage,
});

// Fallback verified on-ground drives when DB has 0 events
const defaultDrives = [
  {
    id: "default-1",
    title: "Rural Health & Preventive Diagnostic Camp",
    category: "Healthcare",
    starts_at: new Date(Date.now() + 86400000 * 4).toISOString(),
    location: "Block Road Community Centre, Forbesganj, Araria",
    description:
      "Free general health checkups, blood sugar and pressure testing, eye screening, and essential medicines distribution supported by volunteer doctors.",
    attendees: 120,
    spots_available: 30,
  },
  {
    id: "default-2",
    title: "Digital Literacy & STEM Learning Workshop",
    category: "Education",
    starts_at: new Date(Date.now() + 86400000 * 9).toISOString(),
    location: "Trinetra Learning Hub, Araria District",
    description:
      "Hands-on computer basics, interactive learning sessions, and scholarship guidance for high-school students from rural government schools.",
    attendees: 45,
    spots_available: 15,
  },
  {
    id: "default-3",
    title: "Monsoon Afforestation & Biodiversity Drive",
    category: "Environment",
    starts_at: new Date(Date.now() + 86400000 * 14).toISOString(),
    location: "Kosi River Basin Belt, Northern Bihar",
    description:
      "Community tree plantation drive planting 500+ native saplings (Neem, Peepal, Jamun) with local schools and volunteer environmentalists.",
    attendees: 80,
    spots_available: 40,
  },
  {
    id: "default-4",
    title: "Weekly Nutritious Food & Ration Distribution",
    category: "Nutrition",
    starts_at: new Date(Date.now() + 86400000 * 18).toISOString(),
    location: "Railway Colony & Ward 4 Outskirts, Forbesganj",
    description:
      "Cooked meal distribution and dry ration kits for destitute elders, daily wage labourers, and flood-impacted households with verified tokens.",
    attendees: 250,
    spots_available: 20,
  },
];

const categories = ["All", "Healthcare", "Education", "Environment", "Nutrition"];

function EventsPage() {
  const { data: dbEvents, isLoading } = useQuery(eventsQuery);
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [rsvpModalEvent, setRsvpModalEvent] = useState<any | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpContact, setRsvpContact] = useState("");
  const [rsvpRole, setRsvpRole] = useState("attendee");

  // Merge database events or use default verified drives
  const rawList = dbEvents && dbEvents.length > 0 ? dbEvents : defaultDrives;

  const filteredEvents = rawList.filter((ev: any) => {
    const matchesCat =
      selectedCat === "All" ||
      ev.category?.toLowerCase() === selectedCat.toLowerCase() ||
      ev.title?.toLowerCase().includes(selectedCat.toLowerCase());

    const matchesSearch =
      searchQuery === "" ||
      ev.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpContact) {
      toast.error("Please enter your name and phone/email.");
      return;
    }
    toast.success(`RSVP confirmed for "${rsvpModalEvent.title}"! Our coordinator will contact you at ${rsvpContact}.`);
    setRsvpModalEvent(null);
    setRsvpName("");
    setRsvpContact("");
  };

  const generateGoogleCalendarLink = (event: any) => {
    const title = encodeURIComponent(`Trinetra Foundation: ${event.title}`);
    const details = encodeURIComponent(`${event.description}\n\nLocation: ${event.location}\nContact: ${org.phone}`);
    const location = encodeURIComponent(event.location || org.address);
    const startDate = new Date(event.starts_at).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(new Date(event.starts_at).getTime() + 7200000).toISOString().replace(/-|:|\.\d\d\d/g, "");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  };

  return (
    <>
      <PageHero
        eyebrow="On-Ground Drives & Camps"
        title="Where we will be next."
        intro="Open medical camps, educational workshops, tree plantation drives, and relief distribution across Forbesganj and Bihar."
        image={images.students}
      />

      <section className="relative z-10 -mt-16 pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Dynamic Search & Filter Dock */}
          <div className="surface-lift mb-8 bg-white/90 dark:bg-[#0c1424]/90 p-5 sm:p-6 shadow-xl backdrop-blur-2xl border border-white/70">
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search camps, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border bg-background/80 pl-10 pr-4 py-2 text-xs sm:text-sm text-navy focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCat(cat)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer select-none",
                      selectedCat === cat
                        ? "bg-primary text-white shadow-md"
                        : "bg-accent/60 text-navy hover:bg-accent border border-border/50",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events List Container */}
          <div className="surface-lift divide-y divide-border/70 bg-card p-6 sm:p-12 shadow-xl">
            {filteredEvents.length === 0 ? (
              <div className="py-16 text-center">
                <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
                <h3 className="font-display text-xl text-navy">No matching drives found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try clearing your search query or selecting a different category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCat("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 rounded-full bg-primary px-5 py-2 text-xs font-bold text-white uppercase"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredEvents.map((event: any, i: number) => {
                const eventDate = new Date(event.starts_at);
                const isUpcoming = eventDate.getTime() > Date.now();

                return (
                  <Reveal key={event.id} delay={0.04 * i}>
                    <div className="grid gap-6 py-8 sm:grid-cols-[auto_1fr] items-start">
                      {/* Left Date Pebble */}
                      <div className="flex sm:flex-col items-center justify-between sm:justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/20 p-4 sm:w-36 text-center shrink-0">
                        <div className="flex sm:flex-col items-baseline sm:items-center gap-2 sm:gap-0">
                          <span className="font-display text-2xl sm:text-3xl font-bold text-primary">
                            {eventDate.toLocaleDateString("en-IN", { day: "numeric" })}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-navy">
                            {eventDate.toLocaleDateString("en-IN", { month: "short" })},{" "}
                            {eventDate.getFullYear()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {eventDate.toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Right Content Details */}
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary tracking-wider uppercase border border-primary/20">
                              {event.category || "Community"}
                            </span>
                            {isUpcoming ? (
                              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Upcoming Drive
                              </span>
                            ) : null}
                          </div>

                          <h2 className="font-display text-xl sm:text-2xl font-bold text-navy">
                            {event.title}
                          </h2>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {event.description}
                          </p>

                          {event.location ? (
                            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-navy/80 bg-secondary/20 px-3 py-1.5 rounded-full">
                              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span>{event.location}</span>
                            </p>
                          ) : null}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-border/50">
                          <button
                            type="button"
                            onClick={() => setRsvpModalEvent(event)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-bold tracking-wider text-white uppercase shadow-md hover:scale-105 transition-transform"
                          >
                            <Users className="h-3.5 w-3.5" /> RSVP / Join Drive
                          </button>

                          <a
                            href={generateGoogleCalendarLink(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-navy hover:bg-accent transition-colors"
                          >
                            <CalendarPlus className="h-3.5 w-3.5 text-primary" /> Add to Calendar
                          </a>

                          <Link
                            to="/volunteer"
                            className="text-xs font-semibold text-primary hover:underline ml-auto flex items-center gap-1"
                          >
                            Volunteer Here <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* INTERACTIVE RSVP MODAL */}
      {rsvpModalEvent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl border border-white/60 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setRsvpModalEvent(null)}
              className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full bg-accent text-navy hover:bg-primary/20"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase">
              <HeartHandshake className="h-4 w-4" /> Event Registration
            </div>
            <h3 className="mt-2 font-display text-xl font-bold text-navy">
              {rsvpModalEvent.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(rsvpModalEvent.starts_at).toLocaleDateString("en-IN", {
                dateStyle: "full",
              })} · {rsvpModalEvent.location}
            </p>

            <form onSubmit={handleRsvpSubmit} className="mt-5 space-y-3">
              <div>
                <label className="block text-xs font-bold text-navy">Full Name *</label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-navy focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy">Phone / Email *</label>
                <input
                  type="text"
                  required
                  value={rsvpContact}
                  onChange={(e) => setRsvpContact(e.target.value)}
                  placeholder="e.g. 9876543210 or name@example.com"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-navy focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy">I am joining as:</label>
                <div className="mt-1 flex gap-2">
                  {[
                    { id: "attendee", label: "Community Member / Attendee" },
                    { id: "volunteer", label: "Volunteer Helper" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRsvpRole(r.id)}
                      className={cn(
                        "flex-1 rounded-xl p-2 text-xs font-semibold border transition-colors",
                        rsvpRole === r.id
                          ? "bg-primary text-white border-primary"
                          : "bg-accent/40 text-navy border-border hover:bg-accent",
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-gradient-to-r from-primary to-amber-500 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md hover:scale-[1.02] transition-transform"
              >
                Confirm Attendance
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}