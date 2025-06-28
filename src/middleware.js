import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside

const userPath = ["/transaction", "/cart"];

export function middleware(request) {
  const userData = request.cookies.get("userData");
  const token = request.cookies.get("token");
  const url = request.nextUrl.clone();
  //   console.log("hehe");
  //   console.log("url", url);
  //   console.log(token);

  if (!token) {
    // jika token tidak ada
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (!userData) {
    // jika token tidak ada
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  //   console.log(userData);

  const user = JSON.parse(userData.value);

  //   console.log(user);

  if (!user.role) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user.role !== "admin" && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (
    user.role === "admin" &&
    userPath.some((item) => url.pathname.startsWith(item))
  ) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/transaction", "/cart"],
};

// 1. cek token ada/nggak. kalo token ga ada, redirect ke page login
// 2. jika token ada, lanjut ke cek user data
// 3. jika user data tidak ada, redirect ke page login
// 4. cek role dari user data. jika role ga ada, redirect ke page login
// 5. role yang ada lalu dicek apakah bisa ke halaman yang dituju, kalo gabisa diredirect ke home
