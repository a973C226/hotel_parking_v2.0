"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { signInSchema } from "@/lib/validations/signInSchema";
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

export const SignInForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const [isLoading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof signInSchema>) => {
	setError("")
	setSuccess("")
	setLoading(true)

	startTransition(() => {
		axiosInstance({
			method: "POST",
			url: "/api/auth/sign-in",
			headers: {
				"Content-Type": "application/json"
			},
			data: values
		}).then(function (response: AxiosResponse<any, any>) {
			if (response.status === 200) {
				const resData = response.data.data
				localStorage.setItem('access-token', resData["X-Auth-Token"]);
				localStorage.setItem('refresh-token', resData["X-Refresh-Token"]);
				setSuccess(response.data.message)
				if (resData["role"] === "ADMIN") {
					return router.push("/admin/dashboard")
				}
				if (resData["role"] === "BUSiNESS_USER") {
					return router.push("/business-user/dashboard")
				}
				if (!resData["isFirstLogin"]) {
					return router.push(callbackUrl || "/dashboard")
				}
				return router.push("/profile/personal-info")
			}
		}).catch((error) => {
			setLoading(false)
			setError(error.response.data.message)
		})
	})
	}

	return (
		<CardWrapper
			headerLabel="Авторизация"
			backButtonLabel="Ещё нет аккаунта?"
			backButtonHref="/auth/sign-up"
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
								<Button
									size="sm"
									variant="link"
									asChild
									className="px-0 font-normal"
								>
									<Link href="/auth/reset">
									Забыли пароль?
									</Link>
								</Button>
								<FormMessage />
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
						<p>{isLoading ? "Загрузка..." : "Войти"}</p>
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
