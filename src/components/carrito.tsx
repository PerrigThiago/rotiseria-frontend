type CarritoItem = {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

type Props = {
  carrito: CarritoItem[]
  total: number
  onSumar: (id: number) => void
  onRestar: (id: number) => void
  onEliminar: (id: number) => void
  onVaciar: () => void
  onFinalizar: () => void
}

export const Carrito = ({
  carrito,
  total,
  onSumar,
  onRestar,
  onEliminar,
  onVaciar,
  onFinalizar
}: Props) => {
  return (
    <div className="carrito">
      <h2>Carrito</h2>

      {carrito.length === 0 ? (
        <p>Carrito vacío</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id} className="carrito-item">
              <span className="carrito-item-nombre">{item.nombre}</span>

              <div className="qty-ctrl">
                <button className="qty-btn" onClick={() => onRestar(item.id)}>−</button>
                <span className="qty-num">{item.cantidad}</span>
                <button className="qty-btn" onClick={() => onSumar(item.id)}>+</button>
              </div>

              <span className="carrito-item-precio">${item.precio * item.cantidad}</span>

              <button className="del-btn" onClick={() => onEliminar(item.id)}>
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4h10M6 4V3h4v1M5 4v8h6V4H5z"
                    stroke="#E24B4A" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}

          <div className="carrito-total-row">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <div className="carrito-acciones">
            <button onClick={onVaciar} className="btn-secondary">
              Vaciar carrito
            </button>
            <button onClick={onFinalizar} className="btn-primary">
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  )
}