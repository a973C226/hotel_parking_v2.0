import * as z from "zod";

export const freePlaceSchema = z.object({
    datetimeFrom: z.string().min(1, {
        message: "Выберите дату и время.",
    }),
    datetimeTo: z.string().min(1, {
        message: "Выберите дату и время.",
    }),
    parkingId: z.string().min(1, {
        message: "Выберите парковку.",
    }),
})
.refine((data) => data.datetimeFrom < data.datetimeTo, {
    message: "Выбран некорректный временной период.",
	path: ["datetimeFrom"]
})
.refine((data) => data.datetimeFrom < data.datetimeTo, {
    message: "Выбран некорректный временной период.",
	path: ["datetimeTo"]
})