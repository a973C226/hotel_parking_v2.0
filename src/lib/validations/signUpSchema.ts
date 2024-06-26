import * as z from "zod";

export const signUpSchema = z.object({
    email: z.string().email({
        message: "Введите email.",
    }),
    password: z.string().min(6, {
        message: "Пароль должен содержать больше 6 символов.",
    }),
    confirmPassword: z.string(),
    personalDataSwitch: z.boolean()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
	path: ["confirmPassword"]
})
.refine((data) => data.personalDataSwitch === true, {
    message: "",
	path: ["personalDataSwitch"]
});