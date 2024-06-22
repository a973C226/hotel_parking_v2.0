import { db } from "../db"
import { logger } from "../logger"

interface PaymentData {
    paymentId: string,
    status: string,
    amount: number,
    currency: string,
    description: string,
    userId: string,
    created_at: string,
    confirmation_url: string,
    paid: boolean,
    bookingId: string
}

interface UpdatePaymentData {
    status?: string,
    amount?: number,
    currency?: string,
    description?: string,
    paid?: boolean
}

export const createPayment = async (data: PaymentData) => {
    try {
        const payment = db.payment.create({
            data: data
        })
        if (!payment) {
            null
        }
        return payment
    } catch(err) {
        logger.error(`[createPayment] error: ${err}`)
		return null
    }
}

export const getLastPaymentByBookingId = async (bookingId: string) => {
    try {
        const payment = db.payment.findFirst({
            where: {
                bookingId: bookingId
            },
            orderBy: {
                created_at: "desc"
            }
        })
        if (!payment) {
            null
        }
        return payment
    } catch(err) {
        logger.error(`[getLastPaymentByBookingId] error: ${err}`)
		return null
    }
}

export const getLastPaymentWhere = async (searchParams: any) => {
    try {
        const payments = db.payment.findMany({
            where: searchParams,
            orderBy: {
                created_at: "desc"
            }
        })
        if (!payments) {
            null
        }
        return payments
    } catch(err) {
        logger.error(`[getLastPaymentWhere] error: ${err}`)
		return null
    }
}

export const updatePaymentById = async (id: string, data: UpdatePaymentData) => {
    try {
        const payment = db.payment.update({
            where: {
                id: id
            },
            data: data
        })
        if (!payment) {
            null
        }
        return payment
    } catch(err) {
        logger.error(`[updatePaymentById] error: ${err}`)
		return null
    }
}