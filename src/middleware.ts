import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { encryptData } from "./shared/utils/encode-decode";
import { cookiesName } from "./shared/constants-enums/navigation-list";

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  if (
    nextUrl.hostname !== " localhost" &&
    nextUrl?.pathname === "/" &&
    (!nextUrl?.hostname?.includes(
      process.env.NEXT_PUBLIC_AVOID_EMAIL_HOSTNAME!
    ) ||
      !nextUrl.hostname.match(process.env.NEXT_PUBLIC_AVOID_EMAIL_HOSTNAME!)) &&
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
        "Set-Cookie": `${cookiesName.info}=${encodeURIComponent(
          encryptedData
        )}; Max-Age=86400`
      }
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};