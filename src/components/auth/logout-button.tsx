"use client";

import { SignOut } from "@/lib/actions/auth/signOut";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
};

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
	const router = useRouter();
	const onClick = () => {
		SignOut();
		router.push("/")
	};

	return (
		<span onClick={onClick} className="cursor-pointer">
			{children}
		</span>
	);
};
