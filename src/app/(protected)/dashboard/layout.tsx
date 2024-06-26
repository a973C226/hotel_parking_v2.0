"use client"
import { createContext, useContext } from "react";
import { YMaps } from '@pbe/react-yandex-maps';
import { Spinner } from "flowbite-react";
import { useParking } from "@/hooks/use-parkings";
import { useUserTransport } from "@/hooks/use-user-transport";
import { HelloCard } from "@/components/hello-card";

const DashboardContext = createContext<any>(null);

const DashboardLayout = ({ 
	children
}: { 
	children: React.ReactNode
}) => {
	const parkings = useParking()
	const [userTransport, _] = useUserTransport()
	return ( 
		<DashboardContext.Provider value={[parkings, userTransport]}>
			<YMaps query={{ 
				lang: 'ru_RU',
				ns: "use-load-option",
				load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
			}} >
				{parkings && userTransport && 
					(<>
						<div className="flex items-center min-w-full min-h-full">
							<video autoPlay loop muted 
								className="absolute object-cover -z-10 w-auto top-0 left-0 min-w-full min-h-full max-w-full"> 
								<source src= 
									"/bg_video.mp4"
									type="video/mp4"/> 
							</video>
							<HelloCard/>
							<div className="absolute w-full mx-0 bottom-0 left-0 flex justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="animate-bounce w-14 h-14 p-1 bg-slate-300/50 rounded-full">
									<path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
								</svg>
							</div>
						</div>
						{children}
					</>)
				}
				{(!parkings || !userTransport) && 
					(<div className="flex w-full h-full items-center justify-center">
						<div className="text-center">
							Загрузка... <Spinner aria-label="Center-aligned spinner example" size="xl" />
						</div>
					</div>)
				}
			</YMaps>
		</DashboardContext.Provider>
	);
}

export function useDashboardContext() {
    return useContext(DashboardContext);
}
   
export default DashboardLayout;