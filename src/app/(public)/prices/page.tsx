"use client"
import { Prices } from "@/components/prices";
import { usePublicLayoutContext } from "../layout";

export default function PricesPage() {
    const parkingList = usePublicLayoutContext()
    return (
        <div>
            <Prices parkingList={parkingList}/>
        </div>
    )
}