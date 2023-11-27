import {useEffect, useState} from 'react'
import * as ProductServices from '../services/products.services.js'
import {useNavigate} from 'react-router-dom'

function ProductNewPage() {

    const [nombre, setName] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [porciones, setPorciones] = useState("")
    const [ultimaDescarga, setUltimaDescarga] = useState("")
    const navigate = useNavigate()
    const [exito, setExito] = useState(false)

    function changeName(e){
        setName(e.target.value)
    }
    function changeCantidad(e){
        setCantidad(e.target.value)
    }
    function changePorciones(e){
        setPorciones(e.target.value)
    }
    function changeUltimaDescarga(e){
        setUltimaDescarga(e.target.value)
    }
    function onSubmit(e){
        e.preventDefault()
        ProductServices.create({nombre, cantidad, porciones, ultimaDescarga})
        .then(() => {
            console.log("agregaste")
            setExito(true)
            navigate("/", { state: { setExito : true } })      
        })
    }

    return(
        <div className='section-agregar'>
            <h1>Agregar Producto</h1>
            <form onSubmit={onSubmit}>
            <div>
                <label>Nombre</label>
                <input type="text" name='nombre' onChange={changeName} value={nombre}/>
            </div>
                <label>Cantidad</label>
                <input type="text" name='cantidad' onChange={changeCantidad} value={cantidad} />
                <label>Porciones</label>
                <input type="text" name='porciones' onChange={changePorciones} value={porciones} />
                <label>Ultima descarga</label>
                <input type="date" name='ultimaDescarga' onChange={changeUltimaDescarga} value={ultimaDescarga} />
                <div>
                <button>Agregar</button>
                </div>          
            </form>
        </div>
    )

}

export default ProductNewPage