import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as productosServices from '../services/products.services.js'
import {useNavigate} from 'react-router-dom'

function ProductsDeletePage(){

    const [producto, setProducto] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        productosServices.findById(id)
        .then(data => {
            setProducto(data)
        })
    },)

    function onSubmit(e){
        e.preventDefault()
        if(confirm('Deseas eliminar definitivamente este producto ?')){
            productosServices.eliminar(id)
            .then((data) => {
                console.log('Eliminaste')
                console.log(data)
                navigate("/", { state: { setDelete : true } })               
            })
        }

    }

    return (
        <section className='section-eliminar'>
            <h2>Eliminar Producto {producto.nombre}</h2>
            <p>¿ Estas seguro de eliminar este producto ?</p>
            <form onSubmit={onSubmit}>
                <div>
                <button>Eliminar</button>
                </div>           
            </form>
        </section> )
}

export default ProductsDeletePage