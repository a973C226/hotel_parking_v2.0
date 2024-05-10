"use server";

import bcrypt from "bcrypt";
import * as z from "zod";
import { signInSchema } from "@/lib/validations/signInSchema"
import { getUserByEmail } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";
import * as jose from 'jose';
import { generateJwtToken } from "@/lib/utils/generateJwtToken";
import { getAlgorithm, getSecretKey } from "@/lib/utils/jwtConfig";

export const signInAction = async (validatedFields: z.infer<typeof signInSchema>): Promise<{
    success: boolean;
    result: any;
}> => {
    const email = validatedFields.email;
    const password = validatedFields.password;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { success: false, result: "user not found" };
    }
    if (!existingUser.emailVerified) {
        return { success: false, result: "email not verified" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        return { success: false, result: "wrong password" };
    }

    try {
        const payload = { id: existingUser.id, role: existingUser.role };
        const accessToken = await generateJwtToken(payload, "2h");
        const refreshToken = await generateJwtToken(payload, "2d");
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
            message: `[signInAction] error: ${ err }`,
        });
        return { success: false, result: null };
    }
}