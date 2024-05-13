import * as jose from 'jose';
import { getSecretKey } from '@/lib/utils/jwt';
import { JWTExpired } from 'jose/errors';

export async function isVerifiedToken (token: string | null) {

    if (!token) {
        return null;
    }

    try {
        const privateKey = getSecretKey();

        if (!privateKey) {
            return null;
        }
        
        const { payload } = await jose.jwtVerify(token, privateKey);

        if (!payload) {
            return null;
        }

        return payload;
    } 
    catch (err) {
        if (err instanceof JWTExpired) {
            console.error('[isVerifiedToken] error: JWTExpired')
            return null
        }
        console.error('[isVerifiedToken] error: ', err)

        return null;
    }
}