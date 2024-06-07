import * as z from "zod";
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from "react";
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
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface FreePlaceCardProps {
    hotel: [string, Dispatch<SetStateAction<string>>],
    parking: [string, Dispatch<SetStateAction<string>>]
}

export const FreePlaceCard = (props: FreePlaceCardProps) => {
    const [hotelState, setHotel] = props.hotel
	const [parkingState, setParking] = props.parking
    const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition()
	const [isLoading, setLoading] = useState<boolean>(false);
	const router = useRouter()

    
    
	const form = useForm<z.infer<typeof freePlaceSchema>>({
		
		defaultValues: {
			datetimeFrom: "",
			datetimeTo: "",
            parkingId: ""
		},
	});

    const onChange = (values: any) => {
        console.log(values.parkingId)
    }

	const onSubmit = (values: z.infer<typeof freePlaceSchema>) => {
		setError("");
		setSuccess("");
		setLoading(true);

		startTransition(() => {
			axiosInstance({
				method: "POST",
				url: "/api/auth/personal-info",
				headers: {
					"Content-Type": "application/json"
				},
				data: values
			}).then(function (response: AxiosResponse<any, any>) {
				setSuccess(response.data.message)
				router.push("/profile")
			}).catch((error) => {
				setLoading(false);
				setError(error.response.data.message)
			})
		});
	};

    return (
        <CardWrapper
            headerLabel="Свободные места"
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
                                name="datetimeFrom"
                                render={({ field }) => (
                                <FormItem>
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
                            <div> - </div>
                            <FormField
                                control={form.control}
                                name="datetimeTo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                        <Input
                                            {...field}
                                            type="datetime-local"
                                            disabled={isPending}
                                            placeholder="datetimeTo"
                                            onChange={(e: any) => {setParking(e.target.value)}}
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
                                                <SelectItem value="Парковка 1" onClick={(e: any) => {setParking(e.target.value)}}>
                                                    Парковка 1
                                                </SelectItem>
                                                <SelectItem value="female" onClick={(e: any) => {setParking(() => {return e.target.value})}}>
                                                    Парковка 2
                                                </SelectItem>
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