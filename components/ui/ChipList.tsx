import type { Tone } from "@/lib/data/types";
import { Chip } from "./Chip";

export interface ChipListItem {
  label: string;
  value: string;
  tone: Tone;
}

/**
 * A "statement → badge" list separated by a dotted rule. Mirrors the prototypes'
 * `kv()` helper — intake limits, invitations, billing state, compliance blocks.
 */
export function ChipList({ items }: { items: ChipListItem[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2.5 border-b border-dotted border-white/[.16] pb-[7px]"
        >
          <span className="text-[11.5px] leading-[1.45] text-pretty text-ink/[.78]">
            {item.label}
          </span>
          <Chip tone={item.tone}>{item.value}</Chip>
        </div>
      ))}
    </div>
  );
}
