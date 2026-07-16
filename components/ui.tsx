import Link from "next/link";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-medium uppercase tracking-luxe text-bronze ${className}`}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className={`font-display mt-6 text-4xl font-normal leading-[1.08] md:text-[3.4rem] ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={`mt-6 text-[15px] leading-relaxed md:text-base ${
            light ? "text-cream/65" : "text-stone"
          } ${align === "center" ? "mx-auto max-w-md" : "max-w-xl"}`}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------ buttons */

type PillVariant = "dark" | "bronze" | "outline" | "outline-light";

const pillVariants: Record<PillVariant, { shell: string; fill: string }> = {
  dark: { shell: "bg-ink text-cream hover:text-cream", fill: "bg-bronze" },
  bronze: { shell: "bg-bronze text-cream hover:text-cream", fill: "bg-ink" },
  outline: { shell: "border border-ink/30 text-ink hover:text-cream", fill: "bg-ink" },
  "outline-light": { shell: "border border-cream/40 text-cream hover:text-ink", fill: "bg-cream" },
};

const pillBase =
  "pill inline-flex items-center justify-center gap-2.5 px-8 py-[15px] text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze";

export function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
}) {
  const styles = pillVariants[variant];
  return (
    <Link href={href} className={`${pillBase} ${styles.shell} ${className}`}>
      <span className={`pill-fill ${styles.fill}`} aria-hidden="true" />
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "dark",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: PillVariant }) {
  const styles = pillVariants[variant];
  return (
    <button
      className={`${pillBase} ${styles.shell} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      <span className={`pill-fill ${styles.fill}`} aria-hidden="true" />
      {children}
    </button>
  );
}

/** Small underlined link with an arrow that slides on hover (eleos style). */
export function ArrowLink({
  href,
  children,
  light = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 border-b pb-1.5 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
        light
          ? "border-cream/40 text-cream hover:border-bronze hover:text-bronze"
          : "border-ink/30 text-ink hover:border-bronze hover:text-bronze"
      } ${className}`}
    >
      {children}
      <svg
        width="14"
        height="10"
        viewBox="0 0 16 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M10 1L15 6L10 11M15 6H0" />
      </svg>
    </Link>
  );
}
