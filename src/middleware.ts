import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { authRoutes, cookiesName, ProtectedRoutes } from "@/routes";

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
      hostname:nextUrl?.hostname
    });

    return NextResponse.next({
      headers: {
        "Set-Cookie": `${cookiesName.info}=${encodeURIComponent(cookieValue)}; Max-Age=86400`,
      },
    });
  }
  if (isProtected) {
    if (userInfo?.email_verified && token) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } else return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
