import { useState, useEffect } from "react";
import * as PedidosServices from "../services/pedidos.services.js";
import { useNavigate } from "react-router-dom";

function NuevoPedido() {
  const [fecha, setFecha] = useState("");
  const [productos, setProductos] = useState([]);
  const [productoActual, setProductoActual] = useState({ nombre: "", cantidad: "", precio: 0, subtotal: 0 });
  const navigate = useNavigate();
  const [exito, setExito] = useState(false);

    // Efecto para establecer la fecha actual al cargar el componente  
    useEffect(() => { const hoy = new Date().toISOString().split('T')[0]; 
    setFecha(hoy);  }, []);

  function changeFecha(e) {
    setFecha(e.target.value);
  }

  function changeProducto(e) {
    setProductoActual({ ...productoActual, [e.target.name]: e.target.value });
  }

  function agregarProducto() {
    if (productoActual.nombre && productoActual.cantidad && productoActual.precio) {
      setProductos([...productos, productoActual]);
      setProductoActual({ nombre: "", cantidad: "", precio: 0,  subtotal: 0 }); // Reiniciar el formulario del producto
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    const nuevoPedido = { fecha, productos };
    console.log(nuevoPedido)

    PedidosServices.create(nuevoPedido)
      .then(() => {
        console.log("Pedido agregado");
        setExito(true);
        navigate("/"); // Redirigir a la home
      })
      .catch((error) => {
        console.error("Error al agregar el pedido:", error);
      });
  }

  return (
    <div className="section-agregar">
      <h1>NUEVO PEDIDO</h1>
      <section className="contenedor-agregar">
      <div className="form-agregar">
      <form onSubmit={onSubmit}>
        <div>
          <label>Fecha</label>
          <input type="date" name="fecha" onChange={changeFecha} value={fecha} required />
        </div>
        <h2>Agregar productos</h2>
        <div>
          <label>Producto</label>
          <input type="text" name="nombre" onChange={changeProducto} value={productoActual.nombre} />
        </div>
        <div>
          <label>Cantidad x Kg o x bolsa</label>
          <input type="number" name="cantidad" onChange={changeProducto} value={productoActual.cantidad} />
        </div>
        <div>
          <label>Precio x Kg o x bolsa</label>
          <input type="number" name="precio" onChange={changeProducto} value={productoActual.precio} />
        </div>
        <button type="button" onClick={agregarProducto}>Añadir Producto</button>
        <button type="submit">Guardar Pedido</button>
      </form>
      </div>
      <div className="ticket">
      <h3>TICKET DE COMPRA</h3>
        <ul>
          {productos.map((p, index) => (
            <div className="div-ticket">
            <li key={index}>{p.nombre} x {p.cantidad} subtotal: ${p.precio * p.cantidad}</li>
            </div>
          ))}
        </ul>
        {productos.length === 0 && <li className="div-ticket">Sin productos todavía</li>}
        <div className="total">
        <h4>Total: ${productos.reduce((total, p) => total + (p.precio * p.cantidad), 0)}</h4>
        </div>
      </div>
      </section>
    </div>
  );
}

export default NuevoPedido;