import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import {
  authProtect,
  authRoutes,
  cookiesName,
  ProtectedRoutes,
} from "@/routes";

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isProtected = ProtectedRoutes?.includes(nextUrl?.pathname);
  const token: any = req.cookies.get(cookiesName.accessToken);
  let userInfo: any = null;
  if (token) {
    userInfo = jwtDecode(token?.value);
  }
  if (
    nextUrl?.hostname !== "localhost" &&
    (nextUrl?.pathname === "/" || nextUrl?.pathname === authRoutes.login) &&
    req?.geo &&
    req?.ip
  ) {
    const cookieValue = JSON.stringify({
      ...req?.geo,
      ip: req?.ip,
      hostname: nextUrl?.hostname,
    });

    return NextResponse.next({
      headers: {
        "Set-Cookie": `${cookiesName.info}=${encodeURIComponent(
          cookieValue
        )}; Max-Age=86400`,
      },
    });
  }
  if (isProtected) {
    if (token) {
      if (userInfo?.email_verified) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL(authProtect.verifyEmail, req?.url));
    } else {
      const loginUrl = new URL(authRoutes.login, req?.url);
      loginUrl.searchParams.set(cookiesName.redirect, req?.nextUrl?.pathname);
      return NextResponse.redirect(loginUrl);
    }
  } else return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    * - login
  //    */
  //   "/((?!api|_next/static|_next/image|favicon.ico).*)",
  // ],
};
