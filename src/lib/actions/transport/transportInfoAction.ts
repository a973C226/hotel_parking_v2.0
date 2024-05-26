"use server";

import { logger } from "@/lib/logger";
import { createTransport, getUniqueTransport, updateUniqueTransport } from "@/lib/repositories/transport";

interface TransportInfo {
    id: string;
    userId: string;
    brand: string;
    model: string;
    color: string;
    licensePlate: string;
}

export const transportInfoAction = async (body: TransportInfo, method: string): Promise<{
    success: boolean;
    result: any;
}> => {
    if (method === "POST") {
        const createdTransport = await createTransport(body)
        
        if (!createdTransport) {
            logger.log({
                level: "error",
                message: `[transportInfoAction] ошибка при создании ТС: ${ body }`,
            });
            return { success: false, result: "Ошибка! Обратитесь в техподдержку." };
        }
        return {
            success: true, 
            result: {
                message: "Транспортное средство добавлено!",
                data: createdTransport
            }
        }
    }

    if (method === "PUT") {
        const existingTransport = await getUniqueTransport({ id: body.id, userId: body.userId, isDeleted: false })
        if (!existingTransport) {
            return { success: false, result: "Транспортное средство не найдено" };
        }
        const updatedTransport = await updateUniqueTransport(
            {
                id: body.id
            },
            body
        )

        if (!updatedTransport) {
            logger.log({
                level: "error",
                message: `[transportInfoAction] ошибка при изменении ТС: ${ body.id }`,
            });
            return { success: false, result: "Ошибка! Обратитесь в техподдержку." };
        }

        return { 
            success: true, 
            result: {
                message: "Транспортное средство изменено!",
                data: updatedTransport
            }
        }
    }
    return { success: false, result: "method not allowed" }
}