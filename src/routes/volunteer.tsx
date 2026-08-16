import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { volunteerInterests } from "@/lib/site";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer With Us — Trinetra Foundation | Youth & Field Volunteers Bihar" },
      {
        name: "description",
        content:
          "Join Trinetra Foundation as an on-ground or remote volunteer. Contribute your skills to food relief, teaching children, healthcare drives, tree plantations, and animal rescue in Bihar.",
      },
      { property: "og:title", content: "Volunteer With Us — Trinetra Foundation" },
      {
        property: "og:description",
        content: "Give your time, energy, and skills to grassroots empowerment in Forbesganj & Araria.",
      },
      { property: "og:url", content: "https://trinetrafoundation.org/volunteer" },
      { property: "og:image", content: "https://trinetrafoundation.org/trinetra-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Volunteer With Trinetra Foundation" },
      { name: "twitter:description", content: "Make a direct grassroots impact in Bihar." },
    ],
    links: [{ rel: "canonical", href: "https://trinetrafoundation.org/volunteer" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Volunteer with Trinetra Foundation",
          url: "https://trinetrafoundation.org/volunteer",
          publisher: {
            "@id": "https://trinetrafoundation.org/#organization",
          },
        }),
      },
    ],
  }),
  component: VolunteerPage,
});

function VolunteerPage() {
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  function toggle(item: string) {
    setInterests((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (interests.length === 0) {
      toast.error("Please choose at least one area of interest.");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    const { error } = await supabase.from("volunteer_applications").insert({
      full_name: String(data.get("full_name") ?? "").trim().slice(0, 120),
      email: String(data.get("email") ?? "").trim().slice(0, 255),
      phone: String(data.get("phone") ?? "").trim().slice(0, 20),
      city: String(data.get("city") ?? "").trim().slice(0, 120),
      availability: String(data.get("availability") ?? "").trim().slice(0, 200) || null,
      skills: String(data.get("skills") ?? "").trim().slice(0, 500) || null,
      motivation: String(data.get("motivation") ?? "").trim().slice(0, 1000) || null,
      interests,
    });
    setSubmitting(false);
    if (error) {
      toast.error("We couldn't submit your application. Please try again.");
      return;
    }
    form.reset();
    setInterests([]);
    toast.success("Application received. Our team will get in touch soon.");
  }

  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Volunteer with us."
        intro="Field work, teaching, medical support, documentation, design, technology — there is a place for most skills."
      />
      <section className="relative z-10 -mt-16 pb-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <form onSubmit={onSubmit} className="surface-lift bg-card p-8 sm:p-14">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input name="full_name" label="Full name" required />
              <Input name="email" label="Email" type="email" required />
              <Input name="phone" label="Phone" required />
              <Input name="city" label="City / village" required />
              <Input name="availability" label="Availability (e.g. weekends)" />
              <Input name="skills" label="Skills you can offer" />
            </div>

            <fieldset className="mt-8">
              <legend className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
                Areas of interest *
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {volunteerInterests.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggle(item)}
                    aria-pressed={interests.includes(item)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                      interests.includes(item)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-navy hover:bg-accent"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-8 block text-sm">
              <span className="text-muted-foreground">Why do you want to volunteer?</span>
              <textarea
                name="motivation"
                rows={4}
                maxLength={1000}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 rounded-full bg-primary px-8 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground uppercase disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit application"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={500}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-navy"
      />
    </label>
  );
}