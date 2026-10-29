import Navbar from "./Navbar";

function Header({ cantidadCarrito, modoOscuro, cambiarModo }) {
  return (
    <header>
      <Navbar
        cantidadCarrito={cantidadCarrito}
        modoOscuro={modoOscuro}
        cambiarModo={cambiarModo}
      />
    </header>
  );
}

export default Header;