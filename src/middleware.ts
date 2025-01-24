import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth")
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

  if (!token && !isAuthRoute) {
    const signInUrl = new URL("/auth/signin", req.url)
    return NextResponse.redirect(signInUrl)
  }

  const userRole = token?.role
  if (isAdminRoute && (!token || userRole !== "ADMIN")) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
