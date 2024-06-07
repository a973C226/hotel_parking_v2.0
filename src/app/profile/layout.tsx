"use client"
import Footer from "@/components/footer";
import Navigation from "@/components/start-navigation";
import { createContext, createServerContext, Suspense, useContext } from "react";
import { YMaps, Map } from '@pbe/react-yandex-maps';
import DashboardNavigation from "@/components/dashboard-nav";
import { Spinner } from "flowbite-react";
import { useCurrentUser } from "@/hooks/use-current-user";

const MyContext = createContext<any>(null);

const DashboardLayout = ({ 
		children
	}: { 
		children: React.ReactNode
	}) => {
    const user = useCurrentUser()
	return ( 
        <MyContext.Provider value={user}>
            <div className="h-full md:px-5 px-2 flex flex-col justify-between">
                <DashboardNavigation/>
                {children}
                <Footer/>
            </div>
        </MyContext.Provider>
    )
}

export function useLayoutContext() {
    return useContext(MyContext);
}
   
export default DashboardLayout;