"use client"

import Footer from "@/components/footer";
import { createContext, useContext } from "react";
import DashboardNavigation from "@/components/dashboard-nav";
import { Spinner } from "flowbite-react";
import { useCurrentUser } from "@/hooks/use-current-user";


const ProtectedLayoutContext = createContext<any>(null);

const ProtectedLayout = ({ 
		children
	}: { 
		children: React.ReactNode
	}) => {
    const user = useCurrentUser()
	return ( 
        <ProtectedLayoutContext.Provider value={user}>
            <div className="h-full md:px-5 px-2 flex flex-col justify-between">
                <DashboardNavigation/>
                {user && children}
				{!user &&
					<div className="flex w-full h-full items-center justify-center">
						<div className="text-center">
							Загрузка... <Spinner aria-label="Center-aligned spinner example" size="lg" />
						</div>
					</div>
				}
                <Footer/>
            </div>
        </ProtectedLayoutContext.Provider>
    )
}

export function useLayoutContext() {
    return useContext(ProtectedLayoutContext);
}
   
export default ProtectedLayout;