import * as z from "zod";

export const freePlaceSchema = z.object({
    datetimeFrom: z.string().min(1, {
        message: "Введите код из письма.",
    }),
    datetimeTo: z.string().min(1, {
        message: "Введите код из письма.",
    }),
    parkingId: z.string().min(1, {
        message: "Введите код из письма.",
    }),
});