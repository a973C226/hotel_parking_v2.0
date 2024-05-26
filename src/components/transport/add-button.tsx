import { SetStateAction } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { AddTransportForm } from "./add-transport-form";
import { Transport } from "@prisma/client";


interface AddButtonProps {
    children: React.ReactNode;
    asChild?: boolean;
};
  
export const AddButton = ({children, asChild}: AddButtonProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild={asChild}>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                <AddTransportForm />
            </DialogContent>
        </Dialog>
    )
}