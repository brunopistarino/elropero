import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const theme = cookieStore.get("password");
  console.log("password", theme);
  if (theme?.value === "1234") {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/inicio", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const cookieStore = cookies();
//   const theme = cookieStore.get("password");
//   console.log("password", theme);
//   if (theme?.value === "1234") {
//     return NextResponse.next();
//   }
//   return NextResponse.redirect(new URL("/cookies", request.url));
// }

// // // See "Matching Paths" below to learn more
// // export const config = {
// //   matcher: "*",
// // };
