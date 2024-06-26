import { checkPaymentAction } from "@/lib/actions/payment/checkPaymentAction";
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
            );
        }

        const body = await request.json()
        const actionResult = await checkPaymentAction(body.bookingId)

        if (!actionResult.success) {
            if (actionResult.confirmUrl) {
                return new NextResponse(
                    JSON.stringify({ message: `Совершите платеж.`, data: {confirmUrl: actionResult.confirmUrl} }), 
                    { 
                        status: statusCode.StatusOK,
                        headers: { 
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        }
                    }
                );
            }
            logger.log({
                level: "error",
                message: `[ApiError "POST api/payment/checkout"]: ${ actionResult.result }`,
            });
            return new NextResponse(
                JSON.stringify({ message: `Что-то пошло не так, обратитесь в техподдержку.` }), 
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                }
            );
        }
        return new NextResponse(
            JSON.stringify({ message: actionResult.result }), 
            { 
                status: statusCode.StatusOK,
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        );
    } catch(error) {
        logger.log({
            level: "error",
            message: `[ApiError "POST api/payment/checkout"]: ${ error }`,
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