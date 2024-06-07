"use client"

import { UserButton } from "./auth/user-button"
import { useLayoutContext } from "@/app/profile/layout";



export default function DashboardNavigation() {
    const user = useLayoutContext();

    return (
        <div className="flex justify-between py-4 px-6">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <UserButton user={user}/>
        </div>
    )
}