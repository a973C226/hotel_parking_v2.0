"use client"
import { cn } from '@/lib/utils/cn';
import { Collapse } from 'flowbite';
import type { CollapseOptions, CollapseInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';

interface HelloNavProps {
    className?: string;
}

const HelloNav = ({className}: HelloNavProps) => {
    const [showMiniMenu, setShowMiniMenu] = useState<boolean>(false);
    

    return (
        <nav className={cn("w-full px-0 z-50", className)}>
            <div className="max-w-screen-3xl grid xl:grid-cols-3 grid-cols-2 items-center justify-between mx-4 p-4 rounded-lg">
                <a href="https://flowbite.com/" className="place-self-start flex items-center space-x-3 rtl:space-x-reverse bg-slate-300/80 md:bg-transparent px-4 py-1 rounded-lg">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mobile:h-8" alt="Flowbite Logo" />
                    <span className="self-center text-xl mobile:text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <button type="button" onClick={() => {setShowMiniMenu((prev) => {return prev ? false : true})}} className="place-self-end inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-gray-500 rounded-lg xl:hidden bg-slate-300/80 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                    <span className="sr-only">Open main menu</span>
                    <svg className="mobile:w-5 mobile:h-5 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="bg-slate-300/50 px-4 py-1 rounded-lg hidden xl:block place-self-center">
                    <ul className="font-medium flex gap-1 p-4 xl:p-0 mt-4 border rounded-lg xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0 xl:bg-transparent">
                        <li>
                            <a href="/auth/sign-up" className="block px-3 2xl:px-5 py-1 text-lg 2xl:text-xl font-bold text-gray-900 bg-transparent rounded hover:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
                                Цены
                            </a>
                        </li>
                        <li>
                            <a href="/auth/sign-up" className="block px-3 2xl:px-5 py-1 text-lg 2xl:text-xl font-bold text-gray-900 bg-transparent rounded hover:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
                                Как доехать?
                            </a>
                        </li>
                        <li>
                            <a href="/auth/sign-up" className="block px-3 2xl:px-5 py-1 text-lg 2xl:text-xl font-bold text-gray-900 bg-transparent rounded hover:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
                                О нас
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="w-full xl:w-auto px-4 py-1 hidden xl:block place-self-end">
                    <ul className={"font-medium flex gap-1 p-4 xl:p-0 mt-4 border rounded-lg xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0 xl:bg-transparent " + (showMiniMenu ? "bg-slate-200/100" : "")}>
                        <li>
                            <a href="/auth/sign-in" className="block px-3 2xl:px-5 py-1 text-lg 2xl:text-xl font-bold text-gray-900 bg-slate-300/50 rounded hover:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
                                Войти
                            </a>
                        </li>
                        <li>
                            <a href="/auth/sign-up" className="block px-3 2xl:px-5 py-1 text-lg 2xl:text-xl font-bold text-gray-900 bg-slate-300/50 rounded hover:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
                                Создать аккаунт
                            </a>
                        </li> 
                    </ul>
                </div>
            </div>
            <div className={"absolute right-8 xl:w-auto xl:hidden " + (showMiniMenu ? "" : "hidden")}>
                <ul className={"font-medium flex flex-col gap-1 p-4 xl:p-0 border rounded-lg  xl:flex-row xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0 xl:bg-transparent " + (showMiniMenu ? "bg-slate-200/100" : "")}>
                    <li>
                        <a href="/auth/sign-in" className="block px-5 py-1 text-lg mobile:text-xl font-bold text-gray-900 rounded focus:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
                            Войти
                        </a>
                    </li>
                    <li>
                        <a href="/auth/sign-up" className="block px-5 py-1 text-lg mobile:text-xl font-bold text-gray-900 rounded focus:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
                            Создать аккаунт
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-5 py-1 text-lg mobile:text-xl font-bold text-gray-900 bg-transparent rounded focus:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
                            Цены
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-5 py-1 text-lg mobile:text-xl font-bold text-gray-900 bg-transparent rounded focus:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
                            Как доехать?
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-5 py-1 text-lg mobile:text-xl font-bold text-gray-900 bg-transparent rounded focus:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
                            О нас
                        </a>
                    </li> 
                </ul>
            </div>
        </nav>
    )
}

export { HelloNav }