import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import NotFound from "./pages/NotFound";
import FinalizarCompra from "./pages/FinalizarCompra";
import ConfirmacionCompra from "./pages/ConfirmacionCompra";
import { productos } from "./data/productos";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [carrito, setCarrito] = useState(() => {
    try {
    const carritoGuardado = localStorage.getItem("carrito");
    if (!carritoGuardado) {
      return [];
    }
    const productosGuardados = JSON.parse(carritoGuardado);
    if (!Array.isArray(productosGuardados)) {
      return [];
    }
    const carritoValidado = productosGuardados
      .map((item) => {
        const productoActual = productos.find(
          (producto) => producto.id === item.id
        );

        if (!productoActual || productoActual.stock <= 0) {
          return null;
        }

        if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
          return null;
        }

        const cantidadValidada = Math.min(item.cantidad,productoActual.stock);

        return {...productoActual,cantidad: cantidadValidada};
      })
      .filter((item) => item !== null);

    return carritoValidado;

  } catch (error) {
    console.error("Error al recuperar el carrito:", error);
    return [];
  }
  });

  const [cuponAplicado, setCuponAplicado] = useState(() => {
    try {
      const cuponGuardado =
        localStorage.getItem("cuponAplicado") === "true";

      return carrito.length > 0 && cuponGuardado;
    } catch (error) {
      console.error("Error al recuperar el cupón:", error);
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (error) {
      console.error("Error al guardar el carrito:", error);
    }
  }, [carrito]);

  useEffect(() => {
    try {
      localStorage.setItem("cuponAplicado", JSON.stringify(cuponAplicado));
    } catch (error) {
      console.error("Error al guardar el cupón:", error);
    }
  }, [cuponAplicado]);
  
  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

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
        return carritoActual.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,);
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
    const carritoActualizado = carrito.filter(
      (item) => item.id !== id
    );

    setCarrito(carritoActualizado);

    if (carritoActualizado.length === 0) {
      setCuponAplicado(false);
    }
  }
  return (
    <>
      <Header cantidadCarrito={cantidadTotal}/>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/videojuegos"
          element={<Productos agregarAlCarrito={agregarAlCarrito} carrito={carrito}/>}
        />
        <Route
          path="/videojuegos/:id"
          element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} carrito={carrito}/>}
        />
        <Route path="/contacto" element={<Contacto />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              cambiarCantidad={cambiarCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
              cuponAplicado={cuponAplicado}
              setCuponAplicado={setCuponAplicado}
            />
          }
        />
        <Route
          path="/finalizar-compra"
          element={<FinalizarCompra carrito={carrito} />}
        />
        <Route
          path="/confirmacion-compra"
          element={<ConfirmacionCompra />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
