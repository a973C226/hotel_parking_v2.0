import { useUserBookings } from "@/hooks/use-user-bookings";
import { useUserTransport } from "@/hooks/use-user-transport";
import { FaUser } from "react-icons/fa";

type ProfileHeadProps = {
    user: any;
}

export default function ProfileHead({user}: ProfileHeadProps) {
    const [userBookings, setBooking] = useUserBookings()
    const [userTransport, _] = useUserTransport()
    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <FaUser className="text-white w-48 h-48" />
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-2xl sm:text-4xl font-bold leading-none tracking-tight text-white space-x-2">
                    <span>{user.lastname}</span>
                    <span>{user.name}</span>
                    <span>{user.middlename}</span>
                </h1>
                <h3 className="text-xl font-normal leading-none tracking-tight text-white">{user.username}</h3>
            </div>
            <div className="flex items-center gap-10">
            <div className="flex flex-col items-center gap-4">
                    <h1 className="text-3xl font-semibold leading-none tracking-tight text-white">{userTransport && userTransport.length}</h1>
                    <p className="text-white">транспортов</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-3xl font-semibold leading-none tracking-tight text-white">{userBookings && userBookings.length}</h1>
                    <p className="text-white">бронирований</p>
                </div>
            </div>
        </div>
    )
}