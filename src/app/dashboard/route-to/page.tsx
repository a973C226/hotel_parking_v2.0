"use client"

import DashboardNavigation from "@/components/dashboard-nav";
import MapLocationRadio from "@/components/dashboard/map-location-radio";
import { Card } from "@/components/ui/card";
import YandexMap from "@/components/ui/yandex-map";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useWaitQuery } from "@/hooks/use-wait-query";
import { useState } from "react";


const hotelsCoords = new Map<string, number[]>([
	["palace-bridge-hotel", [59.944559, 30.293485]],
	["vasilievsky-hotel", [59.937382, 30.282361]],
	["olympia-garden-hotel", [59.913541, 30.320638]]
])

export default function RouteTo() {
	// const [data] = useWaitQuery({wait: 10})
	const [hotelState, setHotel] = useState<string>("palace-bridge-hotel")
	const chooseHotel = (e: any) => {
		setHotel(e.target.value)
	}
	return (
		<div className="container flex flex-col">
			<Card className="px-16 py-10 shadow-md md:mx-auto mx-0">
				<div className="flex flex-col items-center">
					<h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">Как доехать?</h1>
					<h5 className="mb-4 text-xl font-normal leading-none tracking-tight text-gray-500 md:text-xl lg:text-2xl dark:text-white">Выберите отель</h5>
					<div className="flex flex-col md:flex-row gap-10 items-center">
						<MapLocationRadio setHotel={chooseHotel}/>
						{hotelState && <div id="map"><YandexMap coords={hotelsCoords.get(hotelState)!}/></div>}
					</div>
				</div>
			</Card>
		</div>
	);
}
