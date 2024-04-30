"use server";

import bcrypt from "bcrypt";
import * as z from "zod";
import { signUpSchema } from "@/lib/validations/signUpSchema"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";

export const signUpAction = async (validatedFields: z.infer<typeof signUpSchema>): Promise<{
    success: boolean;
    result: any;
}> => {
    
    const email = validatedFields.email;

    const password = validatedFields.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        logger.log({
            level: "error",
            message: "email уже используется",
        });
        return { success: false, result: "Email уже используется!" };
    }

    try {
        const user = await db.user.create({
            data: {
                ...validatedFields,
                password: hashedPassword,
            },
        });
        logger.log({
            level: "debug",
            message: `создание пользователя: ${ user.id }`,
        });
        return { success: true, result: user };
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `ошибка при создании пользователя: ${ err }`,
        });
        return { success: false, result: err };
    }
};