interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-3 font-body text-[10px] uppercase tracking-[0.3em] text-muted">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground tablet:text-6xl">
        {title}
      </h2>
    </div>
  );
}
