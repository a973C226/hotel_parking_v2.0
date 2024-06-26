import * as z from "zod";

export const signInSchema = z.object({
    email: z.string().email({
        message: "Введите email.",
    }),
    password: z.string().min(1, {
        message: "Введите пароль.",
    }),
});