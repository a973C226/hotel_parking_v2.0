"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { confirmEmailSchema } from "@/lib/validations/confirmEmailSchema";
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
import { useCookies } from 'react-cookie'
import { AxiosResponse } from "axios";
import { Spinner } from "flowbite-react";

export const ConfirmEmailForm = () => {

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const [isLoading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof confirmEmailSchema>>({
		resolver: zodResolver(confirmEmailSchema),
		defaultValues: {
			code: "",
		},
	});

	const onSubmit = (values: z.infer<typeof confirmEmailSchema>) => {
        setError("")
        setSuccess("")
		setLoading(true)

        startTransition(() => {
            axiosInstance({
                method: "POST",
                url: "/api/auth/confirm-email",
                headers: {
                    "Content-Type": "application/json"
                },
                data: values
            }).then(function (response: AxiosResponse<any, any>) {
                setSuccess(response.data.message)
                router.push("/auth/sign-in")
            }).catch((error) => {
				setLoading(false)
                setError(error.response.data.message)
            })
        })
	}

	return (
		<CardWrapper
			headerLabel="Подтвердите почту"
			backButtonLabel="Не пришло письмо?"
			backButtonHref="/auth/register"
		>
			<Form {...form}>
				<form 
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						<FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Код из письма</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="DN19A6"
                                        />
                                    </FormControl>
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
						className="w-full"
					>
						{isLoading && (<Spinner aria-label="Alternate spinner button example" size="sm" />)}
						<p>{isLoading ? "Загрузка..." : "Подтвердить"}</p>
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
