import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string): Promise<User | null> => {
	try {
		const user = await db.user.findUnique({ where: { email } });

		return user;
	} 
	catch(err) {
		logger.log({
			level: "error",
            message: `Error in getUserByEmail: ${ err }`,
		});
		return null;
	}
};