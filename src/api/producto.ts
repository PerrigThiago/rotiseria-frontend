import { getToken } from "../utils/auth"

export const getProducto = async () => {
  const res = await fetch("http://localhost:3000/productos", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return res.json()
}