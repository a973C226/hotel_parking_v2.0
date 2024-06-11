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
      <DropdownMenuTrigger className="flex space-x-2 justify-between p-0 sm:p-2 rounded-md items-center ">
            <div className="flex space-x-4 items-center">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white h-8 w-8" />
                    </AvatarFallback>
                </Avatar>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            Профиль
          </DropdownMenuItem>
        </LogoutButton>
        <LogoutButton>
          <DropdownMenuItem>
            Мой транспорт
          </DropdownMenuItem>
        </LogoutButton>
        <LogoutButton>
          <DropdownMenuItem>
            История операций
          </DropdownMenuItem>
        </LogoutButton>
        <LogoutButton>
          <DropdownMenuItem>
            Выйти
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
