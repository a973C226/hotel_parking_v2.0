import { Parking } from "@prisma/client";
import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface PriceCardProps {
    isAuth: any;
    parking: Parking;
}

export const PriceCard = (props: PriceCardProps) => {
    const parking = props.parking
    return (
        <Card className="max-w-[24rem] sm:min-w-[24rem] min-w-[18rem] flex flex-col justify-between">
            <div className="bg-sky-400 rounded-t-xl py-6 text-white flex flex-col gap-4 items-center">
                <h1 className="text-lg 2xl:text-2xl 3xl:text-3xl font-bold px-4 text-center">{parking.parkingName}</h1>
                <h5 className="text-xl font-semibold">{parking.pricePerQuota + "/час"}</h5>
            </div>
            <div>
                <p className="text-xl p-6">{parking.description}</p>
            </div>
            <div className="flex justify-center py-6">
                <a href={props.isAuth ? "/dashboard#booking" : "/auth/sign-in"}><Button className="bg-sky-400 hover:bg-sky-700 text-xl xl:text-2xl py-6 rounded-3xl" size={"lg"}>Забронировать</Button></a>
            </div>
        </Card>
    )
}