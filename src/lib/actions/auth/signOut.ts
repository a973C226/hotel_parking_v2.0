"use client"
const SignOut = async () => {
    localStorage.removeItem("access-token")
    localStorage.removeItem("refresh-token")
}

export { SignOut }