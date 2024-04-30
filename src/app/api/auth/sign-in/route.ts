import { NextResponse, NextRequest } from "next/server";
import { signInAction } from "@/lib/actions/auth/signInAction";
import { sendVerificationEmailToken } from "@/lib/actions/token/sendVerificationEmailToken";
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
                message: validatedFields.error.message,
            });
            return new NextResponse(
                JSON.stringify({ message: `ошибка валидации` }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { "Content-Type": "application/json" }
                },
            );
        }

        const signInResult = await signInAction(validatedFields.data);
        if (!signInResult.success) {
            return new NextResponse(
                JSON.stringify({ message: `ошибка авторизации` }), 
                {
                    status: statusCode.StatusBadRequest, 
                    headers: { "Content-Type": "application/json" }
                },
            );
        }
        const response = new NextResponse(
            JSON.stringify({ message: `успешная авторизация` }), 
            {
                status: statusCode.StatusOK, 
                headers: { "Content-Type": "application/json" }
            },
        );
        response.cookies.set("token", signInResult.result, { httpOnly: true });
        return response;
    } catch (error) {
        logger.log({
            level: "error",
            message: `непредвиденная ошибка: ${ error }`,
        });
        return NextResponse.json(
            { error: `Что-то пошло не так: ${ error }` }, 
            { 
                status: statusCode.StatusUnknownError,
                headers: { "Content-Type": "application/json" } 
            }
        );
    }
  }