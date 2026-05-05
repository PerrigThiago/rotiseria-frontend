import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/home"
import { Admin } from "./pages/admin"
import { Empleado } from "./pages/empleado"

import { ProtectedRoute } from "./components/protectedRoute"
import { Login } from "./components/login"

function App() {
  return (
    <Routes>

      {/* públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* protegidas */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/empleado"
        element={
          <ProtectedRoute roles={["empleado"]}>
            <Empleado />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App