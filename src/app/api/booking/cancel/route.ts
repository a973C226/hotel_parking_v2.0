import { cancelBookingAction } from "@/lib/actions/booking/cancelBookingAction";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { isVerifiedToken } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
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

        const body = await request.json();

        const actionResult = await cancelBookingAction({
            ...body,
            userId: session.id as string
        })
        if (!actionResult.success) {
            return new NextResponse(
                JSON.stringify({ message: actionResult.result }), 
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
                message: actionResult.result,
                data: actionResult.result
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
            message: `[ApiError "/api/booking/cancel"]: ${err}`
        })
        return new NextResponse(
            JSON.stringify({ 
                message: "Ошибка отмены брони."
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