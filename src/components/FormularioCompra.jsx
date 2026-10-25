import { useState } from "react";
import { useNavigate } from "react-router-dom";
function FormularioCompra({ confirmarCompra }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    metodoEntrega: "",
    direccion: "",
    altura: "",
    departamento: "",
    entreCalles: "",
    codigoPostal: "",
    ciudad: "",
    provincia: "",
    medioPago: "",
    observaciones: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "telefono" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((datosActuales) => {
      if (name === "metodoEntrega" && value === "Retiro en tienda") {
        return {
          ...datosActuales,
          metodoEntrega: value,
          direccion: "",
          altura: "",
          departamento: "",
          entreCalles: "",
          codigoPostal: "",
          ciudad: "",
          provincia: "",
        };
      }

      return {
        ...datosActuales,
        [name]: value,
      };
    });

    setErrors((erroresActuales) => ({
      ...erroresActuales,
      [name]: "",
      ...(name === "metodoEntrega"
        ? {
            direccion: "",
            altura: "",
            codigoPostal: "",
            ciudad: "",
            provincia: "",
          }
        : {}),
    }));

  }

  function validateForm() {
    const newErrors = {};

    if (formData.nombre.trim() === "") {
      newErrors.nombre = "Ingresá tu nombre y apellido.";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Ingresá tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresá un correo electrónico válido.";
    }

    if (formData.telefono.trim() === "") {
      newErrors.telefono = "Ingresá tu teléfono.";
    }else if (!/^\d{10,15}$/.test(formData.telefono)) {
    newErrors.telefono = "El teléfono debe tener entre 10 y 15 dígitos.";
  }

    if (formData.metodoEntrega === "") {
      newErrors.metodoEntrega = "Seleccioná un método de entrega.";
    }
    // Validaciones exclusivas de envío a domicilio
    if (formData.metodoEntrega === "Envío a domicilio") {
      if (formData.direccion.trim() === "") {
        newErrors.direccion = "Ingresá el nombre de la calle.";
      }

      if (formData.altura.trim() === "") {
        newErrors.altura = "Ingresá la altura.";
      }

      if (formData.codigoPostal.trim() === "") {
        newErrors.codigoPostal = "Ingresá el código postal.";
      }

      if (formData.ciudad.trim() === "") {
        newErrors.ciudad = "Ingresá la ciudad.";
      }

      if (formData.provincia.trim() === "") {
        newErrors.provincia = "Ingresá la provincia.";
      }
    }

    if (formData.medioPago === "") {
      newErrors.medioPago = "Seleccioná un medio de pago.";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const compraExitosa = confirmarCompra(formData);

      if (compraExitosa) {
        navigate("/confirmacion-compra", { replace: true, state: { compraRealizada: true },});
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h5 className="fw-semibold mb-3">Información personal</h5>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre y apellido *
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingresá tu nombre y apellido"
        />
        {errors.nombre && (
          <div className="invalid-feedback">{errors.nombre}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Correo electrónico *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="telefono" className="form-label">
          Teléfono *
        </label>
        <input
          id="telefono"
          name="telefono"
          type="text"
          inputMode="numeric"
          className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Ej. 1112345678"
        />
        {errors.telefono && (
          <div className="invalid-feedback">{errors.telefono}</div>
        )}
      </div>
      <hr className="my-4" />
      <h5 className="fw-semibold mb-3">Información de entrega</h5>
      <div className="mb-3">
        <label htmlFor="metodoEntrega" className="form-label">
          Método de entrega *
        </label>
        <select
          id="metodoEntrega"
          name="metodoEntrega"
          className={`form-select ${errors.metodoEntrega ? "is-invalid" : ""}`}
          value={formData.metodoEntrega}
          onChange={handleChange}
        >
          <option value="">Seleccioná una opción</option>
          <option value="Envío a domicilio">Envío a domicilio</option>
          <option value="Retiro en tienda">Retiro en tienda</option>
        </select>
        {errors.metodoEntrega && (
          <div className="invalid-feedback">
            {errors.metodoEntrega}
          </div>
        )}
      </div>
      {formData.metodoEntrega === "Envío a domicilio" && (
        <div className="border rounded p-3 mb-4">
          <h5 className="mb-3">Dirección de entrega</h5>
          <div className="row g-3">
            <div className="col-md-8">
              <label htmlFor="direccion" className="form-label">
                Dirección *
              </label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                className={`form-control ${errors.direccion ? "is-invalid" : ""}`}
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Nombre de la calle"
              />
              {errors.direccion && (
                <div className="invalid-feedback">{errors.direccion}</div>
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="altura" className="form-label">
                Altura *
              </label>
              <input
                id="altura"
                name="altura"
                type="text"
                inputMode="numeric"
                className={`form-control ${errors.altura ? "is-invalid" : ""}`}
                value={formData.altura}
                onChange={handleChange}
                placeholder="Ej. 1234"
              />
              {errors.altura && (
                <div className="invalid-feedback">{errors.altura}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="departamento" className="form-label">
                Piso y departamento (opcional)
              </label>
              <input
                id="departamento"
                name="departamento"
                type="text"
                className="form-control"
                value={formData.departamento}
                onChange={handleChange}
                placeholder="Ej. Piso 3, departamento B"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="entreCalles" className="form-label">
                Entre calles (opcional)
              </label>
              <input
                id="entreCalles"
                name="entreCalles"
                type="text"
                className="form-control"
                value={formData.entreCalles}
                onChange={handleChange}
                placeholder="Ej. Calle A y Calle B"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="codigoPostal" className="form-label">
                Código postal *
              </label>
              <input
                id="codigoPostal"
                name="codigoPostal"
                type="text"
                className={`form-control ${errors.codigoPostal ? "is-invalid" : ""}`}
                value={formData.codigoPostal}
                onChange={handleChange}
                placeholder="Ej. 1688"
              />
              {errors.codigoPostal && (
                <div className="invalid-feedback">{errors.codigoPostal}</div>
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="ciudad" className="form-label">
                Ciudad *
              </label>
              <input
                id="ciudad"
                name="ciudad"
                type="text"
                className={`form-control ${errors.ciudad ? "is-invalid" : ""}`}
                value={formData.ciudad}
                onChange={handleChange}
                placeholder="Ej. Villa Tesei"
              />
              {errors.ciudad && (
                <div className="invalid-feedback">{errors.ciudad}</div>
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="provincia" className="form-label">
                Provincia *
              </label>
              <input
                id="provincia"
                name="provincia"
                type="text"
                className={`form-control ${errors.provincia ? "is-invalid" : ""}`}
                value={formData.provincia}
                onChange={handleChange}
                placeholder="Ej. Buenos Aires"
              />
              {errors.provincia && (
                <div className="invalid-feedback">{errors.provincia}</div>
              )}
            </div>
          </div>
        </div>
      )}
      {formData.metodoEntrega === "Retiro en tienda" && (
        <div className="alert alert-info mb-4">
          <h6 className="fw-bold mb-3">Retiro en tienda</h6>
          <p className="mb-2">
            Podés retirar tus videojuegos en nuestra tienda ubicada en:
          </p>
          <p className="mb-3">
            <strong>
              Tte. Manuel Origone 151, Villa Tesei, Buenos Aires.
            </strong>
          </p>
          <p className="mb-1">
            <strong>Horarios de atención:</strong>
          </p>
          <p className="mb-1">
            Lunes a viernes de 9:00 a 18:00 hs.
          </p>
          <p className="mb-0">
            Sábados de 9:00 a 13:00 hs.
          </p>
        </div>
      )}
      <hr className="my-4" />
      <h5 className="fw-semibold mb-3">Información de pago</h5>
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Medio de pago *
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="medioPago"
            id="transferencia"
            value="Transferencia"
            checked={formData.medioPago === "Transferencia"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="transferencia">
            Transferencia
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="medioPago"
            id="efectivo"
            value="Efectivo"
            checked={formData.medioPago === "Efectivo"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="efectivo">
            Efectivo
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="medioPago"
            id="tarjeta"
            value="Tarjeta de crédito o débito"
            checked={formData.medioPago === "Tarjeta de crédito o débito"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="tarjeta">
            Tarjeta de crédito o débito
          </label>
        </div>

        {errors.medioPago && (
          <div className="text-danger small mt-2">
            {errors.medioPago}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="observaciones" className="form-label">
          Observaciones (opcional)
        </label>
        <textarea
          id="observaciones"
          name="observaciones"
          rows="3"
          className="form-control"
          value={formData.observaciones}
          onChange={handleChange}
          placeholder="¿Querés dejarnos alguna indicación adicional sobre tu pedido?"
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-lg">
          Finalizar compra
        </button>
      </div>
    </form>
  );
}

export default FormularioCompra;