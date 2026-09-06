"use client";

import { useOrganisation } from "@/hooks/useAccount";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { MatrixCell } from "@/components/ui/MatrixCell";
import { ChipList } from "@/components/ui/ChipList";
import { Chip } from "@/components/ui/Chip";
import { Note } from "@/components/ui/Note";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

/** One column per role, and the roles come from the API — five of them was the mock's count. */
const permGrid = (roles: number) => `minmax(240px,1.6fr) repeat(${roles},minmax(110px,1fr))`;

export default function OrganisationPage() {
  const { data } = useOrganisation();
  if (!data) return null;

  const { headline, teamNote, roles, permissions, members, activity, policies, invites } = data;
  const PERM_GRID = permGrid(roles.length);

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker={headline}
        title="Kto ma dostęp i do czego"
        aside={
          <div className="flex gap-[7px]">
            <button
              type="button"
              className="cursor-pointer rounded-[10px] bg-white/[.05] px-[11px] py-[7px] text-[9.5px] tracking-[.07em] text-ink"
            >
              ZAPROŚ OSOBĘ
            </button>
            {/* No price: nothing in this system knows one, and a number in a button is
                a number somebody will quote back. */}
            <button
              type="button"
              className="cursor-pointer rounded-[10px] border border-white/20 px-[11px] py-[7px] text-[9.5px] tracking-[.07em]"
            >
              ZMIEŃ LICZBĘ MIEJSC
            </button>
          </div>
        }
      />

      <div className="mb-6 overflow-x-auto border border-white/[.13]">
        <div className="min-w-[940px]">
          <div
            className="grid border-b border-white/[.13] bg-white/[.05]"
            style={{ gridTemplateColumns: PERM_GRID }}
          >
            <div className="px-3 py-2.5 text-[9px] tracking-[.13em] text-ink/50">UPRAWNIENIE</div>
            {roles.map((role) => (
              <div key={role.name} className="border-l border-white/10 px-3 py-2.5">
                <div className="text-xs font-semibold">{role.name}</div>
                <div className="mt-0.5 text-[9px] text-ink/45">{role.count}</div>
              </div>
            ))}
          </div>

          {permissions.map((permission) => (
            <div
              key={permission.label}
              className="grid border-b border-ink/[.08] bg-white/[.03] transition-colors hover:bg-white/[.04]"
              style={{ gridTemplateColumns: PERM_GRID }}
            >
              <div className="min-w-0 px-3 py-[9px] text-xs">{permission.label}</div>
              {permission.cells.map((cell, index) => (
                <MatrixCell key={index} cell={cell} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Zespół" aside={teamNote} />
          <HairlineList>
            {members.map((member) => (
              <HairlineItem
                key={member.mail}
                className="grid grid-cols-[26px_minmax(0,1fr)_120px_110px_90px] items-center gap-[11px] px-[13px] py-2.5"
              >
                <div className="flex h-[26px] w-[26px] items-center justify-center bg-white/[.06] text-[9.5px] font-semibold text-ink/60">
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-xs">{member.name}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{member.mail}</div>
                </div>
                <div className="text-[11.5px] text-ink/70">{member.role}</div>
                <div className="text-[9.5px] text-ink/50">{member.last}</div>
                <div>
                  <Chip tone={member.tone}>{member.state}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          <HairlineList className="mt-3">
            <HairlineItem className="bg-white/[.05] px-[13px] py-[9px] text-[9px] tracking-[.13em] text-ink/55">
              LOG AKTYWNOŚCI ZESPOŁU
            </HairlineItem>
            {activity.map((entry) => (
              <HairlineItem
                key={entry.id}
                className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-[11px] px-[13px] py-[9px]"
              >
                <div className="text-[9.5px] text-ink/50">{entry.when}</div>
                <div className="min-w-0 text-[11.5px] leading-[1.45] text-pretty">{entry.what}</div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <SectionRule title="Polityki organizacji" />
            <HairlineList>
              {policies.map((policy) => (
                <HairlineItem
                  key={policy.name}
                  className="flex items-center justify-between gap-3 px-[13px] py-2.5"
                >
                  <div className="min-w-0">
                    <div className="text-xs">{policy.name}</div>
                    <div className="mt-0.5 text-[9.5px] leading-[1.45] text-ink/45">
                      {policy.note}
                    </div>
                  </div>
                  <Chip tone={policy.tone}>{policy.state}</Chip>
                </HairlineItem>
              ))}
            </HairlineList>
            <Note className="mt-[9px]">
              Polityka organizacji nadpisuje ustawienie indywidualne. Użytkownik widzi, która
              wartość jest wymuszona i przez kogo.
            </Note>
          </div>

          <div className="rounded-[14px] border border-white/[.13] bg-white/[.035] px-[15px] py-3.5">
            <div className="mb-[9px] text-[9px] tracking-[.13em] text-accent-soft">
              ZAPROSZENIA I OFFBOARDING
            </div>
            <ChipList items={invites} />
          </div>
        </div>
      </div>
    </div>
  );
}
