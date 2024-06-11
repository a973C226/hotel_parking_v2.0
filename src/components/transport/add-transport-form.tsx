"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { transportInfoSchema } from "@/lib/validations/transportInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { CardWrapper } from "../auth/card-wrapper";
import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Spinner } from "flowbite-react";
import { DialogClose } from "../ui/dialog";
import { Transport } from "@prisma/client";
import { useRouter } from "next/navigation";


export const AddTransportForm = () => {
    const [isDisabled, setDisabled] = useState(false)
    const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition()
    const [isCanceled, setIsCanceled] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof transportInfoSchema>>({
		resolver: zodResolver(transportInfoSchema),
		defaultValues: {
			brand: "",
			model: "",
            color: "",
            licensePlate: ""
		},
	});
    const onSubmit = (values: z.infer<typeof transportInfoSchema>) => {
        setDisabled(() => {return true})
		setError("");
		setSuccess("");
		setLoading(() => {return true});

		startTransition(async () => {
			
			await axiosInstance({
				method: "POST",
				url: "/api/transport",
				headers: {
					"Content-Type": "application/json"
				},
				data: values
			}).then(function (response: AxiosResponse<any, any>) {
				setSuccess(response.data.message)
				setLoading(() => {return false});
                window.location.reload()
			}).catch((error) => {
				setLoading(() => {return false});
				setError(error.response.data.message)
			})
		});
    }
    return (
        <CardWrapper
            headerLabel="Добавить транспорт"
        >
            <Form {...form}>
                <form 
                    id="personal-info"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=""
                >
                    <div className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Бренд</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isDisabled}
                                            placeholder="Бренд" 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Модель</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isDisabled}
                                            placeholder="Модель"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Цвет</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isDisabled}
                                            placeholder="Цвет"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="licensePlate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Регистрационный знак</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isDisabled}
                                            placeholder="Регистрационный знак"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-4">
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </div>
                    <div className="flex w-full gap-4 mt-4">
                        <Button type="submit" variant="default">
                            <div>Добавить</div> {isLoading && <Spinner className="ml-4" aria-label="Center-aligned spinner" size="md" />}
                        </Button>
                        <DialogClose>
                            <Button type="button" variant="destructive">Отменить</Button>
                        </DialogClose>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    )
}