"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/validations/signUpSchema"
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Switch } from "../ui/switch";

export const SignUpForm = () => {
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition()
	const [isLoading, setLoading] = useState<boolean>(false);
	const router = useRouter()

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			personalDataSwitch: false
		},
	});

	const onSubmit = (values: z.infer<typeof signUpSchema>) => {
		setError("");
		setSuccess("");
		setLoading(true);

		startTransition(() => {
			axiosInstance({
				method: "POST",
				url: "/api/auth/sign-up",
				headers: {
					"Content-Type": "application/json"
				},
				data: values
			}).then(function (response: AxiosResponse<any, any>) {
				setSuccess(response.data.message)
				router.push(`/auth/confirm-email?email=${response.data.data.email}`)
			}).catch((error) => {
				setLoading(false);
				setError(error.response)
			})

		});
	};

	return (
		<CardWrapper
			headerLabel="Регистрация"
			backButtonLabel="Уже есть аккаунт?"
			backButtonHref="/auth/sign-in"
		>
			<Form {...form}>
				<form 
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
								<Input
									{...field}
									disabled={isPending}
									placeholder="john.doe@example.com"
									type="email"
								/>
								</FormControl>
								<FormMessage />
							</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
								<Input
									{...field}
									disabled={isPending}
									placeholder="******"
									type="password"
								/>
								</FormControl>
								<FormMessage />
							</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
							<FormItem>
								<FormLabel>Повторите пароль</FormLabel>
								<FormControl>
								<Input
									{...field}
									disabled={isPending}
									placeholder="******"
									type="password"
								/>
								</FormControl>
								<FormMessage />
							</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="personalDataSwitch"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
								<div className="space-y-0.5">
									<FormLabel>Обработка персональных данных</FormLabel>
									<FormDescription>
										Я даю согласие на обработку моих персональных данных
									</FormDescription>
								</div>
								<FormControl>
									<Switch
										disabled={isPending}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						disabled={isLoading}
						type="submit"
						className="w-full flex space-x-2"
					>
						{isLoading && (<Spinner aria-label="Alternate spinner button example" size="sm" />)}
						<p>{isLoading ? "Загрузка..." : "Создать аккаунт"}</p>
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

