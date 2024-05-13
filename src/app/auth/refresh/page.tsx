"use client"

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useCookies } from "react-cookie";

export default function Refresh() {
    const [cookies, SetCookies] = useCookies()
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	
	return (
		<>{
			axiosInstance({
				method: "POST",
				url: "/api/auth/refresh",
				data: {
					accessToken: cookies.access_token
				}
			}).then((response) => {
				if (response.status === 200) {
					router.push("/dashboard")
				}
				router.push("/auth/sign-in")
			}).catch((error) => {
				router.push("/auth/sign-in")
			})
		}</>
	);
}