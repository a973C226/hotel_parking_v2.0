import { Parking } from "@prisma/client"
import { db } from "../db"
import { logger } from "../logger"

export const getParkingById = async (parkingId: string): Promise<Parking | null> => {
    const parking = await db.parking.findUnique({
        where: {
            id: parkingId
        }
    })

    if (!parking) {
        return null
    }

    return parking
}

export const getAllParkings = async () => {
    try {
        const parkings = db.parking.findMany()

        if (!parkings) {
            return null
        }
        return parkings
    } catch (err) {
        logger.error(`[getAllParkings] error: ${err}`)
		return null
    }
}