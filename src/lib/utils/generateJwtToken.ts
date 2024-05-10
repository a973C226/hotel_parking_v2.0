import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import * as jose from 'jose';
import { JWSSignatureVerificationFailed } from "jose/errors";
import { getSecretKey, getAlgorithm } from "@/lib/utils/jwtConfig";

export const generateJwtToken = async (payload: { id: string, role: string }, expires: string): Promise<string | null> => {

    try {
        const privateKey = await getSecretKey();
        if (!privateKey) {
            return null;
        }
        const alg = await getAlgorithm();
        if (!alg) {
            return null;
        }

        const refreshToken = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: alg })
            .setExpirationTime(expires)
            .sign(
                privateKey
            );
        logger.log({
            level: "info",
            message: `создание jwt токена`,
        });
        return refreshToken;
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `ошибка при создании токена: ${ err }`,
        })
        return null;
    }
}