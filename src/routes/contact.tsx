import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { org } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Trinetra Foundation Office — TV Centre, Block Road, Forbesganj, Araria, Bihar" },
      {
        name: "description",
        content:
          "Visit or contact Trinetra Foundation head office at TV Centre, Block Road, Forbesganj, Araria, Bihar 854318. Phone: +91 7562891937, Email: trinetrafoundationofficially@gmail.com.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Contact Trinetra Foundation — Head Office Forbesganj, Bihar" },
      {
        property: "og:description",
        content: "Get in touch with Trinetra Foundation in Forbesganj, Araria, Bihar for programmes, donations, CSR, or volunteering.",
      },
      { property: "og:url", content: "https://trinetrafoundation.in/contact" },
      { property: "og:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Trinetra Foundation (Forbesganj, Araria, Bihar)" },
      { name: "twitter:description", content: "TV Centre, Block Road, Forbesganj, Araria, Bihar 854318. Call +91 7562891937." },
      { name: "twitter:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://trinetrafoundation.in/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ContactPage",
              "@id": "https://trinetrafoundation.in/contact#webpage",
              name: "Contact Trinetra Foundation",
              description:
                "Official contact information and head office address of Trinetra Foundation in Forbesganj, Araria, Bihar.",
              url: "https://trinetrafoundation.in/contact",
              isPartOf: {
                "@id": "https://trinetrafoundation.in/#website",
              },
              mainEntity: {
                "@type": "NGO",
                "@id": "https://trinetrafoundation.in/#organization",
                name: "Trinetra Foundation",
                telephone: "+91-7562891937",
                email: "trinetrafoundationofficially@gmail.com",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "TV Centre, Block Road, Forbesganj",
                  addressLocality: "Forbesganj",
                  addressRegion: "Bihar",
                  postalCode: "854318",
                  addressCountry: "IN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 26.3015,
                  longitude: 87.2575,
                },
              },
              inLanguage: "en-IN",
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://trinetrafoundation.in/contact#breadcrumb",
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
                  name: "Contact Us",
                  item: "https://trinetrafoundation.in/contact",
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      full_name: String(data.get("full_name") ?? "").trim().slice(0, 120),
      email: String(data.get("email") ?? "").trim().slice(0, 255),
      phone: String(data.get("phone") ?? "").trim().slice(0, 20) || null,
      subject: String(data.get("subject") ?? "").trim().slice(0, 200) || null,
      message: String(data.get("message") ?? "").trim().slice(0, 2000),
    });
    setSubmitting(false);
    if (error) {
      toast.error("Your message couldn't be sent. Please try again.");
      return;
    }
    form.reset();
    toast.success("Message received. We'll reply as soon as we can.");
  }

  return (
    <>
      <PageHero
        eyebrow="Contact & Head Office"
        title="Get in touch with our team."
        intro="For programmes, on-ground volunteering, CSR partnerships, donations, or local assistance in Forbesganj & Araria, Bihar."
      />
      <section className="relative z-10 -mt-16 pb-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="surface-lift grid gap-12 bg-card p-8 sm:p-14 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-6 text-sm">
              <div>
                <h3 className="font-display text-lg font-bold text-navy">Trinetra Foundation Head Office</h3>
                <p className="mt-1 text-xs text-muted-foreground">Section 8 Registered Non-Profit NGO</p>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="text-muted-foreground">
                  <span className="font-medium text-navy">Registered Office</span>
                  <br />
                  {org.address}
                  <br />
                  {org.state}
                  <br />
                  <span className="text-xs text-muted-foreground/80">Landmark: Near TV Centre, Block Road</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <span className="font-medium text-navy">Phone / Helpline</span>
                  <br />
                  <a href={`tel:${org.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                    +91 {org.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <span className="font-medium text-navy">Official Email</span>
                  <br />
                  <a href={`mailto:${org.email}`} className="break-all text-muted-foreground hover:text-primary transition-colors">
                    {org.email}
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-secondary/20 p-4 text-xs text-muted-foreground space-y-1.5 border border-border/50">
                <p className="font-semibold text-navy">Office Hours & Coverage:</p>
                <p>Monday – Saturday: 9:00 AM – 6:00 PM IST</p>
                <p>Ground Service: Forbesganj, Araria District, and neighboring communities in Bihar</p>
                <p className="text-[11px] pt-1 border-t border-border/40 text-muted-foreground/70">CIN: {org.cin}</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-muted-foreground">Full name *</span>
                <input name="full_name" required maxLength={120} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Email *</span>
                <input name="email" type="email" required maxLength={255} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Phone</span>
                <input name="phone" maxLength={20} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Subject</span>
                <input name="subject" maxLength={200} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy" />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-muted-foreground">Message *</span>
                <textarea name="message" rows={5} required maxLength={2000} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy" />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-primary px-8 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground uppercase disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
              >
                {submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}