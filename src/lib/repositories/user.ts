import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { User } from "@prisma/client";

export const getUserByUsername = async (username: string): Promise<User | null> => {
	try {
		const user = await db.user.findFirst({ where: { username: username } });
		if (!user) {
			return null;
		}

		return user;
	} 
	catch(err) {
		return null;
	}
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
	try {
		const user = await db.user.findUnique({ where: { email: email } });
		if (!user) {
			return null;
		}

		return user;
	} 
	catch(err) {
		return null;
	}
};

export const getUserByID = async (userID: string): Promise<User | null> => {
	try {
        const user = await db.user.findUnique({ where: { id: userID } });
		if (!user) {
			return null;
		}

        return user;
    } 
    catch(err) {
        return null;
    }
};