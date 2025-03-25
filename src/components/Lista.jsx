import { useState, useEffect } from "react"
import *as PedidosServices from '../services/pedidos.services.js'
import { Link } from 'react-router-dom'


function Lista () {

    const [productos, setProductos] = useState([])

    function formatearFecha(fechaString) {
        const [year, month, day] = fechaString.split("-");
        return `${day}/${month}/${year}`;
    }
    

    useEffect(()=>{
        PedidosServices.traerPedidos()
        .then(data => {
            if (Array.isArray(data)) {
            setProductos(data);
            } else {
            console.error("Error: la API no devolvió un array", data);
            setProductos([]); // Evita errores con .map()
            }
        })
        .catch(err => {
            console.error("Error en PedidosServices.find():", err);
            setProductos([]); // Evita errores con .map()
        });
    }, []);

    return (
    <section className="section-tabla">
        <table className="tabla-lista">
            <thead>
                <tr>
                    <th>FECHA DE PEDIDO</th>
                    <th>ACCIONES</th>
                </tr>
            </thead>
            <tbody>      
            {Array.isArray(productos) ? (
            productos.map(({ _id, fecha}) => (
                <tr key={_id}>
                    <Link to={`/pedido/${_id}/ver`}>
                    <td data-label="Fecha" className="fecha">{formatearFecha(fecha)}</td>
                    <td className="acciones">
                    <div>
                    <Link to={`/pedido/${_id}/ver`}>
                        <img src="/img/external-link.svg" alt="Editar" />
                        Ver
                    </Link>
                    </div>
                    <div>
                    <Link to={`/pedido/${_id}/edit`}>
                        <img src="/img/editar.svg" alt="Editar" />
                        Editar
                    </Link>
                    </div>
                    <div>
                    <Link to={`/pedido/${_id}/delete`}>
                        <img src="/img/eliminar.svg" alt="Eliminar" />
                        Eliminar
                    </Link>
                    </div>
                    </td>
                    </Link>
                </tr>
            ))
            ) : (
            <tr>
                <td colSpan="5">No hay productos disponibles</td>
            </tr>
            )}
            </tbody>
        </table>
        </section>
    )

}

export default Lista