import * as z from "zod";

export const confirmEmailSchema = z.object({
    code: z.string().min(1, {
        message: "Введите код из письма.",
    }),
});