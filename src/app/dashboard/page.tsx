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

export default function Dashboard() {
	// const [data] = useWaitQuery({wait: 10})
	const [hotelState, setHotel] = useState<string>("palace-bridge-hotel")
	const chooseHotel = (e: any) => {
		setHotel(e.target.value)
	}
	return (
		<div className="container flex">
			<Card className="p-16 shadow-md md:mx-auto mx-0">
			</Card>
			<Card className="p-16 shadow-md md:mx-auto mx-0">
			</Card>
		</div>
	);
}
