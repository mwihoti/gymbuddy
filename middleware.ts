import { NextResponse } from "next/server";
import type { NextRequest} from 'next/server.js';


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/' || path === '/auth/login' || path === '/auth/register'

    const token = request.cookies.get('token')?.value || ''

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('auth/login', request.url))

    }
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', request.url))
      }
    
      // Otherwise, continue with the request
      return NextResponse.next()
    }
    
    // Specify the paths that this middleware should run on
    export const config = {
      matcher: [
        '/',
        '/home',
        '/classes/:path*',
        '/trainer/:path*',
        '/trainerDashboard/:path*',
        '/auth/:path*',
      ],
    

}