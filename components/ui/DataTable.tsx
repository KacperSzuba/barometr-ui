import type { ReactNode } from "react";
import { cx } from "@/lib/cn";

interface DataTableProps {
  columns: string[];
  /** The `grid-template-columns` definition shared by the header and the rows. */
  grid: string;
  /** Minimum content width — below it the table scrolls horizontally. */
  minWidth: number;
  className?: string;
  children: ReactNode;
}

/**
 * Console table: outline, horizontally scrollable area, header on a dimmed
 * background and rule-separated rows. The grid definition reaches `DataRow`
 * through context.
 */
export function DataTable({ columns, grid, minWidth, className, children }: DataTableProps) {
  return (
    <div className={cx("overflow-x-auto border border-white/[.13]", className)}>
      <div style={{ minWidth }}>
        <div
          className="grid border-b border-white/[.13] bg-white/[.05]"
          style={{ gridTemplateColumns: grid }}
        >
          {columns.map((column) => (
            <div key={column} className="px-3 py-[9px] text-[9px] tracking-[.13em] text-ink/50">
              {column}
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}

interface DataRowProps {
  grid: string;
  align?: "start" | "center";
  /** Row selected in the editor — gets a lighter background and a left edge. */
  isSelected?: boolean;
  onSelect?: () => void;
  children: ReactNode;
}

export function DataRow({ grid, align = "start", isSelected, onSelect, children }: DataRowProps) {
  return (
    <div
      onClick={onSelect}
      className={cx(
        "grid border-b border-ink/[.08] transition-colors",
        align === "center" ? "items-center" : "items-start",
        onSelect && "cursor-pointer",
        isSelected
          ? "bg-white/[.065] shadow-[inset_3px_0_0_rgba(0,0,0,.75)]"
          : "bg-white/[.03] hover:bg-white/[.04]",
      )}
      style={{ gridTemplateColumns: grid }}
    >
      {children}
    </div>
  );
}
