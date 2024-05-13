import * as jose from 'jose';
import { getSecretKey } from '@/lib/utils/jwtConfig';
import { JWTExpired } from 'jose/errors';

// const getSession = async () => {
//     const cookies = new Cookies();
//     const token = cookies.get("access_token") ?? null;
//     console.log(`Access token getSession: ${token}`)
//     if (!token) {
//         return null
//     }
    
//     let session = await isVerifiedToken(token)
//     if (session === "ERR_JWT_EXPIRED") {
//         axiosInstance(
// 			{
//                 method: 'POST',
//                 url: '/api/auth/refresh',
//                 data: {
//                     accessToken: token
//                 }
//             }
// 		).catch(err => {
// 			return null
// 		})
// 		const newToken = cookies.get('access_token') ?? null
// 		const newSession = await isVerifiedToken(newToken)
//         return newSession || null
//     }

//     return session || null
// }

export async function isVerifiedToken (token: string | null) {
    console.log(`isVerifiedToken: ${token}`)
    if (!token) {
        return null;
    }

    try {
        const privateKey = getSecretKey();

        if (!privateKey) {
            return null;
        }
        
        const { payload } = await jose.jwtVerify(token, privateKey);
        console.log(`isVerifiedToken: ${payload}`)
        if (!payload) {
            return null;
        }

        return payload;
    } 
    catch (err) {
        if (err instanceof JWTExpired) {
            return "ERR_JWT_EXPIRED"
        }
        console.error('[isVerifiedToken] error: ', err)

        return null;
    }
}