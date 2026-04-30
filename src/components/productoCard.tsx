type Producto = {
  id: number
  nombre: string
  precio: number
}

type Props = {
  producto: Producto
  onAgregar: (producto: Producto) => void
}

export const ProductoCard = ({ producto, onAgregar }: Props) => {
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>

      <button onClick={() => onAgregar(producto)}>
        Agregar
      </button>
    </div>
  )
}