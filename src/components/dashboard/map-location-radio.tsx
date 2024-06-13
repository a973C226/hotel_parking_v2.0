"use client"

import { YMaps } from "@pbe/react-yandex-maps";
import { Parking } from "@prisma/client";
import { useState } from "react";
import YandexMap from "../ui/yandex-map";
import { Decimal } from "@prisma/client/runtime/library";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface MapLocationRadioProps {
	parkingList: Parking[];
};

const defaultCoords = [59.934972, 30.318075]

export default function MapLocationRadio({ parkingList }: MapLocationRadioProps) {
    const parkingDict = new Map(parkingList.map(p => {return [p.parkingName, [p.coord_x, p.coord_y]]}))
    const [parkingState, setParking] = useState<number[]>([parkingList[0].coord_x, parkingList[0].coord_y])
    const [parkingNameState, setParkingName] = useState<string>(parkingList[0].parkingName)
    const chooseRadioParking = (e: any) => {
        setParkingName(() => {return e.target.value})
        setParking(() => {return parkingDict.get(e.target.value) ?? defaultCoords}) 
    }
    const chooseSelectParking = (e: any) => {
        setParkingName(() => {return e})
        setParking(() => {return parkingDict.get(e) ?? defaultCoords})
    }
    return (
        <div className="2xl:p-10 flex flex-col items-center gap-6">
            <h1 className="text-2xl sm:text-4xl font-bold mb-0 sm:mb-6">Наши парковки</h1>
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="xl:hidden bg-white rounded-lg">
                    <Select
                        onValueChange={chooseSelectParking}
                    >
                        <SelectTrigger className="text-lg sm:text-xl p-4 sm:h-12">
                            <SelectValue placeholder={parkingNameState} />
                        </SelectTrigger>
                        <SelectContent>
                            {parkingList.map(p => (
                                <SelectItem className="text-md sm:text-lg" value={p.parkingName}>
                                    {p.parkingName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <ul className="hidden xl:flex flex-col w-full gap-4 md:justify-center items-center">
                    {parkingList.map((parking) => (
                        <li>
                            <input checked={parkingNameState === parking.parkingName} onClick={chooseRadioParking} type="radio" id={parking.id} name="hotel-location" value={parking.parkingName} className="hidden peer"/>
                            <label htmlFor={parking.id} className="inline-flex items-center justify-between w-auto text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:border-4 hover:text-gray-600 hover:bg-gray-100">                          
                                <figure className="relative max-w-60 3xl:max-w-72 transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                                    <img className="rounded-sm" src={parking.id + ".jpg"} alt={parking.parkingName}></img>
                                    <figcaption className="absolute px-4 text-2xl text-white bottom-6">
                                        <p className="font-semibold">{parking.parkingName}</p>
                                    </figcaption>
                                </figure>
                            </label>
                        </li>
                    ))}
                </ul>
                <YMaps query={{ 
                    lang: 'ru_RU',
                    ns: "use-load-option",
                    load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
                }} >
                    <div className="flex flex-col items-center">
                        {/* <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">Наши контакты</h1> */}
                        <div className="flex flex-col xl:flex-row items-center">
                            <div className="rounded-xl" id="map">
                                <YandexMap coords={parkingState} width={window.innerWidth/1.5} height={window.innerHeight/1.5}/>
                            </div>
                        </div>
                    </div>
                </YMaps>
            </div>
        </div>
    )
}