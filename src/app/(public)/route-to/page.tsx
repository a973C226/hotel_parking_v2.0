"use client"
import MapLocationRadio from "@/components/dashboard/map-location-radio";
import { usePublicLayoutContext } from "../layout";

export default function RouteToPage() {
    const parkingList = usePublicLayoutContext()
    return (
        <MapLocationRadio parkingList={parkingList}/>
    )
}