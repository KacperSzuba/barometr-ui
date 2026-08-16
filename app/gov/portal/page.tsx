"use client";

import { usePublicMirror } from "@/hooks/useGov";
import { GovPageHeader } from "@/components/gov/GovPageHeader";

export default function PublicMirrorPage() {
  const { data } = usePublicMirror();
  if (!data) return null;

  const { url, headline, lede, moodValue, moodMeta, cards, claim } = data;

  return (
    <div className="px-[30px] pt-[26px] pb-11">
      <GovPageHeader
        kicker="PUBLIC MIRROR · CITIZEN-FACING"
        title="The same numbers, published"
        aside={
          <>
            barometr.gov.example · updated 06:40 daily
            <br />
            No login, no tracking, open data download
          </>
        }
      />

      {/*
       * Browser mock rendered as a white page inside the dark console. Same
       * `on-paper` token scope as the pack preview in "Daily pack builder".
       */}
      <div className="on-paper mt-5 max-w-[960px] border border-ink/[.16] bg-white shadow-[0_2px_12px_rgba(0,0,0,.75)]">
        <div className="flex items-center gap-2 rounded-[14px] border-b border-ink/[.14] bg-ink/[.05] px-3 py-[9px]">
          <span className="h-[9px] w-[9px] rounded-full bg-ink/20" />
          <span className="h-[9px] w-[9px] rounded-full bg-ink/[.14]" />
          <span className="h-[9px] w-[9px] rounded-full bg-ink/10" />
          <div className="ml-2 flex-1 rounded-full border border-ink/[.12] bg-ink/[.03] px-2.5 py-1 text-[10px] text-ink/55">
            {url}
          </div>
        </div>

        <div className="px-[34px] pt-[30px] pb-[34px]">
          <div className="flex flex-wrap items-start gap-[26px]">
            <div className="min-w-[280px] flex-1">
              <div className="text-[28px] leading-[1.15] font-bold tracking-[-.02em] text-pretty">
                {headline}
              </div>
              <p className="mt-2.5 mb-0 max-w-[56ch] text-[13px] leading-[1.7] text-pretty text-ink/70">
                {lede}
              </p>
            </div>

            <div className="min-w-[190px] rounded-[14px] border border-ink/[.14] px-5 py-4">
              <div className="text-[8.5px] tracking-[.14em] text-ink/45">NATIONAL MOOD TODAY</div>
              <div className="mt-1.5 text-[40px] font-medium tracking-[-.03em]">{moodValue}</div>
              <div className="mt-1 text-[10px] text-ink/55">{moodMeta}</div>
            </div>
          </div>

          <div className="mt-[26px] grid grid-cols-2 gap-px border border-ink/[.12] bg-ink/[.12]">
            {cards.map((card) => (
              <div key={card.kicker} className="min-w-0 rounded-[14px] bg-white px-[18px] py-4">
                <div className="text-[8.5px] tracking-[.13em] text-accent-soft">{card.kicker}</div>
                <div className="mt-2 text-[17px] leading-[1.25] font-semibold text-pretty">
                  {card.title}
                </div>
                <div className="mt-[7px] text-xs leading-[1.6] text-pretty text-ink/65">
                  {card.body}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[22px] flex flex-wrap items-center gap-[18px] rounded-[14px] bg-ink/[.05] px-4 py-3.5 text-ink">
            <div className="min-w-[240px] flex-1 text-base font-semibold text-pretty">{claim}</div>
            <button
              type="button"
              className="cursor-pointer rounded-[14px] border border-ink/35 px-3.5 py-[9px] text-[10px] tracking-[.08em] hover:bg-ink/[.05]"
            >
              DOWNLOAD OPEN DATA · CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
