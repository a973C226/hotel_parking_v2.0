"use server";

import bcrypt from "bcrypt";
import * as z from "zod";
import { signInSchema } from "@/lib/validations/signInSchema"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";
import jwt from 'jsonwebtoken';
import { generateRefreshToken } from "@/lib/utils/generateRefreshToken";

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
    const secret_key = process.env.JWT_SECRET_KEY;
    if (!secret_key) {
        logger.log({
            level: "error",
            message: "secret key not found",
        });
        return { success: false, result: "JWT_SECRET_KEY is not defined" };
    }
    try {
        const token = jwt.sign(
            {id: existingUser.id},
            secret_key, 
            { expiresIn: '1h' }
        );
        logger.log({
            level: "info",
            message: `создание jwt токена ${ token }`,
        });
        generateRefreshToken(token);
        return { success: true, result: token }
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `ошибка при создании jwt токена: ${ err }`,
        });
        return { success: false, result: null };
    }
}