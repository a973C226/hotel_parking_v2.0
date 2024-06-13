import { Parking } from "@prisma/client"
import { PriceCard } from "./price-card"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface PricesProps {
    parkingList: Parking[];
}

export const Prices = (props: PricesProps) => {
    const parkings = props.parkingList
    return (
        <div className="flex flex-col gap-10 items-center">
            <h1 className="text-2xl sm:text-4xl xl:text-5xl font-bold mb-0 sm:mb-6">Наши цены</h1>
            <div className="flex flex-col xl:flex-row gap-6 2xl:gap-10 3xl:gap-24 justify-center">
                {parkings.map((parking: Parking) => (
                    <PriceCard parking={parking}/>
                ))}
            </div>
        </div>
    )
}