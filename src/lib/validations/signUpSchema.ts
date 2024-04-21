import * as z from "zod";


export const signUpSchema = z.object({
    name: z.string().min(1, {
      message: "Введите имя.",
    }),
    lastname: z.string().min(1, {
        message: "Введите фамилию.",
    }),
    middlename: z.string().nullable(),
    username: z.string().min(1, {
        message: "Введите username.",
    }),
    birthdate: z.string().datetime({
      message: "Введите дату рождения.",
    }),
    gender: z.string().min(1, {
      message: "Введите пол.",
    }),
    phoneNumber: z.string().length(11, {
      message: "Введите номер телефона.",
    }),
    role: z.string().default("GUEST"),
    email: z.string().email({
        message: "Введите email.",
    }),
    image: z.string().nullable(),
    password: z.string().min(6, {
        message: "Пароль должен содержать больше 6 символов.",
    }),
  });

//   User model
//   name          String
//   lastname      String
//   middlename    String?
//   username      String?
//   birthdate     DateTime
//   gender        String
//   phoneNumber   String
//   role          UserRole @default(GUEST)
//   email         String   @unique
//   emailVerified DateTime?
//   image         String?
//   password      String