import * as z from "zod";

export const personalInfoSchema = z.object({
    username: z.string().min(1, {
        message: "Введите username.",
    }),
    lastname: z.string().min(1, {
        message: "Введите фамилию.",
    }),
    name: z.string().min(1, {
        message: "Введите имя.",
    }),
    middlename: z.string().min(1, {
        message: "Введите отчество.",
    }),
    birthdate: z.custom<`${string}`>((val) => {
        return typeof val === "string" ? /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d$/.test(val) : false;
    }, "Формат даты ДД.ММ.ГГГГ"),
    gender: z.string().min(1, {
      message: "Выберите пол.",
    }),
    phoneNumber: z.custom<`${string}`>((val) => {
        return typeof val === "string" ? /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(val) : false;
    }, "Некорректный номер телефона"),
}) // 