import "./globals.css";

// Root layout di passaggio: <html> e <body> sono renderizzati dal layout [locale],
// così possiamo impostare correttamente l'attributo `lang` in base alla rotta.
// Pattern raccomandato dai docs Next.js per progetti con [locale].

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
