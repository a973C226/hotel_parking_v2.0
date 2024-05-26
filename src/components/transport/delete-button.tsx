import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";
import { SetStateAction, useTransition } from "react";
import { Button } from "../ui/button";
import { Transport } from "@prisma/client";

interface DeleteButtonProps {
    id: string;
    setError: (value: SetStateAction<string | undefined>) => void;
    setSuccess: (value: SetStateAction<string | undefined>) => void;
    setLoading: (value: SetStateAction<boolean>) => void;
    setTransport: (value: SetStateAction<Transport[] | null>) => void;
}


export const DeleteButton = (props: DeleteButtonProps) => {
    const [isPending, startTransition] = useTransition()
    const deleteTransport = () => {
        startTransition(async () => {
            await axiosInstance({
				method: "DELETE",
				url: "/api/transport",
				headers: {
					"Content-Type": "application/json"
				},
				data: { transportId: props.id }
			}).then(function (response: AxiosResponse<any, any>) {
				props.setSuccess(() => {return response.data.message})
				props.setTransport((prevTransport: Transport[] | null) => {
                    return prevTransport?.filter(item => item.id != response.data.data.id) ?? []
                })
			}).catch((error) => {
				props.setLoading(() => {return false});
				props.setError(error.response.data.message)
			})
        })
    }
    return (
        <Button onClick={deleteTransport} variant="destructive">Удалить</Button>
    )
}