import { Reveal } from "./Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
};

export function PageHero({ eyebrow, title, intro, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-primary-foreground">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
        </>
      ) : null}
      <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-24 sm:pt-44 sm:pb-28">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">{title}</h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">{intro}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
