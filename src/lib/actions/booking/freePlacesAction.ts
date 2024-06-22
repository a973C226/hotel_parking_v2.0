import { logger } from "@/lib/logger";
import { getBookingWhere } from "@/lib/repositories/booking";
import { getParkingById } from "@/lib/repositories/parking";

interface freePlacesActionParams {
    datetimeFrom: string;
    datetimeTo: string;
    parkingId: string;
}

export const freePlacesAction = async ({datetimeFrom, datetimeTo, parkingId}: freePlacesActionParams) => {
    try {
        const parsedDatetimeFrom = new Date(datetimeFrom).toISOString()
        const parsedDatetimeTo = new Date(datetimeTo).toISOString()

        const firstCheck = {
            AND: [
                {
                    bookingStart: {
                        gte: parsedDatetimeFrom
                    }
                },
                {
                    bookingStart: {
                        lte: parsedDatetimeTo
                    }
                },
                {
                    bookingEnd: {
                        gte: parsedDatetimeFrom
                    }
                },
                {
                    bookingEnd: {
                        gte: parsedDatetimeTo
                    }
                },
            ]
        }

        const secondCheck = {
            AND: [
                {
                    bookingStart: {
                        lte: parsedDatetimeFrom
                    }
                },
                {
                    bookingStart: {
                        lte: parsedDatetimeTo
                    }
                },
                {
                    bookingEnd: {
                        gte: parsedDatetimeFrom
                    }
                },
                {
                    bookingEnd: {
                        lte: parsedDatetimeTo
                    }
                },
            ]
        }

        const thirdCheck = {
            AND: [
                {
                    bookingStart: {
                        lte: parsedDatetimeFrom
                    }
                },
                {
                    bookingStart: {
                        lte: parsedDatetimeTo
                    }
                },
                {
                    bookingEnd: {
                        gte: parsedDatetimeFrom
                    }
                },
                {
                    bookingEnd: {
                        gte: parsedDatetimeTo
                    }
                },
            ]
        }

        const fourthCheck = {
            AND: [
                {
                    bookingStart: {
                        gte: parsedDatetimeFrom
                    }
                },
                {
                    bookingStart: {
                        lte: parsedDatetimeTo
                    }
                },
                {
                    bookingEnd: {
                        gte: parsedDatetimeFrom
                    }
                },
                {
                    bookingEnd: {
                        lte: parsedDatetimeTo
                    }
                },
            ]
        }

        const bookings = await getBookingWhere({
            AND: [
                {
                    OR: [
                        { ...firstCheck },
                        { ...secondCheck },
                        { ...thirdCheck },
                        { ...fourthCheck }
                    ]
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
        
        let freePlacesCount = parking.parkingSpaces - bookingsCount
        if (freePlacesCount < 0) {
            freePlacesCount = 0
        }
        
        return { success: true, result: freePlacesCount }
    } catch (err) {
        logger.log({
            level: "error",
            message: `[freePlacesAction] error: ${ err }`,
        });
        return { success: false, result: "Ошибка получения свободных мест." };
    }
}