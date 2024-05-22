"use client"

import { useContext } from "react";
import { UserButton } from "./auth/user-button"
import { Button } from "./ui/button"
import { useLayoutContext } from "@/app/profile/layout";



export default function DashboardNavigation() {
    const user = useLayoutContext();

    return (
        <div className="flex justify-between py-4 px-6">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <div className="flex items-center gap-4">
                <Button type="button" className="bg-gray-500">Забронировать</Button>
                <Button type="button" className="bg-gray-500">Цены</Button>
                <a href="/dashboard/route-to">
                    <Button type="button" className="bg-gray-500">Как доехать?</Button>
                </a>
            </div>
            <UserButton user={user}/>
        </div>
    )
}