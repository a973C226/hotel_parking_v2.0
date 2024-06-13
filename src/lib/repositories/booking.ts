import { BookingStatus } from "@prisma/client";
import { db } from "../db";
import { logger } from "../logger";

interface BookingParams {
    createdAt?: Date;
    bookingStart?: Date;
    bookingEnd?: Date;
    bookingQuotas?: number;
    userId?: string;
    transportId?: string;
    parkingId?: string;
}

interface UpdateBookingParams {
    status?: BookingStatus;
    bookingStart?: Date;
    bookingEnd?: Date;
    bookingQuotas?: number;
    transportId?: string;
    parkingId?: string;
}

export const getBookingWhere = async (searchParams: any) => {
    const res = await db.booking.findMany({
        where: searchParams
    })
    return res
}

export const getUserBookings = async (userId: string) => {
    try {
        const result = await db.booking.findMany({
            select: {
                id: true,
                status: true,
                bookingStart: true,
                bookingEnd: true,
                transport: {
                    select: {
                        id: true,
                        brand: true
                    }
                },
                parking: {
                    select: {
                        id: true,
                        parkingName: true
                    }
                },
            },
            where: {
                userId: userId
            },
            orderBy: {
                bookingStart: "desc"
            },
        })
        if (!result) {
            return null
        }
        return result
    } catch (err) {
        logger.error(`[createBooking] error: ${err}`)
		return null
    }
}

export const createBooking = async (createParams: any) => {
    try {
        const booking = db.booking.create({
            data: createParams
        })
        if (!booking) {
			return null
		}
        return booking
    } catch (error) {
		logger.error(`[createBooking] error: ${error}`)
		return null
	}
}

export const updateBookingById = async (bookingId: string, updateData: UpdateBookingParams) => {
    try {
        const booking = db.booking.update({
            where: {
                id: bookingId
            },
            data: updateData
        })
        if (!booking) {
			return null
		}
        return booking
    } catch (error) {
		logger.error(`[updateBookingById] error: ${error}`)
		return null
	}
}