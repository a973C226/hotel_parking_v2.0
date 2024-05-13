import { NextResponse, NextRequest } from "next/server";
import { personalInfoAction } from "@/lib/actions/auth/personalInfoAction";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { personalInfoSchema } from "@/lib/validations/personalInfoSchema";


export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();

        const validatedFields = personalInfoSchema.safeParse(body);
        if (!validatedFields.success) {
            logger.log({
                level: "error",
                message: `[BodyParseError "api/auth/personal-info"]: ${validatedFields.error.message}`,
            });
            return new NextResponse(
                JSON.stringify({ message: "Ошибка регистрации." }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { "Content-Type": "application/json" }
                },
            );
        }
        
        const actionResult = await personalInfoAction(validatedFields.data);

        if (!actionResult.success) {
            if (actionResult.result === "unauthorized") {
                return new NextResponse(
                    JSON.stringify({ 
                        message: "unauthorized"
                     }), 
                    {
                        status: statusCode.StatusAuthorizationError,
                        headers: { "Content-Type": "application/json" }
                    },
                )
            }

            return new NextResponse(
                JSON.stringify({ 
                    message: actionResult.result
                 }), 
                {
                    status: statusCode.StatusBadRequest,  
                    headers: { "Content-Type": "application/json" }
                },
            )
        }
        
        return new NextResponse(
            JSON.stringify({ message: actionResult.result }),
            { 
                status: statusCode.StatusOK, 
                headers: { "Content-Type": "application/json" }
            } 
        );
    } catch (error) {
        logger.log({
            level: "error",
            message: `[ApiError "api/auth/personal-info"]: ${ error }`,
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