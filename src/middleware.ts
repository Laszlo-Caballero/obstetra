import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  const res = NextResponse.next();
  res.headers.set("x-pathname", url);
  return res;
}
