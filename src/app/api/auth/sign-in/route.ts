import { NextResponse, NextRequest } from "next/server";
import { signInAction } from "@/lib/actions/auth/signInAction";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { signInSchema } from "@/lib/validations/signInSchema";


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
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    } 
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
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    } 
                },
            );
        }
        
        const response = new NextResponse(
            JSON.stringify({ 
                message: "Успешно!",
                data: {
                    "X-Auth-Token": actionResult.result.accessToken,
                    "X-Refresh-Token": actionResult.result.refreshToken,
                    "isFirstLogin": actionResult.result.isFirstLogin
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
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        );
    }
}