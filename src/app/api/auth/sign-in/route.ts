import { NextResponse, NextRequest } from "next/server";
import { signInAction } from "@/lib/actions/auth/signInAction";
import { sendVerificationEmailToken } from "@/lib/actions/token/sendVerificationEmailToken";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { signInSchema } from "@/lib/validations/signInSchema";
import { serialize } from 'cookie'


export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();

        const validatedFields = signInSchema.safeParse(body);
        if (!validatedFields.success) {
            logger.log({
                level: "error",
                message: `[BodyParseError "api/auth/sign-in"]: ${validatedFields.error.message}`,
            });
            return new NextResponse(
                JSON.stringify({ message: "Ошибка авторизации." }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { "Content-Type": "application/json" }
                },
            );
        }

        const actionResult = await signInAction(validatedFields.data);
        if (!actionResult.success) {
            return new NextResponse(
                JSON.stringify({
                    message: actionResult.result
                }), 
                {
                    status: statusCode.StatusAuthorizationError, 
                    headers: { "Content-Type": "application/json" }
                },
            );
        }
        const accessCookie = serialize('access_token', actionResult.result.accessToken, {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
            path: '/',
        })
        // const refreshCookie = serialize('refresh_token', actionResult.result.refreshToken.token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: actionResult.result.refreshToken.expires, // 2 days
        //     path: '/',
        // })
        
        const response = new NextResponse(
            JSON.stringify({ 
                message: "Успешно!",
                isFirstLogin: actionResult.result.isFirstLogin
             }), 
            {
                status: statusCode.StatusOK, 
                headers: { 
                    "Content-Type": "application/json",
                    "Set-Cookie": accessCookie
                 }
            },
        )
        return response;
    } catch (error) {
        logger.log({
            level: "error",
            message: `[ApiError "api/auth/sign-in"]: ${ error }`,
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