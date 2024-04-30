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

        const signUpResult = await signUpAction(validatedFields.data);

        if (!signUpResult.success) {
            return new NextResponse(
                JSON.stringify({ message: `ошибка регистрации` }), 
                {
                    status: statusCode.StatusInternalServerError, 
                    headers: { "Content-Type": "application/json" }
                },
            )
        }
        if (!signUpResult.result) {
            return new NextResponse(
                JSON.stringify({ message: `ожидалось получение user, но вернулось: ${ signUpResult.result }` }), 
                { 
                    status: statusCode.StatusInternalServerError,
                    headers: { "Content-Type": "application/json" }
                },
            )
        }

        const verificationEmailToken = await sendVerificationEmailToken(signUpResult.result.email);

        if (!verificationEmailToken.success) {
            return new NextResponse(
                JSON.stringify({ message: `${verificationEmailToken.result}` }),
                { 
                    status: statusCode.StatusInternalServerError, 
                    headers: { "Content-Type": "application/json" } 
                }
            );
        }
        
        return new NextResponse(
            JSON.stringify({ message: `OK` }),
            { 
                status: statusCode.StatusOK, 
                headers: { "Content-Type": "application/json" }
            } 
        );
    } catch (error) {
        logger.log({
            level: "error",
            message: `непредвиденная ошибка: ${ error }`,
        });
        return new NextResponse(
            JSON.stringify({ message: `Что-то пошло не так: ${ error }` }), 
            { 
                status: statusCode.StatusUnknownError,
                headers: { "Content-Type": "application/json" } 
            }
        );
    }
  }