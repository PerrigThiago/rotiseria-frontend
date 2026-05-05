import React, { useState } from "react";
import { login } from "../api/auth";
import { saveAuth } from "../utils/auth";

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const data = await login(email, password)

            saveAuth(data.token, data.rol)

            if (data.rol === "admin") {
                window.location.href = "/admin"
            } else {
                window.location.href = "/empleado"
            }

        } catch (err) {
            console.log(err)
            setError("Login incorrecto")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Ingresar</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    )
}