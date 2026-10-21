import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const productoEnCarrito = carritoActual.find(
        (item) => item.id === producto.id,
      );

      const cantidadActual = productoEnCarrito ? productoEnCarrito.cantidad : 0;

      if (cantidadActual >= producto.stock) {
        return carritoActual;
      }

      if (productoEnCarrito) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  }

  function cambiarCantidad(id, nuevaCantidad) {
    const producto = carrito.find((item) => item.id === id);

    if (!producto) return;

    if (nuevaCantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }

    if (nuevaCantidad > producto.stock) return;

    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item,
      ),
    );
  }
  function eliminarDelCarrito(id) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id),
    );
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/productos"
          element={<Productos agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route
          path="/productos/:id"
          element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route path="/contacto" element={<Contacto />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              cambiarCantidad={cambiarCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
