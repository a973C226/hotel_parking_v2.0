"use server";

import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";
import { sendVerificationEmailToken } from "@/lib/actions/token/sendVerificationEmailToken";

type NewUser = {
    email: string,
    password: string
}

export const signUpAction = async (body: NewUser): Promise<{
    success: boolean;
    result: any;
}> => {
    
    const email = body.email;

    const password = body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUserByEmail = await getUserByEmail(email);

    if (existingUserByEmail) {
        return { success: false, result: "Email уже используется" };
    }

    try {
        const user = await db.user.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        });
        sendVerificationEmailToken(user.email)

        return { success: true, result: "Аккаунт успешно создан!" };
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[signUpAction] ошибка при создании пользователя: ${ err }`,
        });
        return { success: false, result: "Ошибка! Обратитесь в техподдержку." };
    }
};