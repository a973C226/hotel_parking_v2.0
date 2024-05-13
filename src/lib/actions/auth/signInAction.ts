"use server";

import bcrypt from "bcrypt";
import { getUserByEmail } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";
import { generateJwtToken } from "@/lib/utils/jwt";
import { db } from "@/lib/db";

type User = {
    email: string,
    password: string
}

export const signInAction = async (body: User): Promise<{
    success: boolean;
    result: any;
}> => {
    const email = body.email
    const password = body.password

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return { success: false, result: "Пользователь с таким email не найден!" }
    }
    if (!existingUser.emailVerified) {
        return { success: false, result: "Почта не подтверждена!" }
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordCorrect) {
        return { success: false, result: "Неправильный пароль!" }
    }

    try {
        const payload = { id: existingUser.id, role: existingUser.role }
        const accessToken = await generateJwtToken(payload, "5s")
        const refreshToken = await generateJwtToken(payload, "2d")
        if (!accessToken || !refreshToken) {
            logger.log({
                level: "error",
                message: "[signInAction] ошибка при создании токена: generateJwtToken вернул null",
            })
            return { success: false, result: "Ошибка! Обратитесь в техподдержку." }
        }
        await db.refreshToken.create({
            data: {
                id: accessToken,
                refreshToken: refreshToken
            }
        })
        const result = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            isFirstLogin: existingUser.isFirstLogin
        }
        
        return { success: true, result: result }
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[signInAction] error: ${ err }`,
        })
        return { success: false, result: "Ошибка! Обратитесь в техподдержку." }
    }
}