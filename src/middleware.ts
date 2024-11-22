import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { saveVisit } from "./shared/firebase/use-visit";

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  if (
    nextUrl?.hostname !== "localhost" &&
    (nextUrl?.pathname === "/") &&
    req?.geo &&
    req?.ip
  ) {
    const cookieValue = JSON.stringify({
      ...req?.geo,
      ip: req?.ip,
      hostname: nextUrl?.hostname,
    });

    saveVisit(cookieValue)
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};