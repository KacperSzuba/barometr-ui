"use client";

import { useMobileCompanion } from "@/hooks/useGov";
import { Sparkline } from "@/components/gov/Sparkline";
import { VERACITY_TONE } from "@/lib/gov";
import { cx } from "@/lib/cn";

export default function MobileCompanionPage() {
  const { data } = useMobileCompanion();
  if (!data) return null;

  const {
    notes,
    statusTime,
    statusDate,
    moodValue,
    moodDelta,
    moodSpark,
    moodMeta,
    alert,
    stories,
    tabs,
    footer,
  } = data;

  return (
    <div className="flex flex-wrap items-start gap-10 p-[26px]">
      <div>
        <div className="mb-1.5 text-[9.5px] tracking-[.16em] text-accent-soft">
          MOBILE COMPANION
        </div>
        <h1 className="mt-0 mb-2.5 text-[30px] font-bold tracking-[-.02em]">Briefing in the car</h1>
        <p className="m-0 max-w-[34ch] text-[12.5px] leading-[1.65] text-pretty text-ink/65">
          The phone carries only what a principal can act on between meetings: the mood number, the
          three things that moved, and any open alert. No dashboards, no exports, no free-text
          search of citizens.
        </p>

        <div className="mt-[18px] flex flex-col gap-[9px]">
          {notes.map((note) => (
            <div key={note.n} className="flex max-w-[34ch] items-start gap-[9px]">
              <span className="pt-0.5 text-[10px] text-accent-soft">{note.n}</span>
              <span className="text-[11.5px] leading-[1.5] text-ink/70">{note.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[672px] w-[330px] flex-none rounded-[44px] bg-white/[.05] p-[11px] shadow-[0_18px_44px_rgba(0,0,0,.75)]">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[34px] bg-white/[.03]">
          <div className="flex justify-between px-5 pt-[13px] pb-1.5 text-[10.5px] text-ink/70">
            <span>{statusTime}</span>
            <span>▮▮▮ ⌁ 68%</span>
          </div>

          <div className="border-b-2 border-white/[.14] px-[18px] pt-1.5 pb-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[19px] font-bold">Barometr</span>
              <span className="text-[9px] text-ink/50">{statusDate}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="border-b border-white/[.12] px-[18px] py-[15px]">
              <div className="text-[8.5px] tracking-[.14em] text-ink/45">NATIONAL MOOD</div>
              <div className="mt-1.5 flex items-baseline gap-[9px]">
                <span className="text-[38px] font-medium tracking-[-.03em]">{moodValue}</span>
                <span className="text-[13px] text-accent-soft">{moodDelta}</span>
              </div>
              <div className="mt-2.5">
                <Sparkline values={moodSpark} color="#7C5CFF" height={30} />
              </div>
              <div className="mt-2 text-[9px] text-ink/45">{moodMeta}</div>
            </div>

            <div className="rounded-[14px] bg-white/[.05] px-[18px] py-3.5 text-ink">
              <div className="mb-[7px] flex items-center gap-[7px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d9534f]" />
                <span className="text-[8.5px] tracking-[.14em] text-[#e08b87]">OPEN ALERT</span>
              </div>
              <div className="text-[15px] leading-[1.3] font-semibold">{alert.title}</div>
              <div className="mt-1.5 text-[10.5px] leading-[1.5] text-ink/60">{alert.meta}</div>
            </div>

            {stories.map((story) => (
              <div key={story.title} className="border-b border-white/[.12] px-[18px] py-3.5">
                <div className="mb-[5px] flex items-center gap-[7px]">
                  <span
                    className={cx(
                      "px-1.5 py-0.5 text-[8.5px] tracking-[.1em]",
                      VERACITY_TONE[story.veracityKind],
                    )}
                  >
                    {story.veracity}
                  </span>
                  <span className="text-[9px] text-ink/45">{story.meta}</span>
                </div>
                <div className="text-[14.5px] leading-[1.3] font-semibold text-pretty">
                  {story.title}
                </div>
                <div className="mt-1.5 flex h-[5px] w-full bg-white/[.07]">
                  <div style={{ width: `${story.negative}%`, background: "#7C5CFF" }} />
                  <div
                    style={{ width: `${story.neutral}%`, background: "rgba(231,234,242,.18)" }}
                  />
                  <div style={{ width: `${story.positive}%`, background: "#1F9C7C" }} />
                </div>
              </div>
            ))}

            <div className="px-[18px] py-[13px] text-[9px] leading-[1.6] text-ink/[.42]">
              {footer}
            </div>
          </div>

          <div className="flex border-t border-white/[.14] pt-[9px] pb-3.5">
            {tabs.map((label, index) => (
              <div
                key={label}
                className={cx(
                  "flex flex-1 flex-col items-center gap-[5px] text-[8.5px] tracking-[.08em]",
                  index === 0 ? "text-ink/85" : "text-ink/40",
                )}
              >
                <span
                  className={cx("h-1.5 w-1.5 rotate-45", index === 0 ? "bg-accent" : "bg-ink/25")}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
