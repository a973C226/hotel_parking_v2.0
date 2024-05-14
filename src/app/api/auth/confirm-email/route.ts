import { confirmEmailAction } from "@/lib/actions/auth/confirmEmailAction";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { confirmEmailSchema } from "@/lib/validations/confirmEmailSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        
        const body = await request.json();
        
        const validatedFields = confirmEmailSchema.safeParse(body);
        if (!validatedFields.success) {
            logger.log({
                level: "error",
                message: `[BodyParseError "api/auth/confirm-email"]: ${validatedFields.error.message}`,
            });
            return new NextResponse(
                JSON.stringify({ message: "Ошибка подтверждения почты." }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }

        const actionResult = await confirmEmailAction(validatedFields.data);
        if (!actionResult.success) {
            return new NextResponse(
                JSON.stringify({
                    message: actionResult.result
                }), 
                {
                    status: statusCode.StatusConfirmationError, 
                    headers: { "Content-Type": "application/json" }
                },
            );
        }
        const response = new NextResponse(
            JSON.stringify({ 
                message: "Почта успешно подтверждена!"
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
            message: `[ApiError "api/auth/confirm-email"]: ${ error }`,
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