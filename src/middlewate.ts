import { NextResponse, type NextRequest, type MiddlewareConfig } from "next/server";

const publicRoutes = [
  { path: "/sign-in", whenAutherticated: "redirect" },
  { path: "/register", whenAutherticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

function isPublicRoute(path: string) {
  return publicRoutes.find((route) => route.path === path);
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const publicRoute = isPublicRoute(path);

  if (!token && publicRoute) return NextResponse.next();

  if (!token && !publicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(url);
  }

  if (token && publicRoute?.whenAutherticated === "redirect") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
