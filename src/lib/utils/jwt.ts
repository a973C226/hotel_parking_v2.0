import { logger } from "@/lib/logger";
import * as jose from 'jose';

const generateJwtToken = async (payload: { id: string, role: string }, expires: string): Promise<string | null> => {
    try {
        const privateKey = getSecretKey();
        if (!privateKey) {
            return null;
        }
        const alg = getAlgorithm();
        if (!alg) {
            return null;
        }

        const refreshToken = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: alg })
            .setExpirationTime(expires)
            .sign(
                privateKey
            );
        return refreshToken;
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[generateJwtToken] ошибка при создании токена: ${ err }`,
        })
        return null;
    }
}

const getSecretKey = (): Uint8Array | null => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        return null;
    }
    const alg = getAlgorithm();
    if (!alg) {
        return null;
    }
    const privateKey = new TextEncoder().encode(secretKey);
    return privateKey;
}

const getAlgorithm = (): string | null => {
    const alg = process.env.JWT_SIGN_ALG;
    if (!alg) {
        return null;
    }
    return alg;
}

export { generateJwtToken, getSecretKey, getAlgorithm }