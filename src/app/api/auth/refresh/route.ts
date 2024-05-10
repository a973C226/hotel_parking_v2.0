import { NextResponse, NextRequest } from "next/server";
import { refreshTokenAction } from "@/lib/actions/auth/refreshTokenAction";
import { sendVerificationEmailToken } from "@/lib/actions/token/sendVerificationEmailToken";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { refreshTokenSchema } from "@/lib/validations/refreshTokenSchema";


export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();
        logger.log({
            level: "info",
            message: JSON.stringify(body),
        })
        const validatedFields = refreshTokenSchema.safeParse(body);
        if (!validatedFields.success) {
            logger.log({
                level: "error",
                message: validatedFields.error.message,
            });
            return new NextResponse(
                JSON.stringify({ message: `ошибка валидации` }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { "Content-Type": "application/json" }
                },
            );
        }

        const refreshTokenResult = await refreshTokenAction(validatedFields.data);
        if (!refreshTokenResult.success) {
            return new NextResponse(
                JSON.stringify({ message: `ошибка авторизации` }), 
                {
                    status: statusCode.StatusBadRequest, 
                    headers: { "Content-Type": "application/json" }
                },
            );
        }
        const response = new NextResponse(
            JSON.stringify({ 
                message: `токен обновлен`,
                access_token: refreshTokenResult.result.accessToken.token,
                access_token_expires: refreshTokenResult.result.accessToken.expires,
                refresh_token: refreshTokenResult.result.refreshToken.token,
                refresh_token_expires: refreshTokenResult.result.refreshToken.expires
             }), 
            {
                status: statusCode.StatusOK, 
                headers: { "Content-Type": "application/json" }
            },
        );
        return response;
    } catch (error) {
        logger.log({
            level: "error",
            message: `непредвиденная ошибка: ${ error }`,
        });
        return NextResponse.json(
            { error: `Что-то пошло не так: ${ error }` }, 
            { 
                status: statusCode.StatusBadRequest,
                headers: { "Content-Type": "application/json" } 
            }
        );
    }
  }