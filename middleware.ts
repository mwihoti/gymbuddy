import { NextResponse } from "next/server";
import type { NextRequest} from 'next/server.js';
import { verify } from 'jsonwebtoken';


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/' || path === '/auth/login' || path === '/auth/register'

    const token = request.cookies.get('token')?.value || ''

    
    if (isPublicPath && token) {
      try {
        verify(token, process.env.JWT_SECRET!);

        return NextResponse.redirect(new URL('/', request.url))
        
      } catch (error) {
        const response = NextResponse.next();
        response.cookies.delete('token');
        return response;
      }
      }
      if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('auth/login', request.url))

    }
    if (!isPublicPath && token) {
      try {
        verify(token, process.env.JWT_SECRET!);
        return NextResponse.next();

    } catch (error) {
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('token');
      return response;
    }
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