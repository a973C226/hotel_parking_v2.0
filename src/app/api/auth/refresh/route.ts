import { NextResponse, NextRequest } from "next/server";
import { refreshTokenAction } from "@/lib/actions/auth/refreshTokenAction";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { isVerifiedToken } from "@/lib/utils/auth";


export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const token = request.headers.get("Authorization")
        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: "Ошибка обновления токена." }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }
        const refreshSession = await isVerifiedToken(token)
        if (!refreshSession) {
            logger.log({
                level: "error",
                message: "[TokenParseError 'api/auth/refresh']",
            })
            return new NextResponse(
                JSON.stringify({ message: "Ошибка обновления токена" }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }

        const actionResult = await refreshTokenAction({
            id: refreshSession.id as string,
            role: refreshSession.role as string
        });
        if (!actionResult.success) {
            logger.log({
                level: "error",
                message: `[RefreshTokenActionError "api/auth/refresh"]: ${JSON.stringify(actionResult)}`,
            })
            return new NextResponse(
                JSON.stringify({ message: "Ошибка обновления токена" }), 
                {
                    status: statusCode.StatusBadRequest, 
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }

        return new NextResponse(
            JSON.stringify({ 
                message: "Токен обновлен",
                data: {
                    "X-Auth-Token": actionResult.result.accessToken,
                    "X-Refresh-Token": actionResult.result.refreshToken
                }
             }), 
            {
                status: statusCode.StatusOK, 
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            },
        )
    } catch (error) {
        logger.log({
            level: "error",
            message: `[ApiError "api/auth/refresh"]: ${ error }`,
        });
        return new NextResponse(
            JSON.stringify({ message: `Что-то пошло не так, обратитесь в техподдержку.` }), 
            { 
                status: statusCode.StatusInternalServerError,
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                } 
            }
        );
    }
}