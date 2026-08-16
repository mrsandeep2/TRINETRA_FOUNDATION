import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { org } from "@/lib/site";

const policies: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect only the information you choose to give us through our contact, volunteer, partnership and donation forms: your name, email, phone number, location and the details you write in the message fields.",
      "This information is used solely to respond to you, process a volunteer application or partnership enquiry, and issue donation receipts. We do not sell, rent or trade personal data.",
      `You may ask us to correct or delete your information at any time by writing to ${org.email}.`,
    ],
  },
  terms: {
    title: "Terms of Use",
    body: [
      "This website is published by Trinetra Foundation for information about our programmes and for receiving volunteer, partnership and donation enquiries.",
      "Programme descriptions, targets and campaign figures are published in good faith and may be updated as work progresses. Content on this site may not be reproduced commercially without written permission.",
    ],
  },
  donation: {
    title: "Donation Policy",
    body: [
      "All contributions are used for the programme or campaign indicated, or for the Foundation's general programme fund where no preference is stated.",
      "Donation pledges submitted on this site are recorded and followed up by our team with payment details and a receipt. Refunds for incorrect or duplicate payments are made on request within a reasonable period after verification.",
      `For any donation query, write to ${org.email} or call ${org.phone}.`,
    ],
  },
  volunteer: {
    title: "Volunteer Policy",
    body: [
      "Volunteers act as representatives of Trinetra Foundation in the field and are expected to treat every beneficiary with dignity and confidentiality.",
      "Volunteers are not required to make financial contributions. Roles are assigned based on interest, availability and the requirements of the programme, and may involve orientation before field participation.",
    ],
  },
};

export const Route = createFileRoute("/policies/$slug")({
  loader: ({ params }) => {
    const policy = policies[params.slug];
    if (!policy) throw notFound();
    return { policy };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Policy not found — Trinetra Foundation" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.policy.title} — Trinetra Foundation`;
    return {
      meta: [
        { title },
        { name: "description", content: `${loaderData.policy.title} of Trinetra Foundation.` },
        { property: "og:title", content: title },
        { property: "og:description", content: `${loaderData.policy.title} of Trinetra Foundation.` },
        { property: "og:url", content: `https://trinetrafoundation.in/policies/${params.slug}` },
        { property: "og:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
      ],
      links: [{ rel: "canonical", href: `https://trinetrafoundation.in/policies/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl text-navy">Policy not found</h1>
      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
        Go home
      </Link>
    </div>
  ),
  component: PolicyPage,
});

function PolicyPage() {
  const { policy } = Route.useLoaderData();

  return (
    <>
      <PageHero eyebrow="Policies" title={policy.title} />
      <section className="relative z-10 -mt-16 pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="surface-lift space-y-5 bg-card p-8 sm:p-14">
            {policy.body.map((paragraph: string) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}