import { useEffect, useState } from "react"
import { getProducto, eliminarProducto, crearProducto, editarProducto } from "../api/producto"

import type { Producto } from "../types/producto"

export const Admin = () => {
    const [productos, setProductos] = useState<Producto[]>([])
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState(0)
    const [editandoId, setEditandoId] = useState<number | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducto()
            setProductos(data)
        }

        fetchData()
    }, [])

    const handleDelete = async (id: number) => {
        await eliminarProducto(id)
        const data = await getProducto()

        setProductos(data)
    }

    const handleCreate = async () => {

        if (!nombre || !precio) return

        if (editandoId) {
            await editarProducto(editandoId, { nombre, precio })
            setEditandoId(null)
        } else {
            await crearProducto({ nombre, precio })
        }

        const data = await getProducto()
        setProductos(data)
        setNombre("")
        setPrecio(0)
    }

    const handleCancelarEdicion = () => {
        setEditandoId(null)
        setNombre("")
        setPrecio(0)
    }

    return (
        <div className="adm">
 
            {/* Header */}
            <div className="adm-header">
                <div className="adm-header-left">
                    <div className="adm-logo-box">
                        {/* ícono o logo */}
                    </div>
                    <span className="adm-title">Rotisería — Admin</span>
                </div>
                <span className="adm-badge">Admin</span>
            </div>
 
            {/* Stats */}
            <div className="adm-stats">
                <div className="stat-card">
                    <div className="stat-label">Productos</div>
                    <div className="stat-value">{productos.length}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Pedidos hoy</div>
                    <div className="stat-value">—</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Total hoy</div>
                    <div className="stat-value">—</div>
                </div>
            </div>
 
            {/* Grid principal */}
            <div className="adm-grid">
 
                {/* Formulario crear/editar */}
                <div className="adm-card">
                    <div className="adm-card-title">
                        {editandoId ? "Editar producto" : "Nuevo producto"}
                    </div>
 
                    <div className="field-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            placeholder="Ej: Milanesa napolitana"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
 
                    <div className="field-group">
                        <label>Precio</label>
                        <input
                            type="number"
                            placeholder="Ej: 2500"
                            value={precio || ""}
                            onChange={(e) => setPrecio(Number(e.target.value))}
                        />
                    </div>
 
                    <button className="btn-crear" onClick={handleCreate}>
                        {editandoId ? "Guardar cambios" : "+ Crear producto"}
                    </button>
 
                    {editandoId && (
                        <button className="btn-cancelar" onClick={handleCancelarEdicion}>
                            Cancelar
                        </button>
                    )}
                </div>
 
                {/* Lista de productos */}
                <div className="adm-card">
                    <div className="adm-card-title">Productos</div>
 
                    <div className="prod-list">
                        {productos.length === 0 && (
                            <p style={{ fontSize: "13px", color: "#7a6450" }}>
                                No hay productos cargados.
                            </p>
                        )}
                        {productos.map((p) => (
                            <div key={p.id} className="prod-row">
                                <div className="prod-icon" />
                                <span className="prod-nombre">{p.nombre}</span>
                                <span className="prod-precio">${p.precio.toLocaleString("es-AR")}</span>
                                <button
                                    className="btn-del"
                                    title="Eliminar"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    🗑
                                </button>
                                <button onClick={() => {
                                    setEditandoId(p.id)
                                    setNombre(p.nombre)
                                    setPrecio(p.precio)
                                }}>
                                    Editar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
 
            </div>
        </div>
    )
}