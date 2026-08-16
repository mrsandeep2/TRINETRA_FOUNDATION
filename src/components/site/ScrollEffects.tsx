/** Continuous ticker band — CSS-driven for minimal JS overhead. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border bg-card py-5">
      <div className="marquee-mask">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap px-6">
          {row.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-12 font-display text-lg text-navy/70 sm:text-2xl"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
