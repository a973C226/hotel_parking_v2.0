import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { logger } from './lib/logger';
import { publicRoutes, authRoutes, adminRoutes, businessUserRoutes } from '@/lib/routes';
import { isAuthenticated } from './lib/utils/tokenControl';
import { getUserByID } from './lib/repositories/user';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const req_url = request.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(req_url);
    const isAuthRoute = authRoutes.includes(req_url);
    if (isPublicRoute || isAuthRoute) {
        return NextResponse.next();
    }
    // const { isAuth, userRole } = await isAuthenticated(request);
    // if (!isAuth || !userRole) {
    //     return;
    // }
    // switch (userRole) {
    //     case "ADMIN":
    //         const isAdminRoute = adminRoutes.includes(req_url);
    //         return NextResponse.next();
    //     case "BUSiNESS_USER":
    //         const isBusinessUserRoute = businessUserRoutes.includes(req_url);
    //         return NextResponse.next();
    //     default:
    //         return NextResponse.next();
    // }
    return;
}
 
// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/:path*',
// }