import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SignOut } from "@/lib/actions/auth/signOut";

interface ErrorCardProps {
	errMsg?: string | null;
}

export const ErrorCard = ({errMsg}: ErrorCardProps) => {
	const router = useRouter();
	const onClick = () => {
		SignOut();
		router.push("/auth/sign-in")
	};
	return (
		<CardWrapper
			headerLabel={errMsg || "Oops! Something went wrong!"}
		>
			<div className="flex-col items-center justify-center space-y-4">
				<div className="w-full flex justify-center items-center">
					<ExclamationTriangleIcon className="text-destructive h-16 w-16" />
				</div>
				<div className="flex justify-center">
					<Button onClick={onClick}>Вернуться к авторизации</Button>
				</div>
			</div>
		</CardWrapper>
	);
};
