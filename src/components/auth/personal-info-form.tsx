"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { personalInfoSchema } from "@/lib/validations/personalInfoSchema"
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

export const PersonalInfoForm = () => {
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition()
	const [isLoading, setLoading] = useState<boolean>(false);
	const router = useRouter()

	const form = useForm<z.infer<typeof personalInfoSchema>>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			username: "",
			lastname: "",
            name: "",
            middlename: "",
			birthdate: "",
            gender: "",
			phoneNumber: ""
		},
	});

	const onSubmit = (values: z.infer<typeof personalInfoSchema>) => {
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
				router.push("/dashboard")
			}).catch((error) => {
				setLoading(false);
				setError(error.response.data.message)
			})

		});
	};

	return (
		<CardWrapper
			headerLabel="Заполните профиль"
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
                                name="username"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Username"
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Номер телефона</FormLabel>
                                        <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="89225059146"
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
							control={form.control}
							name="lastname"
							render={({ field }) => (
							<FormItem>
								<FormLabel>Фамилия</FormLabel>
								<FormControl>
								<Input
									{...field}
									disabled={isPending}
									placeholder="Королёв"
								/>
								</FormControl>
								<FormMessage />
							</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Антон"
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
							)}
						/>
                        <FormField
							control={form.control}
							name="middlename"
							render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Отчество</FormLabel>
                                    <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Сергеевич"
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
							)}
						/>
                        <div className="flex justify-between space-x-4">
                            <FormField
                                control={form.control}
                                name="birthdate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Дата рождения</FormLabel>
                                        <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="ДД.ММ.ГГГГ"
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Пол</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Выберите пол" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="male">
                                                    Мужской
                                                </SelectItem>
                                                <SelectItem value="female">
                                                    Женский
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
						<p>{isLoading ? "Загрузка..." : "Заполнить"}</p>
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

