import { useState } from "react"
import type { Cliente } from "../types/cliente"

type Props = {
    onSubmit: (cliente: Cliente) => void
}

export const ClienteForm = ({ onSubmit }: Props) => {
    const [cliente, setCliente] = useState<Cliente>({
        nombre: "",
        telefono: "",
        direccion: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!cliente.nombre || !cliente.telefono || !cliente.direccion) {
            alert("Completar todos los campos")
            return
        }

        onSubmit(cliente)
    }

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <h2>Datos del cliente</h2>

            <input 
                name="nombre"
                placeholder="Nombre"
                value={cliente.nombre}
                onChange={handleChange}
            />

            <input 
                name="telefono"
                placeholder="Teléfono"
                value={cliente.telefono}
                onChange={handleChange}
            />

            <input 
                name="direccion"
                placeholder="Dirección"
                value={cliente.direccion}
                onChange={handleChange}
            />

            <button type="submit">Confirmar pedido</button>
        </form>
    )
}