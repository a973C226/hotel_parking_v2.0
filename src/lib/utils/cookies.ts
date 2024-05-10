"use server"
import { RequestCookie, ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers'

export const getCookieByName = (name: string): RequestCookie | undefined => {
    const cookieStore = cookies();
    const requestCookie = cookieStore.get(name);
    return requestCookie
}

export const setCookie = async (name: string, value: string, options?: any): Promise<ResponseCookies | null> => {
    const cookieStore = cookies();
    try {
        const responseCookies = cookieStore.set(name, value, options);
        return responseCookies
    }
    catch(err) {
        console.error(err)
        return null
    }
}

export const hasCookie = (name: string): boolean => {
    const cookieStore = cookies();
    const existCookie = cookieStore.has(name);
    return existCookie
}