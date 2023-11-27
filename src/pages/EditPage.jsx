import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as ProductsServices from '../services/products.services.js'

import {useNavigate} from 'react-router-dom'

function PeliculasEditPage(){

    const {id} = useParams()
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [porciones, setPorciones] = useState("")
    const [ultimaDescarga, setUltimaDescarga] = useState(new Date().toISOString().split('T')[0])
    const navigate = useNavigate()

    function changeName(e){
        setNombre(e.target.value)
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
        ProductsServices.edit(id, {nombre, cantidad, porciones, ultimaDescarga})
        .then((data) => {
            console.log(data)
            navigate("/", { state: { setEdit : true } })         
        })
    }

    return (<div className='section-editar'>
        <h1>Editar Producto</h1>
        <form onSubmit={onSubmit}>
        <div className='mb-3'>
            <label className="form-label">Nombre</label>
            <input className="form-control" type="text" name='nombre' onChange={changeName} value={nombre}/>
        </div>
            <label className="form-label">Cantidad</label>
            <input className="form-control" type="text" name='cantidad' onChange={changeCantidad} value={cantidad} />
            <label className="form-label">Porciones</label>
            <input className="form-control" type="text" name='porciones' onChange={changePorciones} value={porciones} />
            <label className="form-label">Ultima Descarga</label>
            <input className="form-control" type="date" name='ultimaDescarga' onChange={changeUltimaDescarga} value={ultimaDescarga} />
            <div className='mb-3'>
            <button className='btn btn-dark w-100'>Editar</button>
            </div>
            
        </form>
    </div> )
}

export default PeliculasEditPage