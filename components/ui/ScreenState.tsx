"use client";

import type { Resource } from "@/hooks/useResource";
import { CONSOLE_PADDING_TIGHT } from "./layout";

/**
 * What a screen shows before it has anything to show.
 *
 * Every page here used to answer `if (!data) return null`, which was right while the
 * data came from a mock and arrived synchronously: there was no moment without it. With
 * a real API there are two such moments and they are not the same — one is a wait and
 * the other is a reason — and rendering nothing for both leaves a reader looking at an
 * empty console with no way to tell which.
 *
 * The reason matters more than it sounds. A workspace that insists on a second factor
 * turns every screen into a refusal carrying a sentence about what to do next; without
 * somewhere to put that sentence it dies in hook state and the reader sees a blank page
 * where their console used to be.
 *
 * Deliberately not a spinner. These consoles are read, not watched: a line saying what
 * is happening is more use than an animation, and it does not move under somebody's eyes
 * while they are trying to read the header above it.
 */
export function ScreenState({ resource }: { resource: Resource<unknown> }) {
  const { isLoading, error, refetch } = resource;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <div className="max-w-[560px] rounded-[14px] border border-white/[.13] bg-white/[.03] px-4 py-[15px]">
        <div className="mb-2 text-[9px] tracking-[.14em] text-ink/50">
          {isLoading ? "WCZYTYWANIE" : "NIE UDAŁO SIĘ WCZYTAĆ"}
        </div>

        <div className="text-[12.5px] leading-[1.55] text-pretty text-ink/[.78]">
          {isLoading ? "Pobieram dane z API." : (error?.message ?? "Nieznany błąd.")}
        </div>

        {!isLoading && (
          <button
            type="button"
            onClick={refetch}
            className="mt-3 cursor-pointer rounded-[10px] border border-white/20 px-[11px] py-[7px] text-[9.5px] tracking-[.07em]"
          >
            SPRÓBUJ PONOWNIE
          </button>
        )}
      </div>
    </div>
  );
}
