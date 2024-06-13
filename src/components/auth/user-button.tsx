"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "flowbite-react";

type UserButtonProps = {
	user: any;
}

export const UserButton = ({user}: UserButtonProps) => {
	return (
		<div className="flex gap-4">
			<div className="px-4 py-1 rounded-lg hidden xl:block place-self-center">
				<ul className="font-medium flex gap-1 p-4 xl:p-0 mt-4 border rounded-lg xl:space-x-4 rtl:space-x-reverse xl:mt-0 xl:border-0 xl:bg-transparent">
					<li>
						<a href="/dashboard" className="block px-3 2xl:px-5 py-1 text-lg 2xl:text-xl font-bold text-gray-900 bg-transparent rounded hover:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
							Главная
						</a>
					</li>
					<li>
						<a href="/prices" className="block px-3 2xl:px-5 py-1 text-lg 2xl:text-xl font-bold text-gray-900 bg-transparent rounded hover:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
							Цены
						</a>
					</li>
					<li>
						<a href="/route-to" className="block px-3 2xl:px-5 py-1 text-lg 2xl:text-xl font-bold text-gray-900 bg-transparent rounded hover:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
							Как доехать?
						</a>
					</li>
					<li>
						<a href="/contacts" className="block px-3 2xl:px-5 py-1 text-lg 2xl:text-xl font-bold text-gray-900 bg-transparent rounded hover:bg-slate-300/80 xl:border-0 xl:hover:text-blue-700" aria-current="page">
							Контакты
						</a>
					</li>
				</ul>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger className="flex space-x-2 justify-between p-0 sm:p-2 rounded-md items-center ">
						<div className="flex space-x-4 items-center">
							<Avatar>
								<AvatarImage src="" />
								<AvatarFallback className="bg-sky-500">
									<FaUser className="text-white h-8 w-8" />
								</AvatarFallback>
							</Avatar>
						</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40" align="end">
					<DropdownMenuItem>
						<a href="/dashboard">Главная</a>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<a href="/profile">Профиль</a>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<a href="/prices">Цены</a>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<a href="/route-to">Как доехать?</a>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<a href="/contacts">Контакты</a>
					</DropdownMenuItem>
					<LogoutButton>
						<DropdownMenuItem>
							Выйти
						</DropdownMenuItem>
					</LogoutButton>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
