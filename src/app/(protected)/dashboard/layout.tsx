"use client"
import Footer from "@/components/footer";
import Navigation from "@/components/start-navigation";
import { createContext, Suspense, useContext } from "react";
import { YMaps, Map } from '@pbe/react-yandex-maps';
import DashboardNavigation from "@/components/dashboard-nav";
import { Spinner } from "flowbite-react";
import { useParking } from "@/hooks/use-parkings";
import { useUserTransport } from "@/hooks/use-user-transport";

const DashboardContext = createContext<any>(null);

const DashboardLayout = ({ 
	children
}: { 
	children: React.ReactNode
}) => {
	const parkings = useParking()
	const [userTransport, _] = useUserTransport()
	return ( 
		// https://www-europe.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/qx50/2019/find-your-finish/QM1-lunar-white-swatch.jpg
		// https://catherineasquithgallery.com/uploads/posts/2023-01/1674374119_catherineasquithgallery-com-p-svetlo-serii-fon-fon-foto-71.jpg
		// bg-[url('https://www-europe.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/qx50/2019/find-your-finish/QM1-lunar-white-swatch.jpg')] bg-cover
		<DashboardContext.Provider value={[parkings, userTransport]}>
			<YMaps query={{ 
				lang: 'ru_RU',
				ns: "use-load-option",
				load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
			}} >
				{children}
			</YMaps>
		</DashboardContext.Provider>
	);
}

export function useDashboardContext() {
    return useContext(DashboardContext);
}
   
export default DashboardLayout;