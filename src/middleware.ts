import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/login', '/host-projects', '/terms', '/about', '/privacy']

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  
  console.log(`Middleware: Path ${path}, User ${user ? 'authenticated' : 'not authenticated'}`)

  // Allow access to public routes
  if (PUBLIC_ROUTES.includes(path)) {
    console.log('Middleware: Public route, allowing access')
    return res
  }

  // Check if path is a project detail page
  if (path.startsWith('/projects/')) {
    console.log('Middleware: Project detail page')
    // For project detail pages, let the page component handle authentication
    return res
  }

  // Redirect to login if accessing protected route without auth
  if (!user) {
    console.log('Middleware: Protected route, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if logged in user tries to access login page
  if (user && path === '/login') {
    console.log('Middleware: User already logged in, redirecting from login page')
    return NextResponse.redirect(new URL('/', request.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 