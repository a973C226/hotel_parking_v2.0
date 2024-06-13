"use client"
import axiosInstance from "@/lib/axios";
import React, { useState, useEffect } from "react";


export const useCheckAuth = () => {
	const [auth, setAuth] = useState<any>(null);
	const getAuth = async () => {
		const response = localStorage.getItem("access-token") ?? null
		setAuth(response)
	};
	useEffect(() => {
		getAuth();
	}, []);
	return auth;
}