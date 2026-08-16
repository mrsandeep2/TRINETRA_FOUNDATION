import { Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronsRight, HeartHandshake, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { images, org } from "@/lib/site";

const HEART =
  "M50 92 C18 70 4 52 4 33 C4 18 15 8 28 8 C38 8 46 14 50 22 C54 14 62 8 72 8 C85 8 96 18 96 33 C96 52 82 70 50 92 Z";

export function AboutIntro() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-card py-16 lg:py-12">
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem]">
            <svg viewBox="0 0 100 100" className="w-full drop-shadow-[0_30px_60px_oklch(0.26_0.05_260/0.25)]">
              <defs>
                <clipPath id="about-heart">
                  <path d={HEART} />
                </clipPath>
              </defs>
              <image
                href={images.heroCommunity}
                x="0"
                y="0"
                width="100"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#about-heart)"
              />
            </svg>

            {/* small circular inset image */}
            <div className="absolute left-[12%] top-[22%] h-[26%] w-[26%] overflow-hidden rounded-full border-[5px] border-primary">
              <img src={images.students} alt="Students supported by the foundation" className="h-full w-full object-cover" loading="lazy" />
            </div>

            {/* experience badge */}
            <div className="absolute right-[4%] top-[20%] rounded-[2rem] rounded-bl-none bg-primary px-6 py-4 text-center text-primary-foreground">
              <span className="block font-display text-3xl leading-none">12+</span>
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase">Areas of welfare</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-primary uppercase">
            <HeartHandshake className="h-4 w-4" /> About us
          </p>
          <h2 className="mt-4 text-3xl leading-[1.08] text-navy sm:text-4xl">
            Helping each other can make the world better.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {org.shortName} is a Section 8 not-for-profit company (CIN {org.cin}) working from
            Forbesganj, Araria, {org.state}. We pair immediate relief — food, medical aid and
            disaster response — with the slower work that changes a household permanently:
            education, student support, skills, livelihood, environment and animal welfare.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <HeartHandshake className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl text-navy">Start helping today</h3>
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Volunteer, partner or fund a specific programme
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-accent/60 px-5 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary">
                <Phone className="h-4 w-4" />
              </span>
              <span className="text-sm">
                <span className="block text-xs text-muted-foreground">Call any time</span>
                <span className="font-semibold text-navy">{org.phone}</span>
              </span>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold tracking-[0.18em] text-primary-foreground uppercase transition-transform hover:scale-[1.04]"
            >
              <ChevronsRight className="h-4 w-4" /> Explore more
            </Link>
            <Link
              to="/transparency"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-xs font-semibold tracking-[0.18em] text-navy uppercase transition-colors hover:bg-accent"
            >
              Transparency
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
