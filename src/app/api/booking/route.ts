import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { getUserBookings } from "@/lib/repositories/booking";
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
        const bookings = await getUserBookings(session.id as string)

        if (bookings === null) {
            return new NextResponse(
                JSON.stringify({ 
                    message: "Не удалось получить список бронирований"
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
                data: bookings
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
            message: `[ApiError "/api/booking"]: ${err}`
        })
        return new NextResponse(
            JSON.stringify({ 
                message: "Ошибка получения бронирований."
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