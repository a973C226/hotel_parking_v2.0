"use server"
import { NextResponse, NextRequest } from "next/server";
import { refreshTokenAction } from "@/lib/actions/auth/refreshTokenAction";
import { sendVerificationEmailToken } from "@/lib/actions/token/sendVerificationEmailToken";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { refreshTokenSchema } from "@/lib/validations/refreshTokenSchema";
import { serialize } from 'cookie'
import { cookies } from "next/headers";


export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const cookie = cookies().get("access_token")?.value ?? null;
        if (!cookie) {
            logger.log({
                level: "error",
                message: `[CookieParseError "api/auth/refresh"]: ${cookie}`,
            })
            return new NextResponse(
                JSON.stringify({ message: "Ошибка обновления токена" }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { "Content-Type": "application/json" }
                },
            );
        }

        const actionResult = await refreshTokenAction({ accessToken: cookie });
        if (!actionResult.success) {
            logger.log({
                level: "error",
                message: `[RefreshTokenActionError "api/auth/refresh"]: ${JSON.stringify(actionResult)}`,
            })
            return new NextResponse(
                JSON.stringify({ message: "Ошибка обновления токена" }), 
                {
                    status: statusCode.StatusBadRequest, 
                    headers: { "Content-Type": "application/json" }
                },
            );
        }
        const accessCookie = serialize('access_token', actionResult.result.accessToken, {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
            path: '/'
        })
        cookies().set("access_token", accessCookie)

        const { nextUrl } = request
        let callbackUrl = nextUrl.pathname
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        console.log("callback: " + callbackUrl)
        const callback = encodeURIComponent(callbackUrl);
        return NextResponse.redirect(new URL(callback, process.env.HOST))
        // return new NextResponse(
        //     JSON.stringify({ 
        //         message: "Токен обновлен",
        //         access_token: actionResult.result.accessToken
        //      }), 
        //     {
        //         status: statusCode.StatusOK, 
        //         headers: { 
        //             "Content-Type": "application/json",
        //             "Set-Cookie": accessCookie
        //         }
        //     },
        // )
    } catch (error) {
        logger.log({
            level: "error",
            message: `[ApiError "api/auth/refresh"]: ${ error }`,
        });
        return new NextResponse(
            JSON.stringify({ message: `Что-то пошло не так, обратитесь в техподдержку.` }), 
            { 
                status: statusCode.StatusInternalServerError,
                headers: { "Content-Type": "application/json" } 
            }
        );
    }
  }