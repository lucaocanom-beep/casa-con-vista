import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

// Redirige le rotte senza prefisso lingua sulla lingua di default.
// Mantiene query e hash. Non tocca asset statici/_next/api.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Escludi asset, immagini, file statici, route API
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
