export const saveAuth = (token: string, rol: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("rol", rol)
}

export const getToken = () => {
    return localStorage.getItem("token")
}

export const getRol = () => {
    return localStorage.getItem("rol")
}

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("rol")
}