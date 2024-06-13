import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { Suspense } from "react";
import { Spinner } from "flowbite-react";

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
			<body className={inter.className + " bg-[url('https://www-europe.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/qx50/2019/find-your-finish/QM1-lunar-white-swatch.jpg')] bg-cover bg-fixed"}>
				<Providers>
					<Suspense fallback={
						<div className="flex w-full h-full items-center justify-center">
							<div className="text-center">
								Загрузка... <Spinner aria-label="Center-aligned spinner example" size="xl" />
							</div>
						</div>
					}>
						{children}
					</Suspense>
				</Providers>
			</body>
      	</html>
	);
}
