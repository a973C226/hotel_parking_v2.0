import { logger } from "@/lib/logger";
import { updateBookingById } from "@/lib/repositories/booking";
import { getLastPaymentByBookingId, updatePaymentById } from "@/lib/repositories/payment";
import { BookingStatus } from "@prisma/client";
import axios from "axios";
import { encode } from "js-base64";
import { v4 as uuidv4 } from 'uuid';

export const checkPaymentAction = async (bookingId: string) => {
    try {
        const payment = await getLastPaymentByBookingId(bookingId)
        if (!payment) {
            return { success: false, result: "Ошибка получения информации о платеже." };
        }

        const YOOKASSA_BASIC_AUTH = process.env.YOOKASSA_BASIC_AUTH
        if (!YOOKASSA_BASIC_AUTH) {
            logger.log({
                level: "error",
                message: `[checkPaymentAction] check payment error: yookassa credential not found`,
            });
            return { success: false, result: "Ошибка создания платежа." }
        }
        const response = await axios({
            method: "get",
            url: "https://api.yookassa.ru/v3/payments/" + payment.paymentId,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Basic " + encode(YOOKASSA_BASIC_AUTH),
                "Idempotence-Key": uuidv4()
            }
        }).then((response) => {
            const respData = response.data
            const updatePaymentInfo = {
                status: respData.status,
                amount: respData.income_amount.value,
                currency: respData.income_amount.currency,
                description: respData.description,
                paid: respData.paid
            }
            const res = updatePaymentById(payment.id, updatePaymentInfo)
            if (!res) {
                return { success: false, result: "Ошибка обновления платежа." };
            }
            return { success: true, result: null }
        }).catch((error) => {
            logger.log({
                level: "error",
                message: `[checkPaymentAction] check payment error: ${ JSON.stringify(error) }`,
            });
            return { success: false, result: "Ошибка проверки платежа." }
        })
        if (!response.success) {
            return { success: false, result: "Ошибка проверки платежа." }
        }
        const resUpdBooking = updateBookingById(bookingId, {status: BookingStatus.PAID})
        if (!resUpdBooking) {
            logger.log({
                level: "error",
                message: `[checkPaymentAction] update booking error`,
            });
            return { success: false, result: "Ошибка обновления статуса бронирования." }
        }
        return { success: true, result: null }
    } catch (error) {
        logger.log({
            level: "error",
            message: `[checkPaymentAction] error: ${ error }`,
        });
        return { success: false, result: "Ошибка проверки платежа." };
    }
}