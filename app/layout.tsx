import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Barometr — monitoring instytucji",
  description:
    "Jeden potok pozyskiwania i przetwarzania danych publicznych zasila cztery warstwy dostępu: Wolny, Pro, Local i Gov.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
