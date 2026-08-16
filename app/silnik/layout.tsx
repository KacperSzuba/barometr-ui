import { AppShell } from "@/components/shell/AppShell";

export default function EngineLayout({ children }: LayoutProps<"/silnik">) {
  return <AppShell section="engine">{children}</AppShell>;
}
