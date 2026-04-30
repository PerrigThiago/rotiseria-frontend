type CarritoItem = {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

type Props = {
  carrito: CarritoItem[]
  total: number
  onFinalizar: () => void
}

export const Carrito = ({ carrito, total, onFinalizar }: Props) => {
  return (
    <div>
      <h2>Carrito</h2>

      {carrito.length === 0 ? (
        <p>Carrito vacío</p>
      ) : (
        carrito.map((item) => (
          <div key={item.id}>
            <p>{item.nombre}</p>
            <p>Cantidad: {item.cantidad}</p>
            <p>${item.precio * item.cantidad}</p>
          </div>
        ))
      )}

      <h3>Total: ${total}</h3>

      <button onClick={onFinalizar}>
        Finalizar compra
      </button>
    </div>
  )
}