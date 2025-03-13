import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import * as ProductsServices from "../services/products.services"

function PedidoDetalle() {

    const {id} = useParams()
    const [pedido, setPedido] = useState({})
    const [productos, setProductos] = useState([])

    useEffect(()=>{
        ProductsServices.findById(id)
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
                <th>PRODUCTO</th>
                <th>CANTIDAD</th>
                <th>PRECIO</th>
                <th>SUBTOTAL</th>
            </thead>
            <tbody>
            {pedido.productos?.map((p, index) => (
                <tr>
              <td key={index}>{p.nombre}</td>
              <td>{p.cantidad}</td>
              <td>${p.precio}</td>
              <td>${p.precio * p.cantidad}</td>
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