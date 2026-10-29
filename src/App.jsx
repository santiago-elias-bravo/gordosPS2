import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import NotFound from "./pages/NotFound";
import FinalizarCompra from "./pages/FinalizarCompra";
import ConfirmacionCompra from "./pages/ConfirmacionCompra";
import SobreNosotros from "./pages/SobreNosotros";
import { productos } from "./data/productos";
import ScrollToTop from "./components/ScrollToTop";

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
            (producto) => producto.id === item.id,
          );

          if (!productoActual || productoActual.stock <= 0) {
            return null;
          }

          if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
            return null;
          }

          const cantidadValidada = Math.min(
            item.cantidad,
            productoActual.stock,
          );

          return { ...productoActual, cantidad: cantidadValidada };
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
      const cuponGuardado = localStorage.getItem("cuponAplicado") === "true";

      return carrito.length > 0 && cuponGuardado;
    } catch (error) {
      console.error("Error al recuperar el cupón:", error);
      return false;
    }
  });

  const [compraConfirmada, setCompraConfirmada] = useState(() => {
    try {
      const compraGuardada = sessionStorage.getItem("compraConfirmada");
      return compraGuardada ? JSON.parse(compraGuardada) : null;
    } catch (error) {
      console.error("Error al recuperar la compra:", error);
      return null;
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
    0,
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
    const carritoActualizado = carrito.filter((item) => item.id !== id);

    setCarrito(carritoActualizado);

    if (carritoActualizado.length === 0) {
      setCuponAplicado(false);
    }
  }

  function confirmarCompra(datosCliente) {
    if (carrito.length === 0) {
      return false;
    }

    const subtotal = carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0,
    );

    const descuento = cuponAplicado ? subtotal * 0.1 : 0;
    const totalFinal = subtotal - descuento;

    const compra = {
      productos: carrito.map((producto) => ({ ...producto })),
      cliente: { ...datosCliente },
      cantidadProductos: carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0,
      ),
      subtotal: subtotal,
      descuento: descuento,
      total: totalFinal,
      cupon: cuponAplicado ? "GORDOFF10" : null,
      fecha: new Date().toLocaleString("es-AR"),
    };

    try {
      sessionStorage.setItem("compraConfirmada", JSON.stringify(compra));
    } catch (error) {
      console.error("Error al guardar la confirmación:", error);
    }

    setCompraConfirmada(compra);
    setCarrito([]);
    setCuponAplicado(false);
    return true;
  }

  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem("modoOscuro") === "true";
  });

  useEffect(() => {
    localStorage.setItem("modoOscuro", modoOscuro);
  }, [modoOscuro]);

  return (
    <div className={`app-container ${modoOscuro ? "modo-oscuro" : ""}`}>
      <ScrollToTop />
      <Header
        cantidadCarrito={cantidadTotal}
        modoOscuro={modoOscuro}
        cambiarModo={() => setModoOscuro(!modoOscuro)}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route
            path="/videojuegos"
            element={
              <Productos
                agregarAlCarrito={agregarAlCarrito}
                carrito={carrito}
              />
            }
          />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route
            path="/videojuegos/:id"
            element={
              <DetalleProducto
                agregarAlCarrito={agregarAlCarrito}
                carrito={carrito}
              />
            }
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
            element={
              <FinalizarCompra
                carrito={carrito}
                cuponAplicado={cuponAplicado}
                confirmarCompra={confirmarCompra}
              />
            }
          />
          <Route
            path="/confirmacion-compra"
            element={<ConfirmacionCompra compra={compraConfirmada} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
