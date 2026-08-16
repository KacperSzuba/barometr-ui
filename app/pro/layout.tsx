import { AppShell } from "@/components/shell/AppShell";

export default function ProLayout({ children }: LayoutProps<"/pro">) {
  return <AppShell section="proTier">{children}</AppShell>;
}
