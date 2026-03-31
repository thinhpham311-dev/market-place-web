import { NextRequest, NextResponse } from "next/server";
import { getLanguageFromSubdomain, getSubdomainFromHostname } from "@/lib/i18n/location-subdomain";

const LOCATION_COOKIE_NAME = "market_location_hint";
const INTERNAL_NOT_FOUND_PATH = "/__not-found";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(INTERNAL_NOT_FOUND_PATH)) {
    return NextResponse.next();
  }

  const hostHeader = request.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0] ?? "";
  const subdomain = getSubdomainFromHostname(hostname);
  const detectedLanguage = getLanguageFromSubdomain(subdomain);

  if (!detectedLanguage) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = INTERNAL_NOT_FOUND_PATH;
    notFoundUrl.search = "";

    return NextResponse.rewrite(notFoundUrl, {
      status: 404,
    });
  }

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
