import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;
      
      // Protect seller routes (except login/register)
      if (path.startsWith("/seller")) {
         if (path.startsWith("/seller/login") || path.startsWith("/seller/register")) {
             return true;
         }
         return !!token;
      }
      return true;
    }
  }
})

export const config = { 
  matcher: [
    "/seller/:path*" 
  ]
}
