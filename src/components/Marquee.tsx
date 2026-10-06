type MarqueeProps = {
  items: string[];
  className?: string;
  /** Screen-reader copy, since the visual marquee repeats itself. */
  srText?: string;
};

export function Marquee({ items, className = "", srText }: MarqueeProps) {
  return (
    <div className={`marquee-mask relative overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max animate-marquee items-center">
        {[0, 1].map((duplicate) => (
          <div key={duplicate} className="flex items-center" aria-hidden={duplicate === 1}>
            {items.map((item, index) => (
              <span key={`${duplicate}-${item}-${index}`} className="flex items-center">
                <span className="display whitespace-nowrap px-8 text-[1.75rem] text-ivory/30 md:px-12 md:text-[2.6rem]">
                  {item}
                </span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-burgundy/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
      {srText ? <span className="sr-only">{srText}</span> : null}
    </div>
  );
}
