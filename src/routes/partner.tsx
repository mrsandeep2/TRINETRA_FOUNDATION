import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { partnershipTypes } from "@/lib/site";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "CSR & Institutional Partnerships — Trinetra Foundation | Bihar" },
      {
        name: "description",
        content:
          "Partner with Trinetra Foundation for Corporate Social Responsibility (CSR) projects, academic collaborations, healthcare partnerships, and community interventions in Bihar.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "CSR & Institutional Partnerships — Trinetra Foundation" },
      {
        property: "og:description",
        content: "Collaborate on high-impact CSR education, health, and environmental programmes in Bihar.",
      },
      { property: "og:url", content: "https://trinetrafoundation.in/partner" },
      { property: "og:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Partner With Trinetra Foundation" },
      { name: "twitter:description", content: "CSR and institutional partnerships for sustainable development in Bihar." },
    ],
    links: [{ rel: "canonical", href: "https://trinetrafoundation.in/partner" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "CSR & Institutional Partnerships",
          url: "https://trinetrafoundation.in/partner",
          publisher: {
            "@id": "https://trinetrafoundation.in/#organization",
          },
        }),
      },
    ],
  }),
  component: PartnerPage,
});

function PartnerPage() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    const { error } = await supabase.from("partner_inquiries").insert({
      organisation: String(data.get("organisation") ?? "").trim().slice(0, 200),
      contact_person: String(data.get("contact_person") ?? "").trim().slice(0, 120),
      email: String(data.get("email") ?? "").trim().slice(0, 255),
      phone: String(data.get("phone") ?? "").trim().slice(0, 20) || null,
      partnership_type: String(data.get("partnership_type") ?? partnershipTypes[0]),
      message: String(data.get("message") ?? "").trim().slice(0, 1500) || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("We couldn't send your enquiry. Please try again.");
      return;
    }
    form.reset();
    toast.success("Thank you — we'll respond to your partnership enquiry shortly.");
  }

  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Institutions make change durable."
        intro="We work with companies, colleges, hospitals, panchayats and fellow NGOs on programmes that outlast a single drive."
      />
      <section className="relative z-10 -mt-16 pb-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <form onSubmit={onSubmit} className="surface-lift bg-card p-8 sm:p-14">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-muted-foreground">Organisation *</span>
                <input name="organisation" required maxLength={200} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Contact person *</span>
                <input name="contact_person" required maxLength={120} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Email *</span>
                <input name="email" type="email" required maxLength={255} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Phone</span>
                <input name="phone" maxLength={20} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy" />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-muted-foreground">Partnership type *</span>
                <select name="partnership_type" required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy">
                  {partnershipTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-muted-foreground">What would you like to explore?</span>
                <textarea name="message" rows={4} maxLength={1500} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy" />
              </label>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-8 rounded-full bg-primary px-8 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground uppercase disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send enquiry"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}