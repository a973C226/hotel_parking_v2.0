import { useUserBookings } from "@/hooks/use-user-bookings";
import { Booking } from "@prisma/client";
import BookingHistoryCard from "./booking-history-card";
import { Spinner } from "flowbite-react";

export default function BookingHistory() {
    const [userBookings, _]: any = useUserBookings()

    return (
        <div>
            {userBookings!=null &&
                <div className="flex flex-col gap-4">
                    {userBookings.map((booking: Booking) => (
                        <BookingHistoryCard booking={booking}/>
                    ))}
                    {userBookings.length==0 && <div className="text-center">Бронирований нет</div>}
                </div>
            }
            {!userBookings && 
                <div className="flex w-full h-full items-center justify-center">
                    <div className="text-center">
                        Загрузка... <Spinner aria-label="Center-aligned spinner example" size="lg" />
                    </div>
                </div>
            }
        </div>
    )
}