"use server";

import { logger } from "@/lib/logger";
import { getUniqueTransport, updateUniqueTransport } from "@/lib/repositories/transport";

interface TransportInfo {
    id: string;
    userId: string;
}

export const deleteTransportAction = async (body: TransportInfo): Promise<{
    success: boolean;
    result: any;
}> => {
    const existingTransport = await getUniqueTransport({ id: body.id, userId: body.userId, isDeleted: false })
    if (!existingTransport) {
        return { success: false, result: "Транспортное средство не найдено" };
    }

    const deletedTransport = await updateUniqueTransport(
        { id: body.id },
        { isDeleted: true }
    )
    if (!deletedTransport) {
        logger.log({
            level: "error",
            message: `[transportInfoAction] ошибка при удалении ТС: ${ body }`,
        });
        return { success: false, result: "Ошибка! Обратитесь в техподдержку." };
    }
    return {
        success: true, 
        result: {
            message: "Транспортное средство удалено.",
            data: deletedTransport
        }
    }
}