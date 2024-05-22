import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { getUserByID } from "@/lib/repositories/user";
import { isVerifiedToken } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const session = await isVerifiedToken(request.headers.get("Authorization"))
        if (!session) {
            return new NextResponse(
                JSON.stringify({ message: "unauthorized" }),
                { 
                    status: statusCode.StatusUnauthorized,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            )
        }
        const user = await getUserByID(session.id as string)
        if (!user) {
            logger.log({
                level: "error",
                message: `[ApiError "/api/session"] не удаллось найти пользователя: id=${session.id}`
            })
            return new NextResponse(
                JSON.stringify({ 
                    message: "Ошибка получения сессии."
                }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            )
        }
        return new NextResponse(
            JSON.stringify({ 
                message: "OK",
                data: user
            }),
            { 
                status: statusCode.StatusOK,
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            },
        )
    } catch (err) {
        logger.log({
            level: "error",
            message: `[ApiError "/api/session"]: ${err}`
        })
        return new NextResponse(
            JSON.stringify({ 
                message: "Ошибка получения сессии."
            }),
            { 
                status: statusCode.StatusInternalServerError,
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            },
        )
    }
}