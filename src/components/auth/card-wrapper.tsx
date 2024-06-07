"use client";

import { 
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
	children: React.ReactNode;
	backButtonLabel?: string | null;
	backButtonHref?: string | null;
	headerLabel: string;
};

export const CardWrapper = ({
	children,
	backButtonLabel,
	backButtonHref,
	headerLabel
}: CardWrapperProps) => {
	return (
		<Card className="md:w-[400px] sm:w-[24rem] mini-mobile:w-[21rem] shadow-md mx-auto ">
			<CardHeader>
				<Header headerLabel={headerLabel}/>
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
			{ backButtonLabel && backButtonHref && (
				<CardFooter>
					<BackButton
						label={backButtonLabel}
						href={backButtonHref}
					/>
				</CardFooter>
			)}
		</Card>
	);
};
