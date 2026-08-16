import { AppShell } from "@/components/shell/AppShell";
import { GovShell } from "@/components/gov/GovShell";

export default function GovLayout({ children }: LayoutProps<"/gov">) {
  return (
    <AppShell section="gov">
      <GovShell>{children}</GovShell>
    </AppShell>
  );
}
