"use client"
import { ErrorCard } from "@/components/auth/error-card";
import { useCurrentUser } from "@/hooks/use-current-user";


export default function AdminLayout ({ 
    children
}: { 
    children: React.ReactNode
}) {
    const user = useCurrentUser()
	return ( 
        <>
            {user!=null && user.role === "ADMIN" &&
                children
            }
            {user!=null && user.role != "ADMIN" &&
                <ErrorCard errMsg={"У вас недостаточно прав!"}/>
            }
        </>
	);
}