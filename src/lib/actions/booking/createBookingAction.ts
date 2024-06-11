import axiosInstance from "@/lib/axios";
import { logger } from "@/lib/logger";
import { createBooking } from "@/lib/repositories/booking";
import { getParkingById } from "@/lib/repositories/parking";
import { createPayment } from "@/lib/repositories/payment";
import { getBaseURL } from "@/lib/utils/config";
import axios from "axios";
import { encode, decode } from 'js-base64';
import { v4 as uuidv4 } from 'uuid';

interface createBookingActionParams {
    // status?: string;
    // createdAt?: Date;
    bookingStart: string;
    bookingEnd: string;
    // bookingQuotas?: number;
    // paymentStatus?: string;
    userId: string;
    transportId: string;
    parkingId: string;
}

const baseUrl = getBaseURL()

export const createBookingAction = async (params: createBookingActionParams): Promise<{
    success: boolean;
    result: any;
}> => {
    try {
        const parsedBookingStart: any = new Date(params.bookingStart)
        const parsedBookingEnd: any = new Date(params.bookingEnd)
        const bookingQuotas = (parsedBookingEnd - parsedBookingStart) / 1000 / 60 / 60
        const parkingInfo = await getParkingById(params.parkingId)
        if (!parkingInfo) {
            return { success: false, result: "Ошибка создания брони. Не удалось получить информацию о парковке." }
        }
        const pricePerQuota = parseFloat(parkingInfo.pricePerQuota.toString())
        const cost = (pricePerQuota * bookingQuotas).toFixed(2)

        const newBooking = await createBooking({
            ...params,
            bookingStart: parsedBookingStart,
            bookingEnd: parsedBookingEnd,
            bookingQuotas: bookingQuotas,
            cost: cost
        })
        if (!newBooking) {
            return { success: false, result: "Ошибка создания брони." }
        }
        const return_url = baseUrl + "/payment/checkout?booking_id=" + newBooking.id
        const yookassaBody = {
            amount: {
                value: cost,
                currency: "RUB"
            },
            capture: true,
            confirmation: {
                type: "redirect",
                return_url: return_url
            },
            description: `Оплата за бронирование парковочного места на период с ${new Date(params.bookingStart).toLocaleString()} по ${new Date(params.bookingEnd).toLocaleString()}`
        }

        let confirmation_url = null
        const YOOKASSA_BASIC_AUTH = process.env.YOOKASSA_BASIC_AUTH
        if (!YOOKASSA_BASIC_AUTH) {
            logger.log({
                level: "error",
                message: `[createBookingAction] create payment error: yookassa credential not found`,
            });
            return { success: false, result: "Ошибка создания платежа." }
        }
        const response = await axios({
            method: "post",
            url: "https://api.yookassa.ru/v3/payments",
            data: JSON.stringify(yookassaBody),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Basic " + encode(YOOKASSA_BASIC_AUTH),
                "Idempotence-Key": uuidv4()
            }
        }).then((response) => {
            const respData = response.data
            confirmation_url = respData.confirmation.confirmation_url
            const paymentInfo = {
                paymentId: respData.id,
                status: respData.status,
                amount: respData.amount.value,
                currency: respData.amount.currency,
                description: respData.description,
                userId: params.userId,
                created_at: respData.created_at,
                confirmation_url: confirmation_url,
                paid: respData.paid,
                bookingId: newBooking.id
            }
            createPayment(paymentInfo)
            return { success: true, result: confirmation_url }
        }).catch((error) => {
            logger.log({
                level: "error",
                message: `[createBookingAction] create payment error: ${ JSON.stringify(error.response.data) }`,
            });
            return { success: false, result: "Ошибка создания платежа." };
        })
        if (!response.success) {
            return { success: false, result: "Ошибка создания брони." }
        }
        return { success: true, result: response.result }
    } catch (err) {
        logger.log({
            level: "error",
            message: `[createBookingAction] error: ${ err }`,
        });
        return { success: false, result: "Ошибка создания брони." };
    }
}