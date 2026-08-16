import { AppShell } from "@/components/shell/AppShell";

export default function FreeTierLayout({ children }: LayoutProps<"/wolny">) {
  return <AppShell section="freeTier">{children}</AppShell>;
}
