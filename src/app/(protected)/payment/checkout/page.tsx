"use client"

import { ErrorCard } from "@/components/auth/error-card"
import axiosInstance from "@/lib/axios"
import { Spinner } from "flowbite-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function PaymentCheckout() {
    const searchParams = useSearchParams()
    const [errorCheckout, setError] = useState<boolean>(false)
    const router = useRouter()
    axiosInstance({
        method: "POST",
        url: "/api/payment/checkout",
        headers: {
            "Content-Type": "application/json"
        },
        data: {bookingId : searchParams.get("booking_id")}
    }).then((response) => {
        router.push("/profile?state=3")
    }).catch((error) => {
        setError(() => {return true})
    })
    return (
        <>
        {!errorCheckout &&
            <div className="flex w-full h-full items-center justify-center">
                <div className="text-center">
                    Проверяем платеж... <Spinner aria-label="Center-aligned spinner example" size="lg" />
                </div>
            </div>
        }
        {errorCheckout &&
            <ErrorCard errMsg={"Ошибка проверки платежа! Обратитесь в техподдержку."}/>
        }
        </>
    )
}