import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";
import { SetStateAction, useTransition } from "react";
import { Button } from "./ui/button";
import { Booking, Transport } from "@prisma/client";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog"
import { AddTransportForm } from "./transport/add-transport-form";
import { CardWrapper } from "./auth/card-wrapper";
import { Spinner } from "flowbite-react";

interface DeleteButtonProps {
    id: string;
    setError: (value: SetStateAction<string | undefined>) => void;
    setSuccess: (value: SetStateAction<string | undefined>) => void;
    setLoading: (value: SetStateAction<boolean>) => void;
    setBooking: (value: SetStateAction<Booking[] | null>) => void;
    children: React.ReactNode;
    asChild?: boolean;
}

export const DeleteBookingButton = (props: DeleteButtonProps) => {
    const [isPending, startTransition] = useTransition()
    const deleteBooking = () => {
        startTransition(async () => {
            await axiosInstance({
				method: "DELETE",
				url: "/api/booking",
				headers: {
					"Content-Type": "application/json"
				},
				data: { bookingId: props.id }
			}).then(function (response: AxiosResponse<any, any>) {
				props.setSuccess(() => {return response.data.message})
				props.setBooking((prevBooking: Booking[] | null) => {
                    return prevBooking?.filter(item => item.id != response.data.data.id) ?? []
                })
			}).catch((error) => {
				props.setLoading(() => {return false});
				props.setError(error.response.data.message)
			})
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild={props.asChild}>
                {props.children}
            </DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                <CardWrapper headerLabel="Отмена бронирования">
                    <h1>Уверены, что хотите отменить бронь? Средства будут возвращены на то платежное средство, которое использовалось для оплаты.</h1>
                    <div className="flex gap-4 mt-4">
                        <Button onClick={deleteBooking} variant="destructive">
                            <div>Да</div> {isPending && <Spinner className="ml-4" aria-label="Center-aligned spinner" size="md" />}    
                        </Button> 
                        <DialogClose>
                            <Button onClick={deleteBooking} variant="secondary">Нет</Button>
                        </DialogClose>
                    </div>
                </CardWrapper>
            </DialogContent>
        </Dialog>
    )
}