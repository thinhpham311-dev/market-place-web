import { NextRequest, NextResponse } from "next/server";
import { getLanguageFromSubdomain, getSubdomainFromHostname } from "@/lib/i18n/location-subdomain";

const LOCATION_COOKIE_NAME = "market_location_hint";

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0] ?? "";
  const subdomain = getSubdomainFromHostname(hostname);
  const detectedLanguage = getLanguageFromSubdomain(subdomain);
  const response = NextResponse.next();

  if (subdomain) {
    response.headers.set("x-market-subdomain", subdomain);
  }

  if (detectedLanguage) {
    response.cookies.set(LOCATION_COOKIE_NAME, detectedLanguage, {
      path: "/",
      sameSite: "lax",
    });
    response.headers.set("x-market-language", detectedLanguage);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
