import Encabezado from './components/Encabezado.jsx'
import ListaProductos from './components/Listarproductos.jsx'
import Carrito from './components/Carrito.jsx'

function App() {
  return (
    <div className="app">
      <Encabezado />
      <main className="contenido">
        <ListaProductos />
        <Carrito />
      </main>
    </div>
  )
}

export default App