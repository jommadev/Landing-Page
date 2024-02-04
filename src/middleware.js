import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const token = request.cookies.get("accessToken");
    const url = request.nextUrl.clone();

    //console.log('token and pathname:', { token: token?.value, pathname: url?.pathname });

    if (!token?.value) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", url.pathname);
      // Set the status code to 307 (Temporary Redirect)
      return NextResponse.redirect(redirectUrl.toString(), { statusCode: 307 });
    }


    return NextResponse.next();
  } catch (error) {
    // Handle errors if any.
    console.error('Error in middleware:', error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/home",
    "/onboarding/:path*",
    "/prefund",
    "/product/:path*",
    "/stocks/:path*",
    "/bonds/:path*",
    "/investment-themes/:path*",
    "/mutual-funds/:path*",
    "/help",
    "/saving",
    "/trading-game/:path*",
  ],
};
