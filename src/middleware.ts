import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const publicPath = path === '/';
  const token = request.cookies.get('id_token')?.value;
  if(publicPath && token){
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if(!publicPath && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard',
  ],
}