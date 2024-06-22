import * as z from "zod";
import { FaTruckMonster } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card } from "./ui/card"
import { Accordion, AccordionPanelProps, Spinner } from "flowbite-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { transportInfoSchema } from "@/lib/validations/transportInfoSchema";
import { FC, useState, SetStateAction, useTransition } from "react";
import { Button } from "./ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";
import { DeleteButton } from "./transport/delete-button";
import { Booking, Parking, Transport } from "@prisma/client";
import { bookingSchema } from "@/lib/validations/bookingSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DeleteBookingButton } from "./delete-booking-button";
import { useRouter } from "next/navigation";

interface BookingHistoryCardProps {
    booking: any;
}

const bookingStatusText = new Map([
    ["CREATED","СОЗДАНО"],
    ["PAID", "ОПЛАЧЕНО"],
    ["CANCELED", "ОТМЕНЕНО"]
])

const bookingStatusColor = new Map([
    ["CREATED","text-yellow-400"],
    ["PAID", "text-lime-500"],
    ["CANCELED", "text-rose-600"]
])

export default function BookingHistoryCard({booking}: BookingHistoryCardProps) {
    const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    
    const [bookingStartDate, bookingStartTime] = new Date(booking.bookingStart).toLocaleString().split(", ")
    const parsedBookingStart = `${bookingStartDate} ${bookingStartTime.substring(0, 5)}`

    const [bookingEndDate, bookingEndTime] = new Date(booking.bookingEnd).toLocaleString().split(", ")
    const parsedBookingEnd = `${bookingEndDate} ${bookingEndTime.substring(0, 5)}`
    
    const checkPayment = () => {
        startTransition(async () => {
            await axiosInstance({
				method: "POST",
				url: "/api/payment/checkout",
				headers: {
					"Content-Type": "application/json"
				},
				data: { bookingId: booking.id }
			}).then(function (response: AxiosResponse<any, any>) {
				setSuccess(() => {return response.data.message})
                if (response.data.message === "Совершите платеж.") {
                    router.replace(response.data.data.confirmUrl)
                    return
                }
				window.location.reload()
			}).catch((error) => {
                console.log(error)
				if (error.response) {
                    setError(error.response.data.message)
                    return
                }
                setError("Ошибка.")
			})
        })
    }

    const form = useForm<z.infer<typeof bookingSchema>>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			bookingStart: parsedBookingStart,
			bookingEnd: parsedBookingEnd,
            transportId: booking?.transport.brand,
            parkingId: booking?.parking.id,
		},
	});
    return (
        <div className="">
            <Accordion className="" collapseAll>
                <Accordion.Panel>
                    <Accordion.Title className="max-h-14">
                        <div className="flex gap-4">
                            <div className="text-sm sm:text-base truncate">
                                {booking.parking.parkingName}
                            </div>
                            <div className="mx-2 flex gap-4">
                                <div className="text-sm sm:text-base hidden sm:block truncate">
                                    {parsedBookingStart}
                                </div>
                                <div className="text-sm sm:text-base hidden md:block">
                                    -
                                </div>
                                <div className="text-sm sm:text-base hidden md:block truncate">
                                    {parsedBookingEnd}
                                </div>
                            </div>
                            <div className={"text-sm sm:text-base " + bookingStatusColor.get(booking.status)}>
                                {bookingStatusText.get(booking.status)}
                            </div>
                        </div>
                    </Accordion.Title>
                    <Accordion.Content>
                        <Form {...form}>
                            <form 
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="transportId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Транспорт</FormLabel>
                                                    <Select
                                                        disabled={true}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={booking.transport.brand} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem key={booking.transport.id} value={booking.transport.id}>
                                                                {booking.transport.brand}
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="parkingId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Парковка</FormLabel>
                                                    <Select
                                                        disabled={true}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={booking.parking.parkingName} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem key={booking.parking.id} value={booking.parking.id}>
                                                                {booking.parking.parkingName}
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                                        <FormField
                                            control={form.control}
                                            name="bookingStart"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Начало</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={true}
                                                        defaultValue={parsedBookingStart}
                                                        placeholder="bookingStart"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="bookingEnd"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Окончание</FormLabel>
                                                    <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={true}
                                                        defaultValue={parsedBookingEnd}
                                                        placeholder="bookingEnd"
                                                    />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <FormError message={error} />
                                <FormSuccess message={success} />
                            </form>
                        </Form>
                        <div className="flex w-full gap-4 mt-4">
                            {booking.status==="CREATED" && <Button onClick={checkPayment} disabled={isPending} variant="secondary" className="bg-lime-500 hover:bg-lime-500/50">Проверить платеж</Button>}
                            {booking.status != "CANCELED" && booking.status != "ARCHIVED" && (
                                <DeleteBookingButton id={booking.id} setError={setError} setSuccess={setSuccess}>
                                    <Button variant="destructive">
                                        Отменить бронь
                                    </Button>
                                </DeleteBookingButton>
                            )}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    )
}
