export type CrearPedidoDTO = {
  cliente: {
    nombre: string
    telefono: string
    direccion: string
  }
  carrito: {
    id: number
    cantidad: number
  }[]
}

export type PedidoResponse = {
  id: number
  total: number
  fecha: string
}