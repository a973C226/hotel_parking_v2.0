import * as z from "zod";

export const refreshTokenSchema = z.object({
    accessToken: z.string().min(1, {
        message: "Некорректный токен",
    })
});