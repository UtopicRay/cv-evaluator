import { NextResponse } from "next/server"

export default function middleware(req) {
  const path = req.nextUrl.pathname

  const publicRoutes = ["/", "/login", "/register"]
  const publicApiRoutes = ["/api/auth"]

  if (
    publicRoutes.includes(path) ||
    publicApiRoutes.some((route) => path.startsWith(route)) ||
    path.startsWith("/_next") ||
    path.startsWith("/favicon") ||
    path.includes(".")
  ) {
    return NextResponse.next()
  }

  // next-auth uses either a JWT token or a session cookie depending on config.
  // Comprobamos ambos para cubrir estrategias JWT y basadas en base de datos.
  const hasNextAuthToken = !!req.nextauth?.token
  const cookieToken = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token")

  if (!hasNextAuthToken && !cookieToken) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
