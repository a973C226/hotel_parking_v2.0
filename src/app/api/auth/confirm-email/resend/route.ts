import { sendVerificationEmailToken } from "@/lib/actions/token/sendVerificationEmailToken";
import { logger } from "@/lib/logger";
import { getBaseURL } from "@/lib/utils/config";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = getBaseURL()

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        
        const email = request.nextUrl.searchParams.get("email");
        if (!email) {
            logger.log({
                level: "error",
                message: `[SearchParamsParseError "api/auth/confirm-email"]: email=${email}`,
            });
            return NextResponse.redirect(new URL(`/auth/sign-up`, baseUrl))
        }
        
        await sendVerificationEmailToken(email)
        return NextResponse.redirect(new URL(`/auth/confirm-email?email=${email}`, baseUrl))
    } catch (error) {
        logger.log({
            level: "error",
            message: `[ApiError "api/auth/confirm-email/resend"]: ${ error }`,
        });
        return NextResponse.redirect(new URL(`/auth/sign-up`, baseUrl))
    }
}