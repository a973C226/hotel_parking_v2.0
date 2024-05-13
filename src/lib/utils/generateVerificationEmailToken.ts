import crypto from "crypto";

import { db } from "@/lib/db";
import { getVerificationTokenByEmail, getVerificationTokenByToken } from "@/lib/repositories/token";
import { logger } from "@/lib/logger";

export const generateVerificationEmailToken = async (email: string): Promise<string | null> => {
    const confirmToken = crypto.randomInt(100_000, 1_000_000).toString();

    const existingToken = await getVerificationTokenByToken(confirmToken);

    if (existingToken) {
        try {
            await db.verificationToken.delete({
                where: {
                    id: existingToken.id,
                },
            })
        }
        catch (err) {
            logger.log({
                level: "error",
                message: `[generateVerificationEmailToken] ошибка при удалении токена: ${ existingToken.id }: ${ err }`,
            });
            return null;
        }
    }

    const existingTokenByEmail = await getVerificationTokenByEmail(email);

    if (existingTokenByEmail) {
        try {
            logger.info("удаление токена")
            await db.verificationToken.delete({
                where: {
                    id: existingTokenByEmail.id,
                },
            })
        }
        catch (err) {
            logger.log({
                level: "error",
                message: `[generateVerificationEmailToken] ошибка при удалении токена: ${ existingTokenByEmail.id }: ${ err }`,
            });
            return null;
        }
    }

    try {
        const verficationToken = await db.verificationToken.create({
            data: {
                email: email,
                token: confirmToken
            }
        });
        return verficationToken.token;
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[generateVerificationEmailToken] ошибка при создании токена: ${ err }`,
        });
        return null;
    }
};