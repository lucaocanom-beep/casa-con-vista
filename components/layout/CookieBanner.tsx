"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const STORAGE_KEY = "ccv-cookie-consent";
const GA_ID = "G-GCT99ZSCQV";
const PIXEL_ID = "1028679406276713";

type Props = { locale: string };

const t = {
  it: {
    text: "Questo sito usa cookie analitici (Google Analytics) e di marketing (Meta Pixel) per migliorare l'esperienza e mostrarti contenuti rilevanti. Puoi accettare o rifiutare.",
    accept: "Accetta",
    reject: "Rifiuta",
    privacy: "Privacy policy",
  },
  en: {
    text: "This site uses analytics cookies (Google Analytics) and marketing cookies (Meta Pixel) to improve your experience and show you relevant content. You can accept or decline.",
    accept: "Accept",
    reject: "Decline",
    privacy: "Privacy policy",
  },
};

export function CookieBanner({ locale }: Props) {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
    setVisible(false);
  }

  const lang = locale === "en" ? t.en : t.it;

  return (
    <>
      {/* Script caricati solo dopo consenso */}
      {consent === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}</Script>
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${PIXEL_ID}');
            fbq('track','PageView');
          `}</Script>
        </>
      )}

      {/* Banner */}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-[300] bg-pietra-950 text-schiuma-50 px-5 py-4 sm:px-8">
          <div className="mx-auto max-w-content flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm leading-relaxed text-schiuma-100/80 flex-1">
              {lang.text}
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={reject}
                className="px-4 py-2 text-sm border border-schiuma-50/30 rounded-full hover:border-schiuma-50/60 transition-colors"
              >
                {lang.reject}
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-sm bg-adriatico-600 hover:bg-adriatico-500 rounded-full transition-colors font-medium"
              >
                {lang.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
