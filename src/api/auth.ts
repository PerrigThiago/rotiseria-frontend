export const login = async (email: string, password: string) => {
    const res = await fetch("Http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content_Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
        throw new Error("Credenciales incorrectas")
    }

    return res.json()
}