import React, { useState } from "react";
import { login } from "../api/auth";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const data = await login(email, password)
            console.log("respuesta completa", data)
            saveAuth(data.token, data.rol)

            if (data.rol === "admin") {
                navigate("/admin")
            } else {
                navigate("/empleado")
            }

        } catch (err) {
            console.log(err)
            setError("Login incorrecto")
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">
                    <div className="login-logo-icon" />
                    <span className="login-logo-text">Rotisería</span>
                </div>

                <h1 className="login-titulo">Bienvenido</h1>
                <p className="login-subtitulo">Ingresá para continuar</p>

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="juan@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button type="submit" className="btn-login">Ingresar</button>
                </form>
            </div>
        </div>
    )
}