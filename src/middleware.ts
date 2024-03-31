import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // check if the current url is /login or /signup
  const isPublic = path === '/login' || path === '/signup' || path === '/verifyemail';

  // grab the cookie
  const token = request.cookies.get('token')?.value || '';

  // if you are on the public path and you have a token
  if(isPublic && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  if(!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/profile/:path*',
    '/verifyemail'
  ]
}