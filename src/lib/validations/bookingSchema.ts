import * as z from "zod";

export const bookingSchema = z.object({
    bookingStart: z.string().min(1, {
        message: "Введите код из письма.",
    }),
    bookingEnd: z.string().min(1, {
        message: "Введите код из письма.",
    }),
    transportId: z.string().min(1, {
        message: "Введите код из письма.",
    }),
    parkingId: z.string().min(1, {
        message: "Введите код из письма.",
    }),
});