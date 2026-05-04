export const getProducto = async () => {
  const res = await fetch("http://localhost:3000/productos")
  return res.json()
}