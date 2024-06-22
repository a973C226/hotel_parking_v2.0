"use client"
import axiosInstance from "@/lib/axios";
import { Parking } from "@prisma/client";
import { useState, useEffect } from "react";


export const useParking = () => {
	const [parkings, setParkings] = useState<Parking[] | null>(null)
	const getParkings = async () => {
		const response = await axiosInstance({
            method: "GET",
            url: "/api/parking",
            headers: {
                "Content-Type": "application/json"
            }
        })
		setParkings(response.data.data)
	};
	useEffect(() => {
		getParkings();
	}, []);
	return parkings;
}