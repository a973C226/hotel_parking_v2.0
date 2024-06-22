"use client"
import axiosInstance from "@/lib/axios";
import { useState, useEffect } from "react";


export const useCurrentUser = () => {
	const [auth, setAuth] = useState(null);
	const getSession = async () => {
		const response = await axiosInstance({
			method: "GET",
			url: "/api/session",
			headers: { 
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: localStorage.getItem("access-token")
			}
		})
		setAuth(response.data.data)
	};
	useEffect(() => {
		getSession();
	}, []);
	return auth;
}