"use server";

import bcrypt from "bcrypt";
import * as z from "zod";
import { signUpSchema } from "@/lib/validations/signUpSchema"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/repositories/user";
import { logger } from "@/lib/logger";

export const register = async (values: z.infer<typeof signUpSchema>) => {
    const validatedFields = signUpSchema.safeParse(values);

    if (!validatedFields.success) {
        logger.log({
            level: "error",
            message: validatedFields.error.message,
        });
        return { success: false, error: validatedFields.error };
    }

    const email = validatedFields.data.email;

    const password = validatedFields.data.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { success: false, error: "Email уже используется!" };
    }

    const user = await db.user.create({
        data: {
            ...validatedFields.data,
            password: hashedPassword,
        },
    });

    return { success: user };
};