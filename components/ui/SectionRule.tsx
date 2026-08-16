import type { ReactNode } from "react";

/**
 * Console section header: title, a thin filling rule and a note on the right.
 */
export function SectionRule({ title, aside }: { title: string; aside?: ReactNode }) {
  return (
    <div className="mb-[11px] flex items-center gap-2.5">
      <h2 className="m-0 text-lg font-semibold">{title}</h2>
      <div className="h-px flex-1 bg-white/[.14]" />
      {aside && <span className="text-[9.5px] text-ink/45">{aside}</span>}
    </div>
  );
}
