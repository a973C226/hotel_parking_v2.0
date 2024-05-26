"use client"
import axiosInstance from "@/lib/axios";
import { Transport } from "@prisma/client";
import React, { useState, useEffect } from "react";


export const useUserTransport = () => {
	const [transport, setTransport] = useState<Transport[] | null>(null);
	const getTransport = async () => {
		const response = await axiosInstance({
            method: "GET",
            url: "/api/transport",
            headers: {
                "Content-Type": "application/json"
            }
        })
		setTransport(response.data.data)
	};
	useEffect(() => {
		getTransport();
	}, []);
	return [transport, setTransport];
}