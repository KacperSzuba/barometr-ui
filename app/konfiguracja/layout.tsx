import { AppShell } from "@/components/shell/AppShell";

export default function ConfigurationLayout({ children }: LayoutProps<"/konfiguracja">) {
  return <AppShell section="configuration">{children}</AppShell>;
}
