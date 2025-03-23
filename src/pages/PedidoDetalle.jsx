import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import * as PedidosServices from "../services/pedidos.services"

function PedidoDetalle() {

    const {id} = useParams()
    const [pedido, setPedido] = useState({})
    const [productos, setProductos] = useState([])

    useEffect(()=>{
        PedidosServices.traerPedidoPorId(id)
        .then(data => {
            setPedido(data)
            setProductos(data.productos)
            console.log(data)
        })
    }, [id])

    console.log(pedido)


    return (
        <div className="container-detalle">
          <h1 className="mb-5">FECHA DE PEDIDO: {pedido.fecha}</h1>
          <table className="table-detalle">
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>CANTIDAD</th>
                <th>PRECIO</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
            {pedido.productos?.map((p, index) => (
              <tr key={index}>
                <td data-label="Producto">{p.nombre}</td>
                <td data-label="Cantidad">{p.cantidad}</td>
                <td data-label="Precio">${p.precio}</td>
                <td data-label="Subtotal">${p.precio * p.cantidad}</td>
              </tr>
            ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">TOTAL:  ${pedido.productos?.reduce((total, p) => total + (p.precio * p.cantidad), 0)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      );

}

export default PedidoDetalle