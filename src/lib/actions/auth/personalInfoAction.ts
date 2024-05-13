"use server";

import bcrypt from "bcrypt";

import * as z from "zod";
import { signUpSchema } from "@/lib/validations/signUpSchema"
import { db } from "@/lib/db";
import { getUserByEmail, getUserByID, getUserByUsername } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";
import { sendVerificationEmailToken } from "@/lib/actions/token/sendVerificationEmailToken";
import { getSession } from "@/lib/utils/auth";

type PersonalInfo = {
    username: string,
    lastname: string,
    name: string,
    middlename: string,
    birthdate: string,
    gender: string,
    phoneNumber: string
}

export const personalInfoAction = async (body: PersonalInfo): Promise<{
    success: boolean;
    result: any;
}> => {
    const session = await getSession()
    if (!session) {
        return { success: false, result: "unauthorized" };
    }

    const existingUser = await getUserByUsername(body.username);
    if (existingUser) {
        return { success: false, result: "Username уже используется" };
    }
    const [day,month,year] = body.birthdate.split('.');
    try {
        const birthdate = new Date(`${year}-${month}-${day}`)
        await db.user.update({
            where: {
                id: session.id as string
            },
            data: {
                ...body,
                birthdate: birthdate,
                isFirstLogin: false
            }
        })

        return { success: true, result: "Профиль успешно заполнен!" }
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[personalInfoAction] ошибка при обновлении пользователя: ${ err }`,
        });
        return { success: false, result: "Ошибка! Обратитесь в техподдержку." };
    }
};