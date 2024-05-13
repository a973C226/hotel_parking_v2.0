export const getSecretKey = (): Uint8Array | null => {
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

export const getAlgorithm = (): string | null => {
    const alg = process.env.JWT_SIGN_ALG;
    if (!alg) {
        return null;
    }
    return alg;
}