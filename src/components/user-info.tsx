import * as z from "zod";
import { 
  Card, 
  CardContent, 
  CardHeader
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { personalInfoSchema } from "@/lib/validations/personalInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { isDataView } from "util/types";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Spinner } from "flowbite-react";
import { parseDateToString } from "@/lib/utils/date";

interface UserInfoProps {
  user?: any;
};

const genderTranslate = new Map([
	["male", "Мужской"],
	["female", "Женский"]
])

export const UserInfo = ({
	user,
}: UserInfoProps) => {
    const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition()
	const [isLoading, setLoading] = useState<boolean>(false);
	const router = useRouter()
	const [isDisabled, setDisabled] = useState(true)
	const parsedBirthdate = parseDateToString(user?.birthdate)

    const form = useForm<z.infer<typeof personalInfoSchema>>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			username: user?.username,
			lastname: user?.lastname,
            name: user?.name,
            middlename: user?.middlename,
			birthdate: parsedBirthdate,
            gender: user?.gender,
			phoneNumber: user?.phoneNumber
		},
	});
    const onSubmit = (values: z.infer<typeof personalInfoSchema>) => {
		console.log(values)
		setError("");
		setSuccess("");
		setLoading(true);

		startTransition(async () => {
			
			await axiosInstance({
				method: "PUT",
				url: "/api/auth/personal-info",
				headers: {
					"Content-Type": "application/json"
				},
				data: values
			}).then(function (response: AxiosResponse<any, any>) {
				setSuccess(response.data.message)
				window.location.reload()
			}).catch((error) => {
				setLoading(false);
				setError(error.response.data.message)
			})

		});
	};
  	return (
		<div>
			<Form {...form}>
				<form 
					id="personal-info"
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="flex flex-col items-center">
						<div className="flex flex-col lg:flex-row gap-2 lg:gap-4 p-5">
							<div className="flex flex-col gap-2 sm:min-w-[24rem] min-w-[18rem]">
								<FormField
									control={form.control}
									name="lastname"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Фамилия</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isDisabled}
													placeholder="Фамилия"
													type="text"
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
													disabled={isDisabled}
													placeholder="Имя"
													type="text"
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
													disabled={isDisabled}
													placeholder="Отчество"
													type="text"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex flex-col gap-2 sm:min-w-[24rem] min-w-[18rem]">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isDisabled}
													placeholder="Username"
													type="text"
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
													disabled={isDisabled}
													placeholder="Номер телефона"
													type="text"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex justify-between space-x-2">
									<FormField
										control={form.control}
										name="birthdate"
										render={({ field }) => (
											<FormItem className="w-1/2">
												<FormLabel>Дата рождения</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={isDisabled}
														placeholder="ДД.ММ.ГГГГ"
														type="text"
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
											<FormItem className="w-1/2">
												<FormLabel>Пол</FormLabel>
												<Select
													disabled={isDisabled}
													onValueChange={field.onChange}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder={genderTranslate.get(user?.gender)} />
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
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						{isLoading &&
							<div className="flex w-full h-full items-center justify-center mt-2">
								<div className="text-center">
									Загрузка... <Spinner aria-label="Center-aligned spinner example" size="md" />
								</div>
							</div>
						}
						{!isDisabled && !isLoading &&
							<div className="flex w-full justify-center gap-4 mt-4">
								<Button type="submit" className="bg-gray-900">Сохранить изменения</Button>
								<Button type="button" onClick={() => window.location.reload()} className="bg-gray-900">Отменить</Button>
							</div>
						}
					</div>
				</form>
				{isDisabled && 
					<div className="flex w-full justify-center mt-4">
						<Button onClick={(e) => {setDisabled(false)}} className="bg-gray-900">Редактировать профиль</Button>
					</div>
				}
			</Form>
		</div>
  	)
}