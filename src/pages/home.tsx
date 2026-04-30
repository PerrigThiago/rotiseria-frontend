import { useEffect, useState } from "react"
import { getProducto } from "../api/producto"
import { crearPedido } from "../api/pedido"
import { ProductoCard } from "../components/productoCard"
import { Carrito } from "../components/carrito"

type Producto = {
  id: number
  nombre: string
  precio: number
}

type CarritoItem = {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

export const Home = () => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [carrito, setCarrito] = useState<CarritoItem[]>([])

  useEffect(() => {
    getProducto().then(setProductos)
  }, [])

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id)

      if (existe) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      }

      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  )

  const finalizarCompra = async () => {
    if (carrito.length === 0) return

    const pedido = {
      cliente: {
        nombre: "Cliente Web",
        telefono: "000",
        direccion: "Sin direccion"
      },
      carrito: carrito.map((item) => ({
        id: item.id,
        cantidad: item.cantidad
      }))
    }

    await crearPedido(pedido)

    alert("Pedido realizado")
    setCarrito([])
  }

  return (
    <div>
      <h1>Rotisería</h1>

      <h2>Productos</h2>

      {productos.map((p) => (
        <ProductoCard
          key={p.id}
          producto={p}
          onAgregar={agregarAlCarrito}
        />
      ))}

      <Carrito
        carrito={carrito}
        total={total}
        onFinalizar={finalizarCompra}
      />
    </div>
  )
}