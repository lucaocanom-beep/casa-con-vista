import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

// OG image dinamica, una per lingua.
// Servita a /it/opengraph-image e /en/opengraph-image.
// Quando avrai una foto reale dell'appartamento, sostituire con un PNG statico
// in /public/og.jpg e riferirlo dai metadata.

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function OgImage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "it";
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          color: "#fdfcf8",
          background:
            "linear-gradient(160deg, #3a82aa 0%, #235376 45%, #102739 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Strato decorativo: cerchio sole / luce in alto */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at 30% 30%, rgba(245,237,224,0.45) 0%, rgba(245,237,224,0) 65%)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#f5ede0",
            marginBottom: 24,
            opacity: 0.85,
          }}
        >
          {dict.hero.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 110,
            lineHeight: 1,
            fontWeight: 600,
            letterSpacing: -2,
          }}
        >
          {dict.hero.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            marginTop: 28,
            maxWidth: 900,
            color: "#fdfcf8",
            opacity: 0.92,
          }}
        >
          {dict.hero.subtitle}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 22,
            letterSpacing: 1.5,
            color: "#f5ede0",
            opacity: 0.85,
          }}
        >
          {dict.hero.facts}
        </div>
      </div>
    ),
    { ...size }
  );
}
