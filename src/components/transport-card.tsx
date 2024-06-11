import * as z from "zod";
import { FaTruckMonster } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card } from "./ui/card"
import { Accordion, AccordionPanelProps } from "flowbite-react"
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
import { Transport } from "@prisma/client";

interface TransportCardProps {
    transport: Transport;
    setTransport: (value: SetStateAction<Transport[] | null>) => void;
}

export const TransportCard = ({transport, setTransport}: TransportCardProps) => {
    const [isDisabled, setDisabled] = useState(true)
    const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition()
    const [isCanceled, setIsCanceled] = useState(false)
    const form = useForm<z.infer<typeof transportInfoSchema>>({
		resolver: zodResolver(transportInfoSchema),
		defaultValues: {
			brand: transport?.brand ?? "",
			model: transport?.model ?? "",
            color: transport?.color ?? "",
            licensePlate: transport?.licensePlate
		},
	});
    const onSubmit = (values: z.infer<typeof transportInfoSchema>) => {
        setDisabled(() => {return true})
		setError("");
		setSuccess("");
		setLoading(() => {return true});

		startTransition(async () => {
			
			await axiosInstance({
				method: "PUT",
				url: "/api/transport",
				headers: {
					"Content-Type": "application/json"
				},
				data: {id: transport.id, data: values}
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
        <Accordion className="w-80 sm:w-[500px]" collapseAll>
            <Accordion.Panel>
                        <Accordion.Title className="max-h-14">
                            <div className="flex gap-6 items-center text-gray-900 font-semibold">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage />
                                    <AvatarFallback className="bg-sky-500">
                                        <FaTruckMonster className="text-white" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-sm sm:text-base">
                                    {transport?.brand}
                                </div>
                            </div>
                        </Accordion.Title>
                        <Accordion.Content>
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
                                                <FormItem className={isDisabled ? "hidden" : ""}>
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
                                    {!isDisabled && 
                                        <div className="flex w-full gap-4 mt-4">
                                            <Button type="submit" variant="default">Сохранить</Button>
                                            <Button type="button" onClick={() => {window.location.reload()}} variant="destructive">Отменить</Button>
                                        </div>
                                    }
                                </form>
                            </Form>
                            {isDisabled && 
                                <div className="flex w-full gap-4 mt-4">
                                    <Button onClick={() => {setDisabled(() => {return false})}}>Редактировать</Button>
                                    <DeleteButton id={transport.id} setError={setError} setSuccess={setSuccess} setLoading={setLoading} setTransport={setTransport}/>
                                </div>
                            }
                        </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    )
}