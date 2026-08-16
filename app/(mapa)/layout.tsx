import { AppShell } from "@/components/shell/AppShell";

export default function ProductMapLayout({ children }: LayoutProps<"/">) {
  return <AppShell section="productMap">{children}</AppShell>;
}
