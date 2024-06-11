import { logger } from "@/lib/logger";
import { getBookingWhere } from "@/lib/repositories/booking";
import { getParkingById } from "@/lib/repositories/parking";
import { count } from "console";

interface freePlacesActionParams {
    datetimeFrom: string;
    datetimeTo: string;
    parkingId: string;
}

export const freePlacesAction = async ({datetimeFrom, datetimeTo, parkingId}: freePlacesActionParams) => {
    try {
        const parsedDatetimeFrom = new Date(datetimeFrom)
        const parsedDatetimeTo = new Date(datetimeTo)
        
        const bookings = await getBookingWhere({
            AND: [
                {
                    OR: [
                        {
                            bookingStart: {
                                gte: parsedDatetimeFrom,
                                lte: parsedDatetimeTo,
                            },
                        },
                        {
                            bookingEnd: {
                                gte: parsedDatetimeFrom,
                                lte: parsedDatetimeTo,
                            },
                        },
                    ],
                },
                {
                    parkingId: parkingId,
                    status: {
                        notIn: ["CANCELED", "ARCHIVED"]
                    }
                }
            ]
        })
        if (!bookings) {
            return { success: false, result: "Ошибка получения свободных мест." }
        }

        const bookingsCount = bookings.length

        const parking = await getParkingById(parkingId)
        if (!parking) {
            return { success: false, result: "Не удалось получить информацию о парковке." }
        }
        
        const freePlacesCount = parking.parkingSpaces - bookingsCount
        return { success: true, result: freePlacesCount }
    } catch (err) {
        logger.log({
            level: "error",
            message: `[freePlacesAction] error: ${ err }`,
        });
        return { success: false, result: "Ошибка получения свободных мест." };
    }
}