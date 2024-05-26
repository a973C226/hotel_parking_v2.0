import { deleteTransportAction } from "@/lib/actions/transport/deleteTransportAction";
import { transportInfoAction } from "@/lib/actions/transport/transportInfoAction";
import { statusCode } from "@/lib/constants/statusCode";
import { logger } from "@/lib/logger";
import { getManyTransports } from "@/lib/repositories/transport";
import { isVerifiedToken } from "@/lib/utils/auth";
import { transportInfoSchema } from "@/lib/validations/transportInfoSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try{
        const session = await isVerifiedToken(request.headers.get("Authorization"))
        if (!session) {
            return new NextResponse(
                JSON.stringify({ message: "unauthorized" }),
                { 
                    status: statusCode.StatusUnauthorized,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            )
        }
        const transports = await getManyTransports({ userId: session.id as string, isDeleted: false })
        
        return new NextResponse(
            JSON.stringify({ 
                message: "OK",
                data: transports
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
            message: `[ApiError "/api/transport"]: ${error}`
        })
        return new NextResponse(
            JSON.stringify({ 
                message: "Ошибка получения транспорта."
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

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const session = await isVerifiedToken(request.headers.get("Authorization"))
        if (!session) {
            return new NextResponse(
                JSON.stringify({ message: "unauthorized" }),
                { 
                    status: statusCode.StatusUnauthorized,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }

        const body = await request.json();

        const validatedFields = transportInfoSchema.safeParse(body);
        if (!validatedFields.success) {
            logger.log({
                level: "error",
                message: `[BodyParseError "POST api/transport"]: ${validatedFields.error.message}`,
            });
            return new NextResponse(
                JSON.stringify({ message: "Ошибка заполнения профиля." }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }

        const actionResult = await transportInfoAction({...body, userId: session.id as string}, request.method)

        if (!actionResult.success) {
            if (actionResult.result === "method not allowed") {
                return new NextResponse(
                    JSON.stringify({ 
                        message: "method not allowed"
                     }), 
                    {
                        status: statusCode.StatusMethodNotAllowed,  
                        headers: { 
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        }
                    },
                )
            }
            return new NextResponse(
                JSON.stringify({ message: actionResult.result }), 
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
                message: actionResult.result.message,
                data: actionResult.result.data
            }), 
            { 
                status: statusCode.StatusOK, 
                headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
            } 
        );
    }   catch(error) {
        logger.log({
            level: "error",
            message: `[ApiError "POST api/transport"]: ${ error }`,
        });
        return new NextResponse(
            JSON.stringify({ message: `Что-то пошло не так, обратитесь в техподдержку.` }), 
            { 
                status: statusCode.StatusInternalServerError,
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        );
    }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
    try {
        const session = await isVerifiedToken(request.headers.get("Authorization"))
        if (!session) {
            return new NextResponse(
                JSON.stringify({ message: "unauthorized" }),
                { 
                    status: statusCode.StatusUnauthorized,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }

        const body = await request.json();

        const validatedFields = transportInfoSchema.safeParse(body.data);
        if (!validatedFields.success) {
            logger.log({
                level: "error",
                message: `[BodyParseError "POST api/transport"]: ${validatedFields.error.message}`,
            });
            return new NextResponse(
                JSON.stringify({ message: "Ошибка заполнения профиля." }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }

        const actionResult = await transportInfoAction(
            { ...body.data, id: body.id, userId: session.id as string }, 
            request.method
        )

        if (!actionResult.success) {
            if (actionResult.result === "method not allowed") {
                return new NextResponse(
                    JSON.stringify({ 
                        message: "method not allowed"
                     }), 
                    {
                        status: statusCode.StatusMethodNotAllowed,  
                        headers: { 
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        }
                    },
                )
            }
            return new NextResponse(
                JSON.stringify({ message: actionResult.result }), 
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
                message: actionResult.result.message,
                data: actionResult.result.data
            }), 
            { 
                status: statusCode.StatusOK, 
                headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
            } 
        );
    }   catch(error) {
        logger.log({
            level: "error",
            message: `[ApiError "POST api/transport"]: ${ error }`,
        });
        return new NextResponse(
            JSON.stringify({ message: `Что-то пошло не так, обратитесь в техподдержку.` }), 
            { 
                status: statusCode.StatusInternalServerError,
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        );
    }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        const session = await isVerifiedToken(request.headers.get("Authorization"))
        if (!session) {
            return new NextResponse(
                JSON.stringify({ message: "unauthorized" }),
                { 
                    status: statusCode.StatusUnauthorized,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }

        const body = await request.json();
        if (!body.transportId) {
            logger.log({
                level: "error",
                message: `[BodyParseError "DELETE api/transport"]: ${body.transportId}`,
            });
            return new NextResponse(
                JSON.stringify({ message: "Ошибка удаления транспортного средства." }),
                { 
                    status: statusCode.StatusBadRequest,
                    headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                },
            );
        }

        const actionResult = await deleteTransportAction({ id: body.transportId, userId: session.id as string })

        if (!actionResult.success) {
            return new NextResponse(
                JSON.stringify({ message: actionResult.result }), 
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
                message: actionResult.result.message,
                data: actionResult.result.data
            }), 
            { 
                status: statusCode.StatusOK, 
                headers: { 
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
            } 
        );
    } catch (error) {
        logger.log({
            level: "error",
            message: `[ApiError "DELETE api/transport"]: ${ error }`,
        });
        return new NextResponse(
            JSON.stringify({ message: `Что-то пошло не так, обратитесь в техподдержку.` }), 
            { 
                status: statusCode.StatusInternalServerError,
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        );
    }
}
