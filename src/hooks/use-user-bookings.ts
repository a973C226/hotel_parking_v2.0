"use client"
import axiosInstance from "@/lib/axios";
import { Booking } from "@prisma/client";
import { useState, useEffect } from "react";

export const useUserBookings = () => {
    const [bookings, setBooking] = useState<Booking[] | null>(null);
	const getBooking = async () => {
		const response = await axiosInstance({
            method: "GET",
            url: "/api/booking",
            headers: {
                "Content-Type": "application/json"
            }
        })
		setBooking(response.data.data)
	};
	useEffect(() => {
		getBooking();
	}, []);
	return [bookings, setBooking];
}