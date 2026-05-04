import { useEffect, useState } from "react"
import { getProducto } from "../api/producto"
import { crearPedido } from "../api/pedido"
import { ProductoCard } from "../components/productoCard"
import { Carrito } from "../components/carrito"
import { ClienteForm } from "../components/clienteForm"

import type { CrearPedidoDTO } from "../types/pedido"

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

  const finalizarCompra = async (clienteData: any) => {
    if (carrito.length === 0) {
      alert("Carrito vacío")
      return
    }

    const pedido: CrearPedidoDTO = {
      cliente: clienteData,
      carrito: carrito.map((item) => ({
        id: item.id,
        cantidad: item.cantidad
      }))
    }

    await crearPedido(pedido)

    alert("Pedido realizado")
    setCarrito([])
  }

  const sumarCantidad = (id: number) => {
    setCarrito((prev) =>
      prev.map((p) => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p)
    )
  }

  const restarCantidad = (id: number) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, cantidad: p.cantidad - 1 }
          : p
      ).filter((p) => p.cantidad > 0)
    )
  }

  const eliminarItem = (id: number) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  return (
    <div className="container">
      <h1>Rotisería</h1>

      <h2>Productos</h2>

      <div className="productos">
        {productos.map((p) => (
          <ProductoCard
            key={p.id}
            producto={p}
            onAgregar={agregarAlCarrito}
          />
        ))}
      </div>

      <Carrito
        carrito={carrito}
        total={total}
        onSumar={sumarCantidad}
        onRestar={restarCantidad}
        onEliminar={eliminarItem}
        onVaciar={vaciarCarrito}
        onFinalizar={() => { }}
      />

      <ClienteForm onSubmit={finalizarCompra} />
    </div>
  )
}