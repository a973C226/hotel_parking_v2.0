"use client"

import ProfileHead from "@/components/dashboard/profile-head";
import { Card } from "@/components/ui/card";
import { UserInfo } from "@/components/user-info";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLayoutContext } from "@/app/\(protected\)/layout";
import { UserTransport } from "@/components/user-transport";
import BookingHistory from "@/components/booking-history";


export default function Profile() {
    const searchParams = useSearchParams()
    const state = searchParams.get("state")
    const [cardState, setCardState] = useState(state ?? "1")
    const user = useLayoutContext()
	return (
        <div>
            {user && 
                <>
                    <div className="absolute -z-10 top-0 left-0 w-full h-[38rem] bg-[url('https://img3.akspic.ru/attachments/crops/2/1/0/2/22012/22012-gorodskoj_pejzazh-gorodskoj_rajon-voda-gorod-otrazhenie-7680x4320.jpg')] bg-cover"></div>
                    <div className="container flex flex-col items-center gap-10">
                        <ProfileHead user={user}/>
                        <Card className="flex flex-col gap-4 sm:px-16 px-4 sm:py-16 py-10 shadow-md md:mx-auto mx-0 items-center">
                            <div className="flex rounded-md shadow-sm mb-4" role="group">
                                <button type="button" onClick={() => {setCardState("1")}} className="sm:px-4 px-1 py-2 text-sm sm:text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                                    Данные профиля
                                </button>
                                <button type="button" onClick={() => {setCardState("2")}} className="sm:px-4 px-1 py-2 text-sm sm:text-lg font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                                    Транспорт
                                </button>
                                <button type="button" onClick={() => {setCardState("3")}} className="sm:px-4 px-1 py-2 text-sm sm:text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                                    История операций
                                </button>
                            </div>
                            {cardState==="1" && <UserInfo user={user} />}
                            {cardState==="2" && <UserTransport/>}
                            {cardState==="3" && <BookingHistory/>}
                        </Card>
                    </div>
                </>
            }
            {!user &&
                <div className="flex w-full h-full items-center justify-center">
                    <div className="text-center">
                        Загрузка... <Spinner aria-label="Center-aligned spinner example" size="lg" />
                    </div>
                </div>
            }
        </div>
    );
}

