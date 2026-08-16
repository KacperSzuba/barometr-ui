import Link from "next/link";
import { SettingsRail } from "@/components/gov/SettingsRail";

export default function GovSettingsLayout({ children }: LayoutProps<"/gov/settings">) {
  return (
    <div className="px-[26px] pt-[22px] pb-11">
      <div className="mb-[18px] flex items-end gap-4 border-b-2 border-white/[.14] pb-3.5">
        <div>
          <div className="mb-[5px] text-[9.5px] tracking-[.16em] text-accent-soft">
            ACCOUNT · MARIA KOWALCZYK
          </div>
          <h1 className="m-0 text-[33px] leading-[1.05] font-bold tracking-[-.02em]">Settings</h1>
        </div>
        <div className="flex-1" />
        <Link
          href="/gov/briefing"
          className="rounded-[10px] border border-white/25 px-3 py-[7px] text-[9.5px] tracking-[.08em] text-ink hover:bg-white/[.04] hover:text-ink"
        >
          ← BACK TO WORKSPACE
        </Link>
      </div>

      <div className="grid grid-cols-[196px_minmax(0,1fr)] items-start gap-6">
        <SettingsRail />
        <div>{children}</div>
      </div>
    </div>
  );
}
