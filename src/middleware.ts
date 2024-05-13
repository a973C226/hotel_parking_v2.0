import { NextRequest, NextResponse } from 'next/server'
import { isVerifiedToken } from '@/lib/utils/auth'
import { cookies } from 'next/headers'
import { refreshTokenAction } from './lib/actions/auth/refreshTokenAction'
import axiosInstance from './lib/axios'
import axios from 'axios'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/', '/auth/sign-in', '/api/auth/sign-in', '/auth/refresh', '/api/auth/refresh', '/auth/sign-up', '/api/auth/sign-up']
const host = process.env.HOST

const getCallback = (req: NextRequest) => {
  	const { nextUrl } = req
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
        callbackUrl += nextUrl.search;
    }
	console.log("callback: " + callbackUrl)
    return encodeURIComponent(callbackUrl);
}
 
export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname
	const isProtectedRoute = protectedRoutes.includes(path)
	const isPublicRoute = publicRoutes.includes(path)
	const isSignInRoute = path === "/auth/sign-in"

	if (isPublicRoute) {
        return NextResponse.next()
    }

	let accessToken = cookies().get('access_token')?.value ?? null
	if (!accessToken) {
		const encodedCallbackUrl = getCallback(req)
			return NextResponse.redirect(new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, host))
	}

	let session = await isVerifiedToken(accessToken)
	if (session === "ERR_JWT_EXPIRED") {
		console.error(`[middleware] обновление токена`)
		const encodedCallbackUrl = getCallback(req)
		console.error(`[middleware] callback: ${encodedCallbackUrl}`)
		return NextResponse.redirect(new URL(`/api/auth/refresh?callbackUrl=${encodedCallbackUrl}`, host))
	}

	if (isProtectedRoute && !session) {
		const encodedCallbackUrl = getCallback(req)
		return NextResponse.redirect(new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, host))
	}

	if (isSignInRoute && session) {
		return NextResponse.redirect(new URL('/dashboard', host))
	}

	return NextResponse.next()
}
 
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}