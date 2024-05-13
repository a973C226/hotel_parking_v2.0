import { getUserByID } from "@/lib/repositories/user";
import { isAuthenticated } from "@/lib/utils/tokenControl";
import { NextRequest } from "next/server";


export const useCurrentUser = async (req: NextRequest) => {
    const { userID } = await isAuthenticated(req);
    if (!userID) {
        return null;
    }
    const user = await getUserByID(userID);

    return user;
};
