
import { useState, useEffect  } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

import { productos } from "../data/productos";

function Productos({ agregarAlCarrito, carrito }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [orden, setOrden] = useState("ninguno");
  const [soloStock, setSoloStock] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState(null);

  function agregarProducto(producto) {
    const productoEnCarrito = carrito.find(
      (item) => item.id === producto.id
    );
    const cantidadActual = productoEnCarrito ? productoEnCarrito.cantidad : 0;
    if (cantidadActual >= producto.stock) {
      return;
    }
    agregarAlCarrito(producto);
    setProductoAgregado(producto.id);
  }
  useEffect(() => {
  if (productoAgregado === null) return;

  const temporizador = setTimeout(() => {
    setProductoAgregado(null);
  }, 1200);

  return () => clearTimeout(temporizador);
}, [productoAgregado]);

  const categorias = [
    ...new Set(productos.map((producto) => producto.categoria)),
  ];

  let productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "Todas" ||
      producto.categoria === categoria;

    const coincideStock =
      !soloStock || producto.stock > 0;

    return (
      coincideNombre &&
      coincideCategoria &&
      coincideStock
    );
  });

  if (orden === "menor") {
    productosFiltrados = [...productosFiltrados].sort(
      (a, b) => a.precio - b.precio
    );
  }

  if (orden === "mayor") {
    productosFiltrados = [...productosFiltrados].sort(
      (a, b) => b.precio - a.precio
    );
  }

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h1 className="fw-bold">Catálogo de videojuegos</h1>
        <p className="text-secondary">
          Encontrá tus clásicos favoritos de PlayStation 2.
        </p>
      </div>

      <Row className="g-3 mb-4">
        <Col xs={12} md={6}>
          <InputGroup>
            <InputGroup.Text>🔎</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col xs={12} sm={6} md={3}>
          <Form.Select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            aria-label="Filtrar por categoría"
          >
            <option value="Todas">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={12} sm={6} md={3}>
          <Form.Select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            aria-label="Ordenar por precio"
          >
            <option value="ninguno">Orden original</option>
            <option value="menor">Precio: menor a mayor</option>
            <option value="mayor">Precio: mayor a menor</option>
          </Form.Select>
        </Col>

        <Col xs={12}>
          <Form.Check
            type="checkbox"
            label="Mostrar solo productos con stock"
            checked={soloStock}
            onChange={(e) => setSoloStock(e.target.checked)}
          />
        </Col>
      </Row>

      <p className="text-secondary">
        Se encontraron {productosFiltrados.length} productos.
      </p>

      <Row className="g-4">
        {productosFiltrados.map((producto) => (
          <Col key={producto.id} xs={12} sm={6} lg={4} xl={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                  height: "220px",
                  objectFit: "contain",
                  padding: "12px",
                }}
              />

              <Card.Body className="d-flex flex-column">
                <Badge
                  bg={producto.stock > 0 ? "success" : "danger"}
                  className="align-self-start mb-2"
                >
                  {producto.stock > 0 ? `Stock: ${producto.stock}` : "Sin stock"}
                  
                </Badge>

                <Card.Subtitle className="mb-2 text-secondary">
                  {producto.categoria}
                </Card.Subtitle>

                <Card.Title>{producto.nombre}</Card.Title>

                <Card.Text>{producto.descripcion}</Card.Text>

                <h5 className="fw-bold mb-3">
                  ${producto.precio.toLocaleString("es-AR")}
                </h5>

                <div className="mt-auto d-grid gap-2">
                  <Button
                    as={Link}
                    to={`/productos/${producto.id}`}
                    variant="outline-primary"
                  >
                    Ver detalle
                  </Button>

                  <Button variant="primary" disabled={ producto.stock === 0 || (carrito.find((item) => item.id === producto.id)?.cantidad ?? 0) >= producto.stock } onClick={() => agregarProducto(producto)}>
                  {producto.stock === 0 ? "Sin stock" : (carrito.find((item) => item.id === producto.id)?.cantidad ?? 0) >= producto.stock ? "Stock máximo alcanzado" : "Agregar al carrito"}
                </Button>
                  {productoAgregado === producto.id && (
                    <Alert variant="success" className="mt-2 mb-0 py-2 text-center">
                      ¡Producto agregado al carrito!
                    </Alert>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {productosFiltrados.length === 0 && (
        <div className="text-center py-5">
          <h4>No encontramos juegos</h4>
          <p>Probá cambiar la búsqueda o los filtros.</p>
          <Button
            variant="outline-primary"
            onClick={() => {
              setBusqueda("");
              setCategoria("Todas");
              setOrden("ninguno");
              setSoloStock(false);
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Productos;
