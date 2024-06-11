import { useParking } from "@/hooks/use-parkings";
import { useUserBookings } from "@/hooks/use-user-bookings";
import { Booking } from "@prisma/client";
import BookingHistoryCard from "./booking-history-card";
import { useUserTransport } from "@/hooks/use-user-transport";

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
            
        </div>
    )
}