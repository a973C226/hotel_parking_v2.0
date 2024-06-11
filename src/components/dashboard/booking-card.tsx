import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { bookingSchema } from "@/lib/validations/bookingSchema"
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,  
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Parking, Transport } from "@prisma/client";
import { useParking } from "@/hooks/use-parkings";
import { useDashboardContext } from "@/app/(protected)/dashboard/layout";
import { AddButton } from "../transport/add-button";

export const BookingCard = () => {
    const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition()
	const [isLoading, setLoading] = useState<boolean>(false)
    const [parkings, userTransport] = useDashboardContext()
	const router = useRouter()

	const form = useForm<z.infer<typeof bookingSchema>>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			bookingStart: "",
			bookingEnd: "",
            transportId: "",
            parkingId: "",
		},
	});

	const onSubmit = (values: z.infer<typeof bookingSchema>) => {
		setError("");
		setSuccess("");
		setLoading(true);

		startTransition(() => {
			axiosInstance({
				method: "POST",
				url: "/api/booking/create",
				headers: {
					"Content-Type": "application/json"
				},
				data: values
			}).then(function (response: AxiosResponse<any, any>) {
				setSuccess(response.data.message)
                router.push(response.data.data)
			}).catch((error) => {
				setLoading(false);
				setError(error.response.data.message)
			})
		});
	};

    return (
        <CardWrapper
            headerLabel="Забронируйте место"
            backButtonLabel={null}
            backButtonHref={null}
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <div className="flex justify-between space-x-4">
                            <FormField
                                control={form.control}
                                name="bookingStart"
                                render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="datetime-local"
                                            disabled={isPending}
                                            placeholder="bookingStart"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div> - </div>
                            <FormField
                                control={form.control}
                                name="bookingEnd"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                        <Input
                                            {...field}
                                            type="datetime-local"
                                            disabled={isPending}
                                            placeholder="bookingEnd"
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="transportId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Транспорт</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Выберите транспорт" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {userTransport && userTransport.map((transport: Transport) => (
                                                    <SelectItem key={transport.id} value={transport.id}>
                                                        {transport.brand}
                                                    </SelectItem>
                                                ))}
                                                <AddButton asChild>
                                                    <Button className="m-2" size="sm" >
                                                        Добавить транспорт
                                                    </Button>
                                                </AddButton>
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
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Выберите парковку" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {parkings && parkings.map((parking: Parking) => (
                                                    <SelectItem key={parking.id} value={parking.id}>
                                                        {parking.parkingName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="w-full flex space-x-2"
                    >
                        {isLoading && (<Spinner aria-label="Alternate spinner button example" size="sm" />)}
                        <p>{isLoading ? "Загрузка..." : "Проверить"}</p>
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}