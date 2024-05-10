"use client";

import axiosInstance from "@/lib/axios"
import { FormEvent, useState } from "react";
import { Button, Carousel, Checkbox, Datepicker, Flowbite, Label, Select } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { AxiosResponse } from "axios";
import { logger } from "@/lib/logger";
import { dateParse } from "@/lib/utils/date"

export default function SignUpComponent() {
    const [isEmpty, setEmpty] = useState<string[]>([]);
    const [isPending, setPending] = useState<boolean>(false);
    const [isUnique, setUnique] = useState<string[]>([]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        setEmpty([]);
        setPending(true);
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries(formData.entries());
        const emptyFields = [];
        const comparePassword = formJson.password === formJson.confirmPassword;
        if (!comparePassword) {
            console.log("Passwords do not match");
            emptyFields.push("confirmPassword");
        }
        if (!formJson.email) {
            console.log("Email is empty");
            emptyFields.push("email");
        }
        if (!formJson.username) {
            console.log("username is empty");
            emptyFields.push("username");
        }
        if (!formJson.phoneNumber) {
            console.log("phoneNumber is empty");
            emptyFields.push("phoneNumber");
        }
        if (emptyFields) {
            setEmpty(emptyFields);
        }
        

        
        // const birthdate = new Date(dateParse(formData.get("birthdate") as string))
        // formJson.birthdate = birthdate.toISOString()
        console.log(formJson);
        axiosInstance({
            method: "POST",
            url: "/api/auth/sign-up",
            headers: {
                "Content-Type": "application/json"
            },
            data: formJson
        }).then(function (response: AxiosResponse<any, any>) {
            setPending(false);
            return (
                <h1>Проверьте почту</h1>
            )
            
        }).catch((error) => {
            setPending(false);
            if (error.response.data.message === "ошибка регистрации") {
                const isUniqueFields = []
                if (error.response.data.details.email === false) {
                    isUniqueFields.push("email");
                }
                if (error.response.data.details.username === false) {
                    isUniqueFields.push("username");
                }
                setUnique(isUniqueFields);
            }
            console.log(error.response.data.details);
        })
        
    }
    
    return (
        <Flowbite>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center p-6  sm:p-8 w-full ">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Создайте аккаунт
                                </h1>
                                <div className="flex flex-col gap-10 w-full">
                                    <form className="space-y-2 md:space-y-4 w-full" onSubmit={onSubmit}>
                                        <div className="flex flex-row gap-2 mt-6">
                                            <div>
                                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" ></input>
                                                <p className={"mt-2 text-sm text-red-600 dark:text-red-500" + (isEmpty.includes("username") ? "" : " hidden")}>Это обязательное поле.</p>
                                                <p className={"mt-2 text-sm text-red-600 dark:text-red-500" + (isUnique.includes("username") ? "" : " hidden")}>Данный username уже используется.</p>
                                            </div>
                                            <div>
                                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Номер телефона</label>
                                                <input type="text" name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="79225059146" ></input>
                                                <p className={"mt-2 text-sm text-red-600 dark:text-red-500" + (isEmpty.includes("phoneNumber") ? "" : " hidden")}>Это обязательное поле.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@me.ru" ></input>
                                            <p className={"mt-2 text-sm text-red-600 dark:text-red-500" + (isEmpty.includes("email") ? "" : " hidden")}>Это обязательное поле.</p>
                                            <p className={"mt-2 text-sm text-red-600 dark:text-red-500" + (isUnique.includes("email") ? "" : " hidden")}>Данный email уже используется.</p>
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                            <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Подтверждение пароля</label>
                                            <input type="password" name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" ></input>
                                            <p className={"mt-2 text-sm text-red-600 dark:text-red-500" + (isEmpty.includes("confirmPassword") ? "" : " hidden")}>Пароли должны совпадать.</p>
                                        </div>

                                        {/* <div className="mt-0 pt-0">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя</label>
                                            <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Антон" ></input>
                                        </div>
                                        <div className="">
                                            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Фамилия</label>
                                            <input type="lastname" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Королёв" ></input>
                                        </div>
                                        <div className="">
                                            <label htmlFor="middlename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Отчество</label>
                                            <input type="middlename" name="middlename" id="middlename" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Сергеевич" ></input>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пол</label>
                                                <Select name="gender" id="gender">
                                                    <option value="">Выберите</option>
                                                    <option value="female">Женский</option>
                                                    <option value="male">Мужской</option>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата рождения</label>
                                                <Datepicker name="birthdate" id="birthdate" language="ru-RU" labelTodayButton="Сегодня" labelClearButton="Очистить"/>
                                            </div>
                                        </div> */}
                                        <div className="flex flex-col gap-2 items-center">
                                            <Button type="submit" color="blue" className="w-full mx-auto" >
                                                {isPending ? "Загрузка..." : "Завершить"}
                                            </Button>
                                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                Уже есть аккаунт? <a href="/auth/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Войти</a>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Flowbite>
    );
}