import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";

export const getVerificationTokenByToken = async (
	token: string
): Promise<VerificationToken | null> => {
	try {
		const verificationToken = await db.verificationToken.findFirst({
			where: { token: token }
		});

		return verificationToken;
	} catch {
		return null;
	}
}

export const getVerificationTokenByEmail = async (
	email: string
) => {
	try {
		const verificationToken = await db.verificationToken.findFirst({
			where: { email: email }
		});

		return verificationToken;
	} catch {
		return null;
	}
}
