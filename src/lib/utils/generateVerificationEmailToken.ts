import uuid4 from "uuid4";

import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/lib/repositories/token";
import { logger } from "@/lib/logger";

export const generateVerificationEmailToken = async (email: string): Promise<string | null> => {
    const token = uuid4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        try {
            await db.verificationToken.delete({
                where: {
                    id: existingToken.id,
                },
            });
            logger.log({
                level: "debug",
                message: `удаление токена ${ existingToken.id }`,
            });
        }
        catch (err) {
            logger.log({
                level: "error",
                message: `ошибка при удалении токена ${ existingToken.id }: ${ err }`,
            });
            return null;
        }
    }

    try {
        const verficationToken = await db.verificationToken.create({
            data: {
                email,
                token,
                expires,
            }
        });
        logger.log({
            level: "debug",
            message: `создание токена ${ verficationToken.id }`,
        });
        return verficationToken.token;
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `ошибка при создании токена: ${ err }`,
        });
        return null;
    }
};