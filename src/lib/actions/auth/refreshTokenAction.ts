"use server";

import { logger } from "@/lib/logger";
import { generateJwtToken } from "@/lib/utils/jwt";

type Payload = {
    id: string,
    role: string
}

export const refreshTokenAction = async (payload: Payload): Promise<{
    success: boolean;
    result: any;
}> => {
    try {
        const newAccessToken = await generateJwtToken(payload, "2h")
        const newRefreshToken = await generateJwtToken(payload, "2d")
        if (!newAccessToken || !newRefreshToken) {
            return { success: false, result: null };
        }
        
        return { success: true, result: {accessToken: newAccessToken, refreshToken: newRefreshToken} };
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[refreshTokenAction] error: ${ err }`,
        });
        return { success: false, result: null };
    }
}