import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { getAllParkings } from "@/lib/repositories/parking";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try{
        const parkings = await getAllParkings()

        if (parkings === null) {
            return new NextResponse(
                JSON.stringify({ 
                    message: "Не удалось получить список парковок"
                }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            )
        }
        
        return new NextResponse(
            JSON.stringify({ 
                message: "OK",
                data: parkings
            }),
            { 
                status: statusCode.StatusOK,
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            },
        )
    } catch(error) {
        logger.log({
            level: "error",
            message: `[ApiError "/api/parking"]: ${error}`
        })
        return new NextResponse(
            JSON.stringify({ 
                message: "Ошибка получения парковок."
            }),
            { 
                status: statusCode.StatusInternalServerError,
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            },
        )
    }
}