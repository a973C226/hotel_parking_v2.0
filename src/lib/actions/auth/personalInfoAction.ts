"use server";

import { db } from "@/lib/db";
import { getUserByID, getUserByUsername } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";

type PersonalInfo = {
    username: string,
    lastname: string,
    name: string,
    middlename: string,
    birthdate: string,
    gender: string,
    phoneNumber: string
}

export const personalInfoAction = async (userId: string, body: PersonalInfo, method: string): Promise<{
    success: boolean;
    result: any;
}> => {
    const existingUserById = await getUserByID(userId);
    if (!existingUserById) {
        return { success: false, result: "Пользователь не найден" };
    }

    const existingUserByUsername = await getUserByUsername(body.username);
    if (method === "POST" && existingUserByUsername) {
        return { success: false, result: "Username уже используется" };
    }
    if (method === "PUT" && existingUserByUsername?.id != userId) {
        return { success: false, result: "Username уже используется" };
    }

    const [day,month,year] = body.birthdate.split('.');
    try {
        const birthdate = new Date(`${year}-${month}-${day}`)
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                ...body,
                birthdate: birthdate,
                isFirstLogin: false
            }
        })

        return { success: true, result: "Профиль успешно сохранен!" }
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[personalInfoAction] ошибка при обновлении пользователя: ${ err }`,
        });
        return { success: false, result: "Ошибка! Обратитесь в техподдержку." };
    }
};