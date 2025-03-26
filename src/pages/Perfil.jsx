import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import *as UsersServices from '../services/users.services'
import Error from './Error'

import {useNavigate} from 'react-router-dom'

function Perfil(){

    const [password, setPassword] = useState("")
    const [actual, setActual] = useState("")
    const [nuevaPassword, setNuevaPassword] = useState("")
    const [user, setUser] = useState({})
    const [error, setError] = useState(false)
    const [mail, setMail] = useState("")
    const navigate = useNavigate()
    const userid = JSON.parse(localStorage.getItem("user"));
    const id = userid._id
    console.log(userid._id)

    useEffect(()=>{
        UsersServices.findById(id)
        .then(data => {
            console.log(data)
            setUser(data)
            setMail(data.mail)
        })
    }, [id])

    function changeName(e){
        setMail(e.target.value)
    }

    function changeActual(e){
        setActual(e.target.value)
    }

    function changeNueva(e){
        setNuevaPassword(e.target.value)
    }

    function onSubmit(e){
        e.preventDefault()
        UsersServices.edit(id, {mail, password, nuevaPassword})
        .then((data) => {
            console.log(data)
            navigate("/", { state: { setEditPerfil : true } })          
        })
    }

    function onSubmitContraseña(e) {
        e.preventDefault()
        setError(false)
        UsersServices.editContraseña(id, {actual, nuevaPassword})
        .then((data) => {
            if (data.message === "La contraseña actual es incorrecta") {
                console.log(data.message)
                setError(true)
                return;
            }
            console.log(data.message)
            navigate("/", { state: { setEditContraseña: true } });
        })
        .catch((error) => {
            console.error("Error al cambiar la contraseña:", error);
            alert("❌ Hubo un problema al actualizar la contraseña. Inténtalo de nuevo.");
        });
    }

    console.log(user)

    return (
    <div className='section-editar-perfil'>
    {error && <><Error mensaje={"La contraseña actual ingresada en incorrecta."}></Error></>}
        <h1>EDITAR PERFIL</h1> 
        <form onSubmit={onSubmit} className='form-editar-perfil'>
        <div className='mb-3'>
            <label className="form-label">Nombre</label>
            <input className="form-control" type="text" name='nombre' onChange={changeName} value={mail}/>
        </div>
            <button className='btn btn-dark w-100'>Editar Perfil</button>            
        </form>
        <form onSubmit={onSubmitContraseña} className='form-editar-perfil'>
        <h2>EDITAR CONTRASEÑA</h2>
        <div className='mb-3'>
            <label className="form-label">Ingresa contraseña actual</label>
            <input placeholder='Ingresa contraseña actual' className="form-control" type="password" name='actual' onChange={changeActual} value={actual}/>
        </div>
        <div className='mb-3'>
            <label className="form-label">Nueva contraseña</label>
            <input placeholder='Nueva contraseña' className="form-control" type="password" name='nueva' onChange={changeNueva} value={nuevaPassword}/>
        </div>
        <button className='btn btn-dark w-100'>Editar Contraseña</button>
        </form>
    </div> )
}

export default Perfil