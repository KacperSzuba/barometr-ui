import { AppShell } from "@/components/shell/AppShell";

export default function LocalLayout({ children }: LayoutProps<"/local">) {
  return <AppShell section="localTier">{children}</AppShell>;
}
