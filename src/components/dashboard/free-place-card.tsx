import * as z from "zod";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { freePlaceSchema } from "@/lib/validations/freePlaceSchema"
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
import { Spinner } from "flowbite-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useDashboardContext } from "@/app/(protected)/dashboard/layout";
import { Parking } from "@prisma/client";


interface FreePlaceCardProps {
    datetimeFrom: [string, Dispatch<SetStateAction<string>>],
    datetimeTo: [string, Dispatch<SetStateAction<string>>],
    parking: [string, Dispatch<SetStateAction<string>>]
}

export const FreePlaceCard = (props: FreePlaceCardProps) => {
    const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition()
	const [isLoading, setLoading] = useState<boolean>(false);
    const [freePlaces, setFreePlaces] = useState<number | null>(null);
    const [parkings, _] = useDashboardContext()

	const form = useForm<z.infer<typeof freePlaceSchema>>({
		resolver: zodResolver(freePlaceSchema),
		defaultValues: {
			datetimeFrom: "",
			datetimeTo: "",
            parkingId: ""
		},
	});

	const onSubmit = (values: z.infer<typeof freePlaceSchema>) => {
		setError("");
		setSuccess("");
		setLoading(true);
        setFreePlaces(() => {return null})

		startTransition(() => {
			axiosInstance({
				method: "POST",
				url: "/api/booking/free-places",
				headers: {
					"Content-Type": "application/json"
				},
				data: values
			}).then(function (response: AxiosResponse<any, any>) {
                setLoading(false)
                setFreePlaces(() => {return response.data.data})
			}).catch((error) => {
				setLoading(false)
				setError(error.response.data.message)
			})
		});
	};

    return (
        <CardWrapper
            headerLabel="Проверьте свободные места"
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:gap-4 justify-between">
                            <FormField
                                control={form.control}
                                name="datetimeFrom"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Начало</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="datetime-local"
                                            disabled={isPending}
                                            placeholder="datetimeFrom"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="datetimeTo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Окончание</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="datetime-local"
                                                disabled={isPending}
                                                placeholder="datetimeTo"
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
                        {freePlaces != null &&
                            <div className="flex flex-col gap-4">
                                <FormLabel>Свободные места</FormLabel>
                                <Input
                                    disabled={true}
                                    placeholder="Свободные места"
                                    value={freePlaces}
                                    className={freePlaces != 0 ? 
                                        "border-solid border-2 border-emerald-400"
                                        :
                                        "border-solid border-2 border-rose-500"}
                                />
                            </div>
                        }
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