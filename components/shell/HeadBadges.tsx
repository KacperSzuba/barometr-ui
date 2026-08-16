import type { Badge, BadgeScale } from "@/lib/sections";
import { BADGE_TONE, BADGE_TONE_MAP } from "@/components/ui/tones";
import { cx } from "@/lib/cn";

/** Badges on the right-hand side of the tab bar. */
export function HeadBadges({ badges, scale = "console" }: { badges: Badge[]; scale?: BadgeScale }) {
  if (badges.length === 0) return null;

  const tones = scale === "map" ? BADGE_TONE_MAP : BADGE_TONE;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map(({ label, tone, icon: Icon, iconStroke = 2 }) => (
        <span
          key={label}
          className={cx(
            "inline-flex items-center gap-[7px] rounded-full border px-[13px] py-[7px] text-[11.5px] font-semibold",
            tones[tone],
          )}
        >
          {Icon && <Icon size={13} strokeWidth={iconStroke} />}
          {label}
        </span>
      ))}
    </div>
  );
}
