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

interface BookingHistoryCardProps {
    booking: any;
    setBooking: (value: SetStateAction<Booking[] | null>) => void;
}

export default function BookingHistoryCard({booking, setBooking}: BookingHistoryCardProps) {
    const [isDisabled, setDisabled] = useState(true)
    const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition()
    const [isCanceled, setIsCanceled] = useState(false)
    
    const [bookingStartDate, bookingStartTime] = new Date(booking.bookingStart).toLocaleString().split(", ")
    const parsedBookingStart = `${bookingStartDate} ${bookingStartTime.substring(0, 5)}`

    const [bookingEndDate, bookingEndTime] = new Date(booking.bookingEnd).toLocaleString().split(", ")
    const parsedBookingEnd = `${bookingEndDate} ${bookingEndTime.substring(0, 5)}`
    
    const form = useForm<z.infer<typeof bookingSchema>>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			bookingStart: parsedBookingStart,
			bookingEnd: parsedBookingEnd,
            transportId: booking?.transport.brand,
            parkingId: booking?.parking.id,
		},
	});
    
    const onSubmit = (values: z.infer<typeof bookingSchema>) => {
        setDisabled(() => {return true})
		setError("");
		setSuccess("");
		setLoading(() => {return true});

		startTransition(async () => {
			
			await axiosInstance({
				method: "POST",
				url: "/api/booking/update",
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (response: AxiosResponse<any, any>) {
				setSuccess(response.data.message)
				setLoading(() => {return false});
			}).catch((error) => {
				setLoading(() => {return false});
				setError(error.response.data.message)
			})

		});
	};
    return (
        <div className="">
            <Accordion className="" collapseAll>
                <Accordion.Panel>
                    <Accordion.Title className="max-h-14">
                        <div className="flex gap-4">
                            <div className="text-sm sm:text-base">
                                {booking.parking.parkingName}
                            </div>
                            <div className="mx-2 flex gap-4">
                                <div className="text-sm sm:text-base hidden sm:block">
                                    {parsedBookingStart}
                                </div>
                                <div className="text-sm sm:text-base hidden md:block">
                                    -
                                </div>
                                <div className="text-sm sm:text-base hidden md:block">
                                    {parsedBookingEnd}
                                </div>
                            </div>
                            <div className="text-sm sm:text-base">
                                {booking.status}
                            </div>
                        </div>
                    </Accordion.Title>
                    <Accordion.Content>
                        <Form {...form}>
                            <form 
                                onSubmit={form.handleSubmit(onSubmit)}
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
                                {/* <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full flex space-x-2"
                                >
                                    {isLoading && (<Spinner aria-label="Alternate spinner button example" size="sm" />)}
                                    <p>{isLoading ? "Загрузка..." : "Проверить"}</p>
                                </Button> */}
                            </form>
                        </Form>
                        {/* {isDisabled && 
                            <div className="flex w-full gap-4 mt-4">
                                <Button onClick={() => {setDisabled(() => {return false})}}>Редактировать</Button>
                                <DeleteButton id={transport.id} setError={setError} setSuccess={setSuccess} setLoading={setLoading} setTransport={setTransport}/>
                            </div>
                        } */}
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    )
}
