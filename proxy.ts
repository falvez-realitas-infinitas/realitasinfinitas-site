import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // localePrefix: "always" would 307 `/` → `/en`. Meta scrapes the site root
  // and only allows apex→www and http↔https, so that extra hop fails domain
  // verification (reported as a verification-file mismatch). Their verifier
  // does not send facebookexternalhit, so rewrite `/` for every client.
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}`;
    return NextResponse.rewrite(url);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
