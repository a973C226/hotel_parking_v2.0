import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "@/app/globals.css";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { HelloNav } from "@/components/hello-nav";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Парковки Wone Hotels",
	description: "Бронирование парковочных мест в отелях Wone Hotels",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={inter.className}>
				<Toaster />
				{children}
			</body>
      	</html>
	);
}
