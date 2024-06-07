"use server";

import { generateVerificationEmailToken } from "@/lib/utils/verificationToken";
import { logger } from "@/lib/logger";
import nodemailer from "nodemailer";
import { getBaseURL } from "@/lib/utils/config";
import { deleteVerificationTokenByEmail, getVerificationTokenByEmail } from "@/lib/repositories/token";

const baseUrl = getBaseURL();

export const sendVerificationEmailToken = async (email: string): Promise<{ success: boolean; result: null; }> => {
    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
        await deleteVerificationTokenByEmail(email)
    }

    const token = await generateVerificationEmailToken(email);
    
    if (!token) {
        return { success: false, result: null };
    }

    const confirmLink = `${ baseUrl }/auth/confirm-email?email=${ email }`;
    
    const smtpOptions = {
        host: process.env.SMTP_HOST || "",
        port: parseInt(process.env.SMTP_PORT || ""),
        secure: true,
        auth: {
            user: process.env.SMTP_USER || "",
            pass: process.env.SMTP_PASSWORD || "",
        },
    }

    try {
        const transporter = nodemailer.createTransport({ ...smtpOptions })
        
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Добро пожаловать!",
            html: `
                Код подтверждения: ${ token }
                <p><a href="${ confirmLink }">Ссылка</a> для подтверждения почты.</p>
            `
        })
        return { success: true, result: null }
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `[sendVerificationEmailToken] ошибка при отправке токена подтверждения почты: ${ err }`,
        });
        return { success: false, result: null };
    }
};
