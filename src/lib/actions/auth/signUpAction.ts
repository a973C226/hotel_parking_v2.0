"use server";

import bcrypt from "bcrypt";
import * as z from "zod";
import { signUpSchema } from "@/lib/validations/signUpSchema"
import { db } from "@/lib/db";
import { getUserByEmail, getUserByUsername } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";

export const signUpAction = async (validatedFields: z.infer<typeof signUpSchema>): Promise<{
    success: boolean;
    result: any;
}> => {
    
    const email = validatedFields.email;
    const username = validatedFields.username;

    const password = validatedFields.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUserByEmail = await getUserByEmail(email);
    const existingUserByUsername = await getUserByUsername(username);

    if (existingUserByEmail || existingUserByUsername) {
        logger.log({
            level: "error",
            message: "[signUpAction] error: email уже используется",
        });
        return { success: false, result: {email: existingUserByEmail ? false : true, username: existingUserByUsername ? false : true} };
    }

    

    if (existingUserByUsername) {
        logger.log({
            level: "error",
            message: "[signUpAction] error: username уже используется",
        });
        return { success: false, result: "username уже используется" };
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
            message: `[signUpAction] error: ошибка при создании пользователя: ${ err }`,
        });
        return { success: false, result: err };
    }
};