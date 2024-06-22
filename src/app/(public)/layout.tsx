"use client"
import DashboardNavigation from "@/components/dashboard-nav";
import Footer from "@/components/footer";
import { HelloNav } from "@/components/hello-nav";
import { useCheckAuth } from "@/hooks/use-check-auth";
import { useParking } from "@/hooks/use-parkings";
import { createContext, useContext } from "react";

const PublicLayoutContext = createContext<any>(null);

const PublicLayout = ({ 
    children
}: { 
    children: React.ReactNode
}) => {
    const parkingList = useParking()
    const isAuth = useCheckAuth()
	return ( 
        <>
            {parkingList &&
                <PublicLayoutContext.Provider value={parkingList}>
                    <div className="h-full md:px-5 px-2 flex flex-col justify-between bg-[url('https://www-europe.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/qx50/2019/find-your-finish/QM1-lunar-white-swatch.jpg')] bg-cover">
                        {isAuth ? <DashboardNavigation/> : <HelloNav />}
                        {children}
                        <Footer/>
                    </div>
                </PublicLayoutContext.Provider>
            }
        </>
	);
}

export function usePublicLayoutContext() {
    return useContext(PublicLayoutContext);
}
   
export default PublicLayout;