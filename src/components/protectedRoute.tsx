import { Navigate } from "react-router-dom";
import { getToken, getRol } from "../utils/auth";
import type { JSX } from "react";

type Props = {
    children: JSX.Element
    roles?: string[]
}

export const ProtectedRoute = ({ children, roles }: Props) => {
    const token = getToken()
    const rol = getRol()

    console.log("token:", token)
    console.log("rol:", rol)
    console.log("roles requeridos:", roles)
    console.log("includes:", roles?.includes(rol ?? ""))

    if (!token || !rol) {
        return <Navigate to="/login" />
    }

    if (roles && !roles.includes(rol)) {
        return <Navigate to="/unauthorized" />
    }

    return children
}