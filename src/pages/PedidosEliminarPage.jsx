import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as PeidosServices from '../services/pedidos.services.js'
import {useNavigate} from 'react-router-dom'

function PedidosELiminarPage(){

    const [producto, setProducto] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        PeidosServices.traerPedidoPorId(id)
        .then(data => {
            setProducto(data)
        })
    },)

    function onSubmit(e){
        e.preventDefault()
            PeidosServices.eliminar(id)
            .then((data) => {
                console.log('Eliminaste')
                console.log(data)
                navigate("/", { state: { setDelete : true } })               
            })
    }

    return (
        <section className='section-eliminar'>
            <h2>Eliminar Pedido {producto.nombre}</h2>
            <p>¿ Estas seguro de eliminar este pedido ?</p>
            <form onSubmit={onSubmit}>
                <div>
                <button>Eliminar</button>
                </div>           
            </form>
        </section> )
}

export default PedidosELiminarPage