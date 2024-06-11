"use client"
import Footer from "@/components/footer";
import Navigation from "@/components/start-navigation";
import { createContext, createServerContext, Suspense, useContext } from "react";
import { YMaps, Map } from '@pbe/react-yandex-maps';
import DashboardNavigation from "@/components/dashboard-nav";
import { Spinner } from "flowbite-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useLayoutContext } from "@/app/\(protected\)/layout";
import { ErrorCard } from "@/components/auth/error-card";


const ProtectedLayout = ({ 
    children
}: { 
    children: React.ReactNode
}) => {
    const user = useLayoutContext()

	return ( 
        <div>
            {user.role === "ADMIN" ? children : <ErrorCard errMsg={"Oops! У вас не хватает прав!"}/>}
        </div>
    )
}

export default ProtectedLayout;