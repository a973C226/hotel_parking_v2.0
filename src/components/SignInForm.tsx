"use client"

import axios, { AxiosResponse } from "axios";
import { useCookies } from 'react-cookie'
import axiosInstance, { setHeaders } from "@/lib/axios"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Toast } from "flowbite-react/components/Toast";

export default function SignInForm() {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    const [isAlert, setAlert] = useState(false);
    
    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setAlert(false);
        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries(formData.entries());
        axiosInstance({
            method: "POST",
            url: "/api/auth/sign-in",
            headers: {
                "Content-Type": "application/json"
            },
            data: formJson
        }).then(function (response: AxiosResponse<any, any>) {
            let accessTokenExpires = new Date();
            accessTokenExpires.setTime(accessTokenExpires.getTime() + response.data.access_token_expires);

            let refreshTokenExpires = new Date();
            refreshTokenExpires.setTime(refreshTokenExpires.getTime() + response.data.refresh_token_expires);

            setCookie('access_token', response.data.access_token, { path: '/',  expires: accessTokenExpires});
            setCookie('refresh_token', response.data.refresh_token, {path: '/', expires: refreshTokenExpires});
            router.push("/");
        }).catch(() => {
            setAlert(true);
        });
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
                    Flowbite    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Войдите в свой аккаунт
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" ></input>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" ></input>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Запомнить</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Забыли пароль?</a>
                            </div>
                            <p className={"mt-2 text-sm text-red-600 dark:text-red-500" + (isAlert ? "" : " hidden")}>Неверный логин или пароль.</p>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Войти</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Ещё нет аккаунта? <a href="/auth/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Создайте аккаунт</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}