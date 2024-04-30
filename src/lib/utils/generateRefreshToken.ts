import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import jwt from 'jsonwebtoken';

export const generateRefreshToken = async (token: string): Promise<void> => {
    const secret_key = process.env.JWT_SECRET_KEY;
    if (!secret_key) {
        logger.log({
            level: "error",
            message: "JWT_SECRET_KEY is not defined",
        })
        return;
    }

    jwt.verify(token, secret_key, async function (err, decoded): Promise<void> {
        if (err) {
            logger.log({
                level: "error",
                message: "token is not verified",
            })
            return;
        }
        if (decoded && typeof decoded != "string") {
            const refreshToken = jwt.sign({ id: decoded.id }, secret_key, { expiresIn: '1d' });
            logger.log(
                { 
                    level: "info",
                    message: "создание рефреш токена" 
                }
            );

            try {
                await db.refreshToken.create({
                    data: {
                        id: token,
                        refreshToken: refreshToken
                    }
                });
                logger.log({
                    level: "info",
                    message: "запись рефреш токена в бд"
                });
            }
            catch (err) {
                logger.log({
                    level: "error",
                    message: `ошибка при записи рефреш токена в бд: ${ err }`,
                });
                return;
            }
        }
        return;
    });
}