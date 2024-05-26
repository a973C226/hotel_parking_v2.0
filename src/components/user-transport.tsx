import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";
import { SetStateAction, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useUserTransport } from "@/hooks/use-user-transport";
import { TransportCard } from "./transport-card";
import { Accordion, Spinner } from "flowbite-react";
import { Transport } from "@prisma/client";
import { AddButton } from "./transport/add-button";


export const UserTransport = () => {
    const [userTransport, setTransport]: any = useUserTransport()
    return (
        <>
        {userTransport && 
            <div className="h-auto flex flex-col items-center">
                {userTransport && 
                    <div className="flex flex-col gap-4">
                        {userTransport.map((transport: Transport) => (
                            <TransportCard transport={transport} setTransport={setTransport}/>
                        ))}
                    </div>
                }
                {userTransport.length==0 && <div className="text-center">Транспорта нет</div>}
                <AddButton asChild>
                    <Button className="mt-6" variant="secondary" size="lg" >
                        Добавить транспорт
                    </Button>
                </AddButton>
            </div>
        }
        {!userTransport && 
            <div className="flex w-full h-full items-center justify-center">
                <div className="text-center">
                    Загрузка... <Spinner aria-label="Center-aligned spinner example" size="lg" />
                </div>
            </div>
        }
        </>
    )
}