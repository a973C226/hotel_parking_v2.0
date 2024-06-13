"use client"

import { UserButton } from "./auth/user-button"
import { useLayoutContext } from "@/app/\(protected\)/layout";



export default function DashboardNavigation() {
    const user = useLayoutContext();

    return (
        <div className="flex justify-between py-1 px-6 mx-0 mb-6 rounded-b-md bg-slate-200/50">
            <a href="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/logo.svg" className="h-12" alt="Logo" />
            </a>
            <UserButton user={user}/>
        </div>
    )
}