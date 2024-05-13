"use server";

import { getUserByEmail } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";
import { getVerificationTokenByToken } from "@/lib/repositories/token";
import { db } from "@/lib/db";

type ConfirmEmail = {
    code: string
}

export const confirmEmailAction = async (body: ConfirmEmail): Promise<{
    success: boolean;
    result: any;
}> => {
    const code = body.code

    const existingToken = await getVerificationTokenByToken(code)
    if (!existingToken) {
        return { success: false, result: "Введен неверный код!" }
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return { success: false, result: "Пользователь не найден!" }
    }

    try {
        await db.user.update({
            where: {
                id: existingUser.id,
            },
            data: {
                emailVerified: new Date()
            },
        });
        return { success: true, result: "Почта успешно подтверждена!" };
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[confirmEmailAction] ошибка при подтверждении почты: ${ err }`,
        });
        return { success: false, result: "Ошибка! Обратитесь в техподдержку." };
    }
}