import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { donationTiers, org } from "@/lib/site";
import { formatInr } from "@/lib/queries";

export const Route = createFileRoute("/donate")({
  validateSearch: (search: Record<string, unknown>) => ({
    amount: search.amount ? Number(search.amount) || undefined : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Donate — Trinetra Foundation" },
      { name: "description", content: "Support education, food, healthcare, livelihood and environmental programmes run by Trinetra Foundation in Bihar." },
      { property: "og:title", content: "Donate — Trinetra Foundation" },
      { property: "og:description", content: "Fund programmes that pair immediate relief with lasting capability." },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

function DonatePage() {
  const search = Route.useSearch();
  const [amount, setAmount] = useState(search.amount || 1000);
  const [frequency, setFrequency] = useState("one-time");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    if (amount < 100) {
      toast.error("Please enter an amount of ₹100 or more.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("donations").insert({
      donor_name: String(form.get("donor_name") ?? "").trim().slice(0, 120),
      email: String(form.get("email") ?? "").trim().slice(0, 255),
      phone: String(form.get("phone") ?? "").trim().slice(0, 20) || null,
      pan: String(form.get("pan") ?? "").trim().slice(0, 20) || null,
      address: String(form.get("address") ?? "").trim().slice(0, 500) || null,
      amount,
      frequency,
    });
    setSubmitting(false);
    if (error) {
      toast.error("We couldn't record your pledge. Please try again.");
      return;
    }
    formEl.reset();
    toast.success("Thank you. Our team will contact you with payment details and a receipt.");
  }

  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Your contribution becomes a programme, not a promise."
        intro="Record your pledge below and our team will share payment details and a receipt. Online payment collection is being set up."
      />
      <section className="relative z-10 -mt-16 pb-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <form onSubmit={onSubmit} className="surface-lift bg-card p-8 sm:p-14">
            <fieldset>
              <legend className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
                Amount
              </legend>
              <div className="mt-5 flex flex-wrap gap-3">
                {donationTiers.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setAmount(tier)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                      amount === tier
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-navy hover:bg-accent"
                    }`}
                  >
                    {formatInr(tier)}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={100}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                aria-label="Custom amount in rupees"
                className="mt-4 w-full max-w-xs rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
              <div className="mt-5 flex gap-3">
                {["one-time", "monthly"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFrequency(option)}
                    className={`rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.14em] uppercase ${
                      frequency === option
                        ? "border-navy bg-navy text-primary-foreground"
                        : "border-border text-navy"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <Field name="donor_name" label="Full name" required />
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="Phone" />
              <Field name="pan" label="PAN (for tax receipt)" />
              <div className="sm:col-span-2">
                <Field name="address" label="Address" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-10 rounded-full bg-primary px-8 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground uppercase disabled:opacity-60"
            >
              {submitting ? "Recording…" : "Pledge my support"}
            </button>
            <p className="mt-5 text-xs text-muted-foreground">
              Questions? Write to {org.email} or call {org.phone}.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
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