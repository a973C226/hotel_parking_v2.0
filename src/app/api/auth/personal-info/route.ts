import { NextResponse, NextRequest } from "next/server";
import { personalInfoAction } from "@/lib/actions/auth/personalInfoAction";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { personalInfoSchema } from "@/lib/validations/personalInfoSchema";
import { isVerifiedToken } from "@/lib/utils/auth";


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
        
        const body = await request.json();

        const validatedFields = personalInfoSchema.safeParse(body);
        if (!validatedFields.success) {
            logger.log({
                level: "error",
                message: `[BodyParseError "POST api/auth/personal-info"]: ${validatedFields.error.message}`,
            });
            return new NextResponse(
                JSON.stringify({ message: "Ошибка заполнения профиля." }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }
        
        const actionResult = await personalInfoAction(session.id as string, validatedFields.data, request.method);

        if (!actionResult.success) {
            return new NextResponse(
                JSON.stringify({ 
                    message: actionResult.result
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
            JSON.stringify({ message: actionResult.result }),
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
            message: `[ApiError "POST api/auth/personal-info"]: ${ error }`,
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

export async function PUT(request: NextRequest): Promise<NextResponse> {
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
        
        const body = await request.json();
        
        const validatedFields = personalInfoSchema.safeParse(body);
        if (!validatedFields.success) {
            logger.log({
                level: "error",
                message: `[BodyParseError "PUT api/auth/personal-info"]: ${validatedFields.error.message}`,
            });
            return new NextResponse(
                JSON.stringify({ message: "Ошибка заполнения профиля." }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }
        
        const actionResult = await personalInfoAction(session.id as string, validatedFields.data, request.method);

        if (!actionResult.success) {
            return new NextResponse(
                JSON.stringify({ 
                    message: actionResult.result
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
            JSON.stringify({ message: actionResult.result }),
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
            message: `[ApiError "PUT api/auth/personal-info"]: ${ error }`,
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