import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ResponseAuth } from "./interface/auth.interface";
import { admin_paths, public_paths } from "./const/routes";
import { RolesEnum } from "./enum/roles";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // para debugging si quieres
  const res = NextResponse.next();
  res.headers.set("x-pathname", pathname);

  // rutas públicas
  if (public_paths.some((path) => pathname.startsWith(path))) {
    return res;
  }

  const cookie = req.cookies.get("obstetra_token");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/validate`,
      {
        headers: {
          Authorization: `Bearer ${cookie.value}`,
        },
      }
    );

    const data: ResponseAuth = response.data;
    if (!data) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const isAdminPath = admin_paths.some((path) => pathname.startsWith(path));

    if (isAdminPath && data.role !== RolesEnum.Administrador) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  } catch (error) {
    console.error("Error validating auth token", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
