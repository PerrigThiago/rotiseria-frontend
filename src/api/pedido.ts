import type { CrearPedidoDTO, PedidoResponse } from "../types/pedido"

export const crearPedido = async (
  pedido: CrearPedidoDTO
): Promise<PedidoResponse> => {

  console.log(pedido)
  const res = await fetch("http://localhost:3000/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pedido)
  })

  if (!res.ok) {
    throw new Error("Error al crear pedido")
  }

  return res.json()
}