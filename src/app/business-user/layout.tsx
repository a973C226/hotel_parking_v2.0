"use client"
import { ErrorCard } from "@/components/auth/error-card";
import { useCurrentUser } from "@/hooks/use-current-user";


export default function BusinessUserLayout({ 
    children
}: { 
    children: React.ReactNode
}) {
    const user = useCurrentUser()
	return ( 
        <>
            {user!=null && user.role === "BUSiNESS_USER" &&
                children
            }
            {user!=null && user.role != "BUSiNESS_USER" &&
                <ErrorCard errMsg={"У вас недостаточно прав!"}/>
            }
        </>
	);
}