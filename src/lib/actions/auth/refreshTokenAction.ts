"use server";

import bcrypt from "bcrypt";
import * as z from "zod";
import { refreshTokenSchema } from "@/lib/validations/refreshTokenSchema"
import { getUserByEmail } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";
import * as jose from 'jose';
import { generateJwtToken } from "@/lib/utils/generateJwtToken";
import { getAlgorithm, getSecretKey } from "@/lib/utils/jwtConfig";
import { isVerifiedToken } from "@/lib/utils/auth";
import { db } from "@/lib/db";

type RefreshBody = {
    accessToken: string | null
}

export const refreshTokenAction = async (body: RefreshBody): Promise<{
    success: boolean;
    result: any;
}> => {
    try {
        const token = body.accessToken
        
        if (!token) {
            return { success: false, result: null };
        }
        
        const refreshToken = await db.refreshToken.findUnique({
            where: {
                id: token
            }
        })
        
        const isVerified = await isVerifiedToken(refreshToken?.refreshToken ?? null)
        console.log(`refreshTokenAction: ${refreshToken?.refreshToken ?? null}`)
        if(!isVerified || isVerified === "ERR_JWT_EXPIRED") {
            return { success: false, result: null };
        }
        const newPayload = { id: isVerified.id as string, role: isVerified.role as string }
        const newAccessToken = await generateJwtToken(newPayload, "2h")
        const newRefreshToken = await generateJwtToken(newPayload, "2d")
        if (!newAccessToken || !newRefreshToken) {
            return { success: false, result: null };
        }
        console.log(`newAccessToken: ${newAccessToken}`)
        await db.refreshToken.create({
            data: {
                id: newAccessToken,
                refreshToken: newRefreshToken
            }
        })
        await db.refreshToken.delete({
            where: {
                id: token
            }
        })
        
        return { success: true, result: {accessToken: newAccessToken} };
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[refreshTokenAction] error: ${ err }`,
        });
        return { success: false, result: null };
    }
}