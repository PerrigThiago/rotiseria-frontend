import { Home } from "./pages/home"
import { getToken } from "./utils/auth"
import { Login } from "./components/login"

import "./index.css"

function App() {
  const token = getToken()

  if (!token) {
    return <Login />
  }
  
  return <Home />
}

export default App