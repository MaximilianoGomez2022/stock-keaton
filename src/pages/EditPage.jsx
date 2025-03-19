import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import * as PedidosServices from '../services/pedidos.services.js'

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

    function handleFechaChange(value) {
        setFecha(value);
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
        <label>FECHA</label>
        <input 
        type="date" 
        value={fecha}
        onChange={(e) => handleFechaChange(e.target.value)}
        />
        <label>PRODUCTOS</label>
        <div className='contenedor-form-edtiar'>
        {productos.map((producto, index) => (
            <div key={index} className="producto-item">
                <h2>{producto.nombre}</h2>
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
                <label>Precio</label>
                <input
                    className="form-control"
                    type="number"
                    value={producto.precio}
                    onChange={(e) => handleProductoChange(index, "precio", e.target.value)}
                />
            </div>
        ))}
        </div>
          <div className="div-botones-editar">
            <button className="btn btn-dark w-100">Editar</button>
            <button type='button' className="btn btn-light w-100" onClick={() => navigate(-1)}>Atrás</button>
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