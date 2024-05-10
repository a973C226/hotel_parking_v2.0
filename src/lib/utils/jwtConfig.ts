export const getSecretKey = async (): Promise<Uint8Array | null> => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        return null;
    }
    const alg = await getAlgorithm();
    if (!alg) {
        return null;
    }
    const privateKey = new TextEncoder().encode(secretKey);
    return privateKey;
}

export const getAlgorithm = async (): Promise<string | null> => {
    const alg = process.env.JWT_SIGN_ALG;
    if (!alg) {
        return null;
    }
    return alg;
}