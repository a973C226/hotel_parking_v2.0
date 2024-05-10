"use server";

import bcrypt from "bcrypt";
import * as z from "zod";
import { refreshTokenSchema } from "@/lib/validations/refreshTokenSchema"
import { getUserByEmail } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";
import * as jose from 'jose';
import { generateJwtToken } from "@/lib/utils/generateJwtToken";
import { getAlgorithm, getSecretKey } from "@/lib/utils/jwtConfig";

export const refreshTokenAction = async (validatedFields: z.infer<typeof refreshTokenSchema>): Promise<{
    success: boolean;
    result: any;
}> => {
    const token = validatedFields.refreshToken;
    logger.log({
        level: "info",
        message: `[refreshTokenAction] token: ${ token }`,
    })
    try {
        const privateKey = await getSecretKey();
        if (!privateKey) {
            return { success: false, result: null };
        }
        const { payload } = await jose.jwtVerify(token, privateKey);
        const newPayload = { id: payload.id as string, role: payload.role as string };
        const accessToken = await generateJwtToken(newPayload, "2h");
        const refreshToken = await generateJwtToken(newPayload, "2d");
        const result = {
            accessToken: {
                token: accessToken,
                expires: 7200000, // 2h
            },
            refreshToken: {
                token: refreshToken,
                expires: 172800000, // 2d
            },
        }
        
        return { success: true, result: result };
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[refreshTokenAction] error: ${ err }`,
        });
        return { success: false, result: null };
    }
}