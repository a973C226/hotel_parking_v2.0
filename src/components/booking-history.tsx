import { useParking } from "@/hooks/use-parkings";
import { useUserBookings } from "@/hooks/use-user-bookings";
import { Booking } from "@prisma/client";
import BookingHistoryCard from "./booking-history-card";
import { useUserTransport } from "@/hooks/use-user-transport";
import { Spinner } from "flowbite-react";

export default function BookingHistory() {
    const [userBookings, setUserBooking]: any = useUserBookings()

    return (
        <div>
            {userBookings!=null &&
                <div className="flex flex-col gap-4">
                    {userBookings.map((booking: Booking) => (
                        <BookingHistoryCard booking={booking} setBooking={setUserBooking}/>
                    ))}
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