import { AppShell } from "@/components/shell/AppShell";

export default function AccountLayout({ children }: LayoutProps<"/konto">) {
  return <AppShell section="account">{children}</AppShell>;
}
