import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Benvenuti — Casa con Vista",
  robots: { index: false, follow: false },
};

export default function BenvenutiLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
