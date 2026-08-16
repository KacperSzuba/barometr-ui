/** Landing-page section header: title plus hint sharing one baseline. */
export function SectionHeading({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-[18px] flex items-baseline gap-3.5">
      <h2 className="m-0 text-xl font-extrabold tracking-[-.02em]">{title}</h2>
      {hint && <span className="text-[12.5px] font-medium text-ink/40">{hint}</span>}
    </div>
  );
}
