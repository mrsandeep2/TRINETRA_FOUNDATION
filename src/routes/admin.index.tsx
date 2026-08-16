import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminStatsQuery } from "@/lib/adminQueries";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const cards = [
  { key: "events", label: "Events", to: "/admin/events" },
  { key: "documents", label: "Documents", to: "/admin/documents" },
  { key: "volunteer_applications", label: "Volunteer applications", to: "/admin/volunteers" },
  { key: "contact_messages", label: "Messages", to: "/admin/messages" },
  { key: "partner_inquiries", label: "Partner inquiries", to: "/admin/partners" },
  { key: "donations", label: "Donation intents", to: "/admin/donations" },
] as const;

function AdminOverview() {
  const { data, isLoading } = useQuery(adminStatsQuery);

  return (
    <section>
      <h1 className="font-display text-2xl text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Everything published on the public site is managed from here.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.key}
            to={c.to}
            className="rounded-2xl border border-border bg-card p-5 transition-transform hover:-translate-y-1 hover:shadow-[0_24px_50px_-35px_oklch(0.26_0.05_260/0.5)]"
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              {c.label}
            </p>
            <p className="mt-3 font-display text-3xl text-navy">
              {isLoading ? "—" : (data?.[c.key] ?? 0)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}