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
      { title: "Contact Us — Trinetra Foundation | Forbesganj, Araria, Bihar Office" },
      {
        name: "description",
        content:
          "Reach Trinetra Foundation head office in Forbesganj, Araria, Bihar. Phone: +91 7562891937, Email: trinetrafoundationofficially@gmail.com. Inquire for donations, CSR, or volunteering.",
      },
      { property: "og:title", content: "Contact Us — Trinetra Foundation | Bihar Office" },
      {
        property: "og:description",
        content: "Get in touch with the Trinetra Foundation team for programmes, donations, or volunteering.",
      },
      { property: "og:url", content: "https://trinetrafoundation.in/contact" },
      { property: "og:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Trinetra Foundation" },
      { name: "twitter:description", content: "Forbesganj, Araria, Bihar. Call +91 7562891937." },
    ],
    links: [{ rel: "canonical", href: "https://trinetrafoundation.in/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Trinetra Foundation",
          url: "https://trinetrafoundation.in/contact",
          mainEntity: {
            "@id": "https://trinetrafoundation.in/#organization",
          },
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
      <PageHero eyebrow="Contact" title="Talk to us." intro="For programmes, volunteering, partnerships or press." />
      <section className="relative z-10 -mt-16 pb-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="surface-lift grid gap-12 bg-card p-8 sm:p-14 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-6 text-sm">
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${org.email}`} className="break-all text-navy hover:text-primary">
                  {org.email}
                </a>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${org.phone}`} className="text-navy hover:text-primary">
                  {org.phone}
                </a>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  {org.address}
                  <br />
                  {org.state}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">CIN: {org.cin}</p>
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