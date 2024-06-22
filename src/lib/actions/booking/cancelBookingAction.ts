import { logger } from "@/lib/logger";
import { getBookingWhere, updateBookingById } from "@/lib/repositories/booking";
import { getLastPaymentWhere, updatePaymentById } from "@/lib/repositories/payment";
import axios from "axios";
import { encode } from 'js-base64';
import { v4 as uuidv4 } from 'uuid';

interface cancelBookingActionParams {
    bookingId: string;
    userId: string;
}

export const cancelBookingAction = async (params: cancelBookingActionParams): Promise<{
    success: boolean;
    result: any;
}> => {
    try {
        const findBooking = await getBookingWhere(
            {
                AND: [
                    {
                        id: params.bookingId,
                        userId: params.userId
                    },
                    {
                        NOT: {
                            OR: [
                                {
                                    status: "CANCELED" 
                                },
                                {
                                    status: "ARCHIVED"
                                }
                            ]
                        }
                    }
                ]
            }
        )
        if (findBooking.length === 0) {
            return { success: false, result: "Ошибка отмены брони. Не удалось получить информацию о брони." }
        }

        const findPaymentByBooking = await getLastPaymentWhere({
            bookingId: params.bookingId,
            status: "succeeded"
        })
        console.log(findPaymentByBooking)
        if (!findPaymentByBooking || findPaymentByBooking.length === 0) {
            return { success: false, result: "Ошибка отмены брони. Не удалось получить информацию о платеже." }
        }

        const yookassaBody = {
            amount: {
                value: findPaymentByBooking[0].amount,
                currency: findPaymentByBooking[0].currency
            },
            payment_id: findPaymentByBooking[0].paymentId
        }

        const YOOKASSA_BASIC_AUTH = process.env.YOOKASSA_BASIC_AUTH
        if (!YOOKASSA_BASIC_AUTH) {
            logger.log({
                level: "error",
                message: `[cancelBookingAction] refund payment error: yookassa credential not found`,
            });
            return { success: false, result: "Ошибка возврата платежа." }
        }
        const response = await axios({
            method: "post",
            url: "https://api.yookassa.ru/v3/refunds",
            data: JSON.stringify(yookassaBody),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Basic " + encode(YOOKASSA_BASIC_AUTH),
                "Idempotence-Key": uuidv4()
            }
        }).then((response) => {
            const respData = response.data
            if (respData.status != "succeeded") {
                return { success: false, result: "Ошибка возврата платежа. Отказано в возврате платежа." }
            }
            const res = updatePaymentById(findPaymentByBooking[0].id, {status: "refunded"})
            if (!res) {
                return { success: false, result: "Ошибка обновления платежа." };
            }
            return { success: true, result: "Бронь отменена, денежные средства вернутся в течение 3 рабочих дней." }
        }).catch((error) => {
            logger.log({
                level: "error",
                message: `[cancelBookingAction] refund payment error: ${ JSON.stringify(error.response.data) }`,
            });
            return { success: false, result: "Ошибка возврата платежа." };
        })

        if (!response.success) {
            return { success: false, result: response.result }
        }

        const updatedBooking = await updateBookingById(params.bookingId, {status: "CANCELED"})
        if (!updatedBooking) {
            return { success: false, result: "Ошибка отмены брони. Не удалось изменить статус брони." }
        }

        return { success: true, result: response.result }
    } catch (err) {
        logger.log({
            level: "error",
            message: `[cancelBookingAction] error: ${ err }`,
        });
        return { success: false, result: "Ошибка отмены брони." };
    }
}