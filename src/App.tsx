import { useEffect, useState } from "react"
import { obtenerProducto } from "./api/producto"

type Producto = {
  id: number
  nombre: string
  precio: number
}

function App() {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    obtenerProducto().then(setProductos)
  }, [])

  return (
    <div>
      <h1>Rotisería</h1>

      {productos.map((p) => (
        <div key={p.id}>
          <h3>{p.nombre}</h3>
          <p>${p.precio}</p>
          <button>Agregar</button>
        </div>
      ))}
    </div>
  )
}

export default App