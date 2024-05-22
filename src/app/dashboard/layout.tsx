"use client"
import Footer from "@/components/footer";
import Navigation from "@/components/start-navigation";
import { Suspense } from "react";
import { YMaps, Map } from '@pbe/react-yandex-maps';
import DashboardNavigation from "@/components/dashboard-nav";
import { Spinner } from "flowbite-react";

const DashboardLayout = ({ 
		children
	}: { 
		children: React.ReactNode
	}) => {
	return ( 
		// https://www-europe.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/qx50/2019/find-your-finish/QM1-lunar-white-swatch.jpg
		// https://catherineasquithgallery.com/uploads/posts/2023-01/1674374119_catherineasquithgallery-com-p-svetlo-serii-fon-fon-foto-71.jpg
		// bg-[url('https://www-europe.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/qx50/2019/find-your-finish/QM1-lunar-white-swatch.jpg')] bg-cover
		
		<YMaps query={{ 
			lang: 'ru_RU',
			ns: "use-load-option",
			load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
		}} >
			<div className="h-full px-5 flex flex-col justify-between bg-[url('https://www-europe.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/qx50/2019/find-your-finish/QM1-lunar-white-swatch.jpg')] bg-cover">
				<DashboardNavigation/>
				{children}
				<Footer/>
			</div>
		</YMaps>
);
}
   
export default DashboardLayout;