import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

/** Meta domain-verification crawlers. They scrape `/` and reject path redirects. */
const META_CRAWLER =
  /facebookexternalhit|Facebot|meta-externalagent|meta-externalfetcher|FacebookBot/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") ?? "";

  // localePrefix: "always" 307s `/` → `/en`. Meta only allows apex→www and
  // http↔https, so that extra hop fails domain verification (and the error is
  // reported as a verification-file mismatch because `/` returns redirect text).
  if (pathname === "/" && META_CRAWLER.test(userAgent)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}`;
    return NextResponse.rewrite(url);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
