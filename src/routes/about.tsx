import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { images, org, values, workAreas } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Trinetra Foundation" },
      {
        name: "description",
        content:
          "Trinetra Foundation is a Section 8 non-profit registered in Forbesganj, Araria, Bihar, working on relief, education, health, livelihood, environment and animal welfare.",
      },
      { property: "og:title", content: "About — Trinetra Foundation" },
      {
        property: "og:description",
        content: "Our mission, vision, values and governance as a registered Section 8 non-profit.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A young organisation with a long horizon."
        intro={`${org.shortName} was registered in 2026 as a Section 8 not-for-profit company. We work where the founding team lives — Forbesganj, Araria, ${org.state} — and grow only as fast as we can account for the work.`}
        image={images.hands}
      />

      <section className="relative z-10 -mt-16 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="surface-lift grid gap-10 bg-card p-8 sm:p-14 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
                Our mission
              </p>
              <p className="mt-5 text-lg leading-relaxed text-navy">
                To serve humanity through education, health, food security, livelihood and relief —
                and to extend the same compassion to animals and the environment we all depend on.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
                Our vision
              </p>
              <p className="mt-5 text-lg leading-relaxed text-navy">
                A society where circumstance does not decide a person's future, where opportunity
                reaches the last village, and where development is sustainable by design.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/20 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl text-3xl leading-tight text-navy sm:text-4xl">
              Values that decide what we say yes to.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={0.06 * i}>
                <div className="h-full rounded-3xl bg-card p-7">
                  <span className="font-display text-3xl text-gold">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-lg text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
              Registered scope
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight text-navy sm:text-4xl">
              Twelve areas of work, as stated in our objects.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {workAreas.map((area, i) => (
              <Reveal key={area.slug} delay={0.03 * i}>
                <div className="flex gap-4 border-t border-border pt-5">
                  <span className="font-display text-sm text-gold">{area.index}</span>
                  <div>
                    <h3 className="font-display text-lg text-navy">{area.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{area.short}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl">Legal & governance</h2>
          <dl className="mt-8 grid gap-8 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-gold">Entity type</dt>
              <dd className="mt-2 text-primary-foreground/80">
                Section 8 Not-for-Profit Company
              </dd>
            </div>
            <div>
              <dt className="text-gold">CIN</dt>
              <dd className="mt-2 text-primary-foreground/80">{org.cin}</dd>
            </div>
            <div>
              <dt className="text-gold">Registered office</dt>
              <dd className="mt-2 text-primary-foreground/80">
                {org.address}, {org.state}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}