import * as z from "zod";

export const bookingSchema = z.object({
    bookingStart: z.string().min(1, {
        message: "Выберите дату и время.",
    }),
    bookingEnd: z.string().min(1, {
        message: "Выберите дату и время.",
    }),
    transportId: z.string().min(1, {
        message: "Выберите транспорт.",
    }),
    parkingId: z.string().min(1, {
        message: "Выберите парковку.",
    }),
})
.refine((data) => data.bookingStart < data.bookingEnd, {
    message: "Выбран некорректный временной период.",
	path: ["bookingStart"]
})
.refine((data) => data.bookingStart < data.bookingEnd, {
    message: "Выбран некорректный временной период.",
	path: ["bookingEnd"]
});