"use client"

import DashboardNavigation from "@/components/dashboard-nav";
import { BookingCard } from "@/components/dashboard/booking-card";
import { FreePlaceCard } from "@/components/dashboard/free-place-card";
import MapLocationRadio from "@/components/dashboard/map-location-radio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import YandexMap from "@/components/ui/yandex-map";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useWaitQuery } from "@/hooks/use-wait-query";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";


const hotelsCoords = new Map<string, number[]>([
	["palace-bridge-hotel", [59.944559, 30.293485]],
	["vasilievsky-hotel", [59.937382, 30.282361]],
	["olympia-garden-hotel", [59.913541, 30.320638]]
])

export default function Dashboard() {
	// const [data] = useWaitQuery({wait: 10})
	const [hotelState, setHotel] = useState<string>("")
	const [parkingState, setParking] = useState<string>("")
	const chooseHotel = (e: any) => {
		setHotel(e.target.value)
	}
	useEffect(() => {
		console.log(parkingState)
	}, [parkingState]);
	return (
		<div className="container flex items-center">
				<FreePlaceCard hotel={[hotelState, setHotel]} parking={[parkingState, setParking]} />
				<Button variant={"link"} size={"lgIcon"} className="">
					<FaArrowRight className="text-primary hover:text-primary/70 text-6xl " />
				</Button>
				<BookingCard/>
		</div>
	);
}
