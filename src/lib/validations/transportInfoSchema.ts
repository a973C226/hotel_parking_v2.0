import * as z from "zod";

export const transportInfoSchema = z.object({
    brand: z.string().min(1, {
        message: "Введите бренд ТС.",
    }),
    model: z.string().min(1, {
        message: "Введите модель ТС.",
    }),
    color: z.string().min(1, {
        message: "Введите цвет ТС.",
    }),
    licensePlate: z.string().min(1, {
        message: "Введите номерной знак ТС.",
    }),
  });