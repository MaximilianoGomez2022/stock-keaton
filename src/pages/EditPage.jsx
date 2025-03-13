import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as PedidosServices from '../services/pedidos.services.js'

import {useNavigate} from 'react-router-dom'

function PeliculasEditPage(){

    const {id} = useParams()
    const [productos, setProductos] = useState([])
    const [fecha, setFecha] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        PedidosServices.traerPedidoPorId(id)
        .then( data => {
            setFecha(data.fecha)
            setProductos(data.productos)
            console.log(data)
        })
    }, [id])

    function handleProductoChange(index, key, value) {
        const nuevosProductos = [...productos];
        nuevosProductos[index][key] = value;
        setProductos(nuevosProductos);
    }

    function onSubmit(e){
        e.preventDefault()
        PedidosServices.editarPedido(id, {fecha, productos})
        .then((data) => {
            console.log(data)
            navigate("/", { state: { setEdit : true } })         
        })
    }

    return (
      <div className="section-editar">
        <div className='contenedor-editar-pedido'>
        <h1>EDITAR PEDIDO DEL {fecha}</h1>
        <div className='div-form-editar-pedido'>
        <form onSubmit={onSubmit} className='form-editar-pedido'>
        {productos.map((producto, index) => (
                        <div key={index} className="producto-item">
                            <label>Nombre</label>
                            <input
                                className="form-control"
                                type="text"
                                value={producto.nombre}
                                onChange={(e) => handleProductoChange(index, "nombre", e.target.value)}
                            />
                            <label>Cantidad</label>
                            <input
                                className="form-control"
                                type="number"
                                value={producto.cantidad}
                                onChange={(e) => handleProductoChange(index, "cantidad", e.target.value)}
                            />
                        </div>
                    ))}
          <div className="mb-3">
            <button className="btn btn-dark w-100">Editar</button>
          </div>
        </form>
        </div>
        <div className='pedido-editado'>

        </div>
        </div>
      </div>
    );
}

export default PeliculasEditPage