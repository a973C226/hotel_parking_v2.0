import * as z from "zod";

export const signUpSchema = z.object({
    // name: z.string().min(1, {
    //   message: "Введите имя.",
    // }),
    // lastname: z.string().min(1, {
    //     message: "Введите фамилию.",
    // }),
    // middlename: z.string().nullable(),
    // username: z.string().min(1, {
    //     message: "Введите username.",
    // }),
    // birthdate: z.string().datetime({
    //   message: "Введите дату рождения.",
    // }),
    // gender: z.string().min(1, {
    //   message: "Введите пол.",
    // }),
    // phoneNumber: z.string().length(11, {
    //   message: "Введите номер телефона.",
    // }),
    // image: z.string().nullable(),
    email: z.string().email({
        message: "Введите email.",
    }),
    password: z.string().min(6, {
        message: "Пароль должен содержать больше 6 символов.",
    }),
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
	path: ["confirmPassword"]
});