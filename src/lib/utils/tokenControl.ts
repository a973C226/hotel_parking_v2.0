import * as jose from 'jose';
import { NextRequest } from 'next/server'
import { getSecretKey } from '@/lib/utils/jwtConfig';
import { JWTExpired } from 'jose/errors';
import { db } from '../db';


export const isAuthenticated = async (req: NextRequest): Promise<{isAuth: Boolean, userID: string | null, userRole: string | null }> => {
    let token = req.headers.get('authorization') || req.headers.get('Authorization')
    
    if (!token) {
        return { isAuth: false, userID: null, userRole: null };
    }

    try {
        if (token.startsWith('Bearer')) {
            token = token.replace('Bearer ', '')
        }
        
        const privateKey = await getSecretKey();
        if (!privateKey) {
            return { isAuth: false, userID: null, userRole: null };
        }
        const { payload } = await jose.jwtVerify(token, privateKey);
        
        if (!payload.id) {
            return { isAuth: false, userID: null, userRole: null };
        }

        return { isAuth: true, userID: payload.id as string, userRole: payload.role as string };
    } 
    catch (err) {
        console.error('isAuthenticated error: ', err)

        return { isAuth: false, userID: null, userRole: null };
    }
}