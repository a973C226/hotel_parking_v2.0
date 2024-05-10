"use client";

import axiosInstance from "@/lib/axios"
import { NextRequest, NextResponse } from "next/server";
import { useCookies } from "react-cookie";
import { cookies } from 'next/headers'
import { getCookieByName, hasCookie } from "@/lib/utils/cookies";
import { SignUpStepper } from "./SignUpStepper";
import { FormEvent, useState } from "react";
import { SignUpAccountForm } from "./SignUpAccountForm";
import { Button, Carousel, Checkbox, DarkThemeToggle, Datepicker, Flowbite, Label, Select } from "flowbite-react";
import { SignInPartForm } from "./SignInPartForm";
import { SignUpPersonalForm } from "./SignUpPersonalForm";
import { HiOutlineArrowRight } from "react-icons/hi";
import { ConfirmEmailForm } from "./ConfirmEmailForm";
import { AxiosResponse } from "axios";

type UserInfo = {
    username: FormDataEntryValue | null;
    phoneNumber: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
    name: FormDataEntryValue | null;
    lastname: FormDataEntryValue | null;
    middlename: FormDataEntryValue | null;
    gender: FormDataEntryValue | null;
    birthdate: FormDataEntryValue | null;
}

export default function SignUpComponent() {
    const [step, setStep] = useState(0);

    const upStep = () => {
        setStep(step + 1)
    }
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        axiosInstance({
            method: "POST",
            url: "/api/auth/sign-up",
            headers: {
                "Content-Type": "application/json"
            },
            data: formData
        }).then(function (response: AxiosResponse<any, any>) {

            console.log("response");
            
        });
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
                                    <form className="space-y-4 md:space-y-6 w-full" onSubmit={onSubmit}>
                                        <div className={step==1 ? "flex flex-row gap-2 mt-6": "hidden"}>
                                            <div>
                                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" ></input>
                                            </div>
                                            <div>
                                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Номер телефона</label>
                                                <input type="text" name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="79225059146" ></input>
                                            </div>
                                        </div>
                                        <div className={step==1 ? "": "hidden"}>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@me.ru" ></input>
                                        </div>
                                        <div className={step==1 ? "": "hidden"}>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                            <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" ></input>
                                        </div>
                                        <div className={step==1 ? "": "hidden"}>
                                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Подтверждение пароля</label>
                                            <input type="password" name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" ></input>
                                        </div>

                                        <div className={step==2 ? "mt-0 pt-0": "hidden"}>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя</label>
                                            <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Антон" ></input>
                                        </div>
                                        <div className={step==2 ? "": "hidden"}>
                                            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Фамилия</label>
                                            <input type="lastname" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Королёв" ></input>
                                        </div>
                                        <div className={step==2 ? "": "hidden"}>
                                            <label htmlFor="middlename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Отчество</label>
                                            <input type="middlename" name="middlename" id="middlename" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Сергеевич" ></input>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Checkbox id="withoutMiddlename" />
                                                <Label htmlFor="withoutMiddlename" className="flex">
                                                    У меня нет отчества&nbsp;
                                                </Label>
                                            </div>
                                        </div>
                                        <div className={step==2 ? "flex flex-row gap-2": "hidden"}>
                                            <div className="flex flex-col w-1/2">
                                                <label htmlFor="middlename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пол</label>
                                                <Select id="gender" className="">
                                                    <option value="female">Женский</option>
                                                    <option value="male">Мужской</option>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата рождения</label>
                                                <Datepicker id="birthdate" language="ru-RU" labelTodayButton="Сегодня" labelClearButton="Очистить"/>
                                            </div>
                                        </div>

                                        {step==2 ? (
                                            <div className="flex flex-col gap-2 items-center">
                                                <Button type="submit" color="blue" className="w-full mx-auto" >
                                                    Завершить
                                                    <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                                                </Button>
                                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                    Уже есть аккаунт? <a href="/auth/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Войти</a>
                                                </p>
                                            </div>
                                        ): ("")}
                                    </form>
                                    {step!=2 ? (
                                            <div className="flex flex-col gap-2 items-center">
                                                <Button type={step==2 ? "submit" : "button"} onClick={upStep} color="blue" className="w-full mx-auto" >
                                                    Далее
                                                    <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                                                </Button>
                                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                    Уже есть аккаунт? <a href="/auth/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Войти</a>
                                                </p>
                                            </div>
                                        ): ("")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Flowbite>
    );
}