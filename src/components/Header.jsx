import Navbar from "./Navbar";

function Header({ cantidadCarrito }) {
  return (
    <header>
      <Navbar cantidadCarrito={cantidadCarrito}/>
    </header>
  );
}

export default Header;
