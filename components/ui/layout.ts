/**
 * Content padding transcribed from the prototypes. The landing page breathes
 * wider and responds to the 900 px breakpoint; the consoles use a fixed,
 * tighter grid.
 */

/** Product map — `20px 18px 56px` on mobile, `26px 32px 64px` from 900 px. */
export const PAGE_PADDING = "px-[18px] pt-5 pb-14 shell:px-8 shell:pt-[26px] shell:pb-16";

/** Free tier — `24px 30px 46px`, width capped at 1240 px. */
export const CONSOLE_PADDING = "max-w-[1240px] px-[30px] pt-6 pb-[46px]";

/** The other consoles (Pro, Local, Engine, Account, Configuration) — `22px 26px 44px`. */
export const CONSOLE_PADDING_TIGHT = "px-[26px] pt-[22px] pb-11";

/** Width-capped variant — the onboarding and guards tabs. */
export const CONSOLE_PADDING_TIGHT_NARROW = `max-w-[1240px] ${CONSOLE_PADDING_TIGHT}`;
