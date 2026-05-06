import { getToken } from "../utils/auth"
import type { Producto } from "../types/producto"


const API = "http://localhost:3000/productos"

export const getProducto = async (): Promise<Producto[]> => {
  const res = await fetch(API)
  return res.json()
}

export const crearProducto = async (
  producto: Omit<Producto, "id">
): Promise<Producto> => {
  const token = getToken()

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(producto)
  })

  return res.json()
}

export const eliminarProducto = async (id: number) => {
  const token = getToken()

  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}