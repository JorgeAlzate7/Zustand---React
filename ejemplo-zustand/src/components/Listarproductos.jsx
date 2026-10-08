import { useState, useEffect } from 'react'
import { useCarritoStore } from '../store/useCarritoStore'

function Listarproductos() {
  // Estado local para guardar los productos de la API y el estado de carga
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)

  const agregarProducto = useCarritoStore((state) => state.agregarProducto)

  // Consultamos la API cuando el componente se carga por primera vez
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        // Adaptamos las propiedades que vienen de la API a las que usa nuestra App
        const productosAdaptados = data.slice(0, 6).map((prod) => ({
          id: prod.id,
          nombre: prod.title, // La API usa 'title', lo convertimos a 'nombre'
          precio: Math.round(prod.price * 4000), // La API entrega el precio en USD, lo convertimos a COP aprox.
        }))

        setProductos(productosAdaptados)
        setCargando(false)
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error)
        setCargando(false)
      })
  }, [])

  // Mensaje de espera mientras los datos llegan desde la API
  if (cargando) {
    return (
      <section className="panel">
        <h2>Catálogo de Productos</h2>
        <p className="vacio">Cargando productos desde la API...</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Catálogo de Productos</h2>
      {productos.map((producto) => (
        <div key={producto.id} className="fila">
          <div>
            <p className="fila-nombre">{producto.nombre}</p>
            <p className="fila-detalle">
              ${producto.precio.toLocaleString('es-CO')}
            </p>
          </div>
          <button
            className="btn btn-primario"
            onClick={() => agregarProducto(producto)}
          >
            Agregar
          </button>
        </div>
      ))}
    </section>
  )
}

export default Listarproductos