import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { encryptData } from "./shared/utils/encode-decode";

export default async function middleware(req: NextRequest) {
  console.log("test");
  const { nextUrl } = req;
  const token: any = req.cookies.get("access_token");
  if (token) {
    if (
      nextUrl.hostname !== " localhost" &&
      nextUrl?.pathname === "/" &&
      req?.geo &&
      req?.ip
    ) {
      const encryptedData = await encryptData({
        ...req?.geo,
        ip: req?.ip,
        hostname: nextUrl?.hostname
      });
      return NextResponse.next({
        headers: {
          "Set-Cookie": `${"web-info"}=${encodeURIComponent(
            encryptedData
          )}; Max-Age=86400`
        }
      });
    }
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"]
};