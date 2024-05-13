"use client"

import React from "react"
import Cookies from "universal-cookie"


export function useSession() {
    const [auth, setAuth] = React.useState<any>(true);
    const getVerifiedToken = async () => {
        const cookies = new Cookies();
        const token = cookies.get("access_token") ?? null;
        setAuth(token);
    };
    React.useEffect(() => {
        getVerifiedToken();
    }, []);
    return auth;
}