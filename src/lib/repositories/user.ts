import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { User } from "@prisma/client";

export const getUserByUsername = async (username: string): Promise<User | null> => {
	try {
		const user = await db.user.findUnique({ where: { username } });
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
		const user = await db.user.findUnique({ where: { email } });
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
		console.log(userID);
        const user = await db.user.findUnique({ where: { id: userID } });
		console.log(user);
		if (!user) {
			return null;
		}

        return user;
    } 
    catch(err) {
		console.log(err);
        return null;
    }
};