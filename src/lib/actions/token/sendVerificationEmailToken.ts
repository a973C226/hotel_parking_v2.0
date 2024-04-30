import { generateVerificationEmailToken } from "@/lib/utils/generateVerificationEmailToken";
import { logger } from "@/lib/logger";
import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmailToken = async (email: string): Promise<{
    success: boolean;
    result: any;
}> => {
    const token = await generateVerificationEmailToken(email);

    if (!token) {
        return { success: false, result: null };
    }

    const confirmLink = `${ domain }/api/auth/newVerification?token=${ token }`;

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
        const transporter = nodemailer.createTransport({
            ...smtpOptions,
        })
    
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Welcome to NextAPI",
            html: `<p>Click <a href="${ confirmLink }">here</a> to confirm email.</p>`
        })
        logger.log({
            level: "debug",
            message: `отправление токена подтверждения почты: ${ token }`,
        });
        return { success: true, result: null }
    }
    catch (err) {
        logger.log({
            level: "error",
            message: `ошибка при отправке токена подтверждения почты: ${ err }`,
        });
        return { success: false, result: null };
    }
};