import { NextResponse, NextRequest } from "next/server";
import { signUpAction } from "@/lib/actions/auth/signUpAction";
import { sendVerificationEmailToken } from "@/lib/actions/token/sendVerificationEmailToken";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { signUpSchema } from "@/lib/validations/signUpSchema";


export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();

        const validatedFields = signUpSchema.safeParse(body);
        if (!validatedFields.success) {
            logger.log({
                level: "error",
                message: `[BodyParseError "api/auth/sign-up"]: ${validatedFields.error.message}`,
            });
            return new NextResponse(
                JSON.stringify({ message: "Ошибка регистрации." }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }
        
        const actionResult = await signUpAction(validatedFields.data);

        if (!actionResult.success) {
            return new NextResponse(
                JSON.stringify({ 
                    message: actionResult.result.message
                }), 
                {
                    status: statusCode.StatusRegistrationError, 
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            )
        }
        
        return new NextResponse(
            JSON.stringify({ 
                message: actionResult.result.message,
                data: actionResult.result.user
            }),
            { 
                status: statusCode.StatusOK, 
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            } 
        );
    } catch (error) {
        logger.log({
            level: "error",
            message: `[ApiError "api/auth/sign-up"]: ${ error }`,
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