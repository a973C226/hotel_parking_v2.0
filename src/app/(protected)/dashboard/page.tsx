"use client"

import DashboardNavigation from "@/components/dashboard-nav";
import { BookingCard } from "@/components/dashboard/booking-card";
import { FreePlaceCard } from "@/components/dashboard/free-place-card";
import MapLocationRadio from "@/components/dashboard/map-location-radio";
import { HelloCard } from "@/components/hello-card";
import { Prices } from "@/components/prices";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import YandexMap from "@/components/ui/yandex-map";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useParking } from "@/hooks/use-parkings";
import { useWaitQuery } from "@/hooks/use-wait-query";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDashboardContext } from "./layout";


const hotelsCoords = new Map<string, number[]>([
	["palace-bridge-hotel", [59.944559, 30.293485]],
	["vasilievsky-hotel", [59.937382, 30.282361]],
	["olympia-garden-hotel", [59.913541, 30.320638]]
])

export default async function Dashboard() {
	const [parkingState, setParking] = useState<string>("")
	const [datetimeFromState, setDatetimeFrom] = useState<string>("")
	const [datetimeToState, setDatetimeTo] = useState<string>("")
	const [parkings, userTransport] = useDashboardContext()
	return (
		<div className="flex flex-col space-y-20 mx-0 px-0">
			<div id="booking" className="flex flex-col items-center gap-6">
				<h1 className="text-2xl sm:text-4xl font-bold mb-0 sm:mb-6">Забронируйте сейчас</h1>
				<div className="relative flex lg:flex-row flex-col items-center justify-center xl:space-x-10 gap-6">
					<FreePlaceCard datetimeFrom={[datetimeFromState, setDatetimeFrom]} datetimeTo={[datetimeToState, setDatetimeTo]} parking={[parkingState, setParking]} />
					<BookingCard/>
				</div>
			</div>
			{parkings &&
				<div className="bg-sky-200 mx-0 rounded-xl 2xl:rounded-full py-10 2xl:py-32">
					<Prices parkingList={parkings}/>
				</div>
			}
			<div>
				<MapLocationRadio parkingList={parkings}/>
			</div>
		</div>
	);
}
