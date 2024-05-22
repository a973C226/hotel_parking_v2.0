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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex space-x-4 justify-between bg-slate-300/10 p-2 rounded-md min-w-36 items-center shadow-md">
            <div className="flex space-x-4 items-center">
                <Avatar>
                    <AvatarImage src="https://www.1zoom.ru/big2/62/199578-yana.jpg" />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
                <div className="font-normal italic text-lg">
                    {user && user["username"]}
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Профиль
          </DropdownMenuItem>
        </LogoutButton>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Моя бронь
          </DropdownMenuItem>
        </LogoutButton>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Мой транспорт
          </DropdownMenuItem>
        </LogoutButton>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Выйти
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
