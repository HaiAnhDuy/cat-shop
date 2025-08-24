import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("Running middleware for:", req.nextUrl.pathname);
    console.log("User token:", req.nextauth?.token);
  },
  {
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/about/:path*",
    "/contact/:path*",
    "/shop/:path*",
    "/cart/:path*",
  ],
};
