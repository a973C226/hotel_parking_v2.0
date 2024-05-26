import { Prisma, Transport } from "@prisma/client";
import { db } from "../db";
import { logger } from "../logger";

interface UniqueSearchParams {
	id: string;
	licensePlate?: string;
	userId?: string;
	brand?: string;
	model?: string;
	color?: string;
	isDeleted?: boolean;
}

interface SearchParams {
	licensePlate?: string;
	userId?: string;
	brand?: string;
	model?: string;
	color?: string;
	isDeleted?: boolean;
}

export const getUniqueTransport = async (searchParams: UniqueSearchParams): Promise<Transport | null> => {
	try {
		const transport = await db.transport.findUnique({ where: searchParams })
		if (!transport) {
			return null;
		}
		return transport;
	} 
	catch(err) {
		return null;
	}
};

export const getManyTransports = async (searchParams: SearchParams): Promise<Transport[] | null> => {
	try {
		const transports = await db.transport.findMany({ where: searchParams })
		if (!transports) {
			return null;
		}
		return transports;
	} 
	catch(err) {
		return null;
	}
};

export const getFirstTransport = async (searchParams: SearchParams): Promise<Transport | null> => {
	try {
		const transport = await db.transport.findFirst({ where: searchParams })
		if (!transport) {
			return null
		}

		return transport
	} catch (error) {
		return null;
	}
}

export const createTransport = async (data: any): Promise<Transport | null> => {
	try {
		console.error(data)
		const createdTransport = await db.transport.create({
			data: data
		})

		if (!createdTransport) {
			return null
		}
		return createdTransport
	} catch (error) {
		logger.error(`[createTransport] error: ${error}`)
		return null
	}
}

export const updateUniqueTransport = async (searchParams: UniqueSearchParams, data: any): Promise<Transport | null> => {
	try {
		const updatedTransport = await db.transport.update({
			where: searchParams,
			data: data
		})

		if (!updatedTransport) {
			return null
		}
		return updatedTransport
	} catch (error) {
		return null
	}
}