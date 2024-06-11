"use client"
import Footer from "@/components/footer";
import Navigation from "@/components/start-navigation";
import { createContext, createServerContext, Suspense, useContext } from "react";
import { YMaps, Map } from '@pbe/react-yandex-maps';
import DashboardNavigation from "@/components/dashboard-nav";
import { Spinner } from "flowbite-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MyContext = createContext<any>(null);

const ProtectedLayout = ({ 
		children
	}: { 
		children: React.ReactNode
	}) => {
    const user = useCurrentUser()
	const url = usePathname()
	const containerClassName = "h-full md:px-5 px-2 flex flex-col justify-between"
	return ( 
        <MyContext.Provider value={user}>
            <div className={url === "/profile" ? containerClassName
				: containerClassName + " bg-[url('https://www-europe.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/qx50/2019/find-your-finish/QM1-lunar-white-swatch.jpg')] bg-cover"
			}>
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
        </MyContext.Provider>
    )
}

export function useLayoutContext() {
    return useContext(MyContext);
}
   
export default ProtectedLayout;