import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);

  const languages: Record<string, string> = {};
  for (const loc of locales) languages[loc] = `${site.url}/${loc}`;

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: site.name,
    alternates: {
      canonical: `${site.url}/${rawLocale}`,
      languages,
    },
    openGraph: {
      type: "website",
      url: `${site.url}/${rawLocale}`,
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: site.name,
      locale: rawLocale === "it" ? "it_IT" : "en_US",
      // l'immagine è fornita dalla convenzione opengraph-image.tsx in questa stessa cartella
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body className="min-h-screen flex flex-col">
        {/* Skip link: visibile solo quando riceve focus (utenti tastiera/screen reader) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-md focus:bg-adriatico-900 focus:text-schiuma-50 focus:shadow-lg"
        >
          {dict.a11y.skipToContent}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main" className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppFloat locale={locale} dict={dict} />
      </body>
    </html>
  );
}
