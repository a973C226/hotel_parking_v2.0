"use client"

import Footer from "@/components/footer";
import { HelloCard } from "@/components/hello-card";
import { HelloNav } from "@/components/hello-nav";
import Navigation from "@/components/navigation";
import { getSession } from "@/lib/utils/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StartPage() {
	return (
		<div className="h-full flex flex-col items-center justify-center md:bg-[url('https://drozdov-partners.com/wp-content/uploads/collection-garage-3-min.jpg')] bg-[url('https://www.fubiz.net/wp-content/uploads/2017/09/Renault_SYMBIOZ6.jpg')] bg-cover bg-center">
			<HelloNav/>
			<HelloCard/>
		</div>
	);
}
