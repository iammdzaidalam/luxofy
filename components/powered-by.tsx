import { site } from "@/lib/site";

/** Attribution shown at the bottom of every page. */
export function PoweredBy({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <a
      href={site.poweredBy.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors ${
        light ? "text-cream/50 hover:text-bronze" : "text-stone/70 hover:text-bronze"
      } ${className}`}
    >
      {site.poweredBy.label}
      <span aria-hidden="true">·</span>
      <span className="normal-case tracking-normal">realty.stail.co.in</span>
    </a>
  );
}
