import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import *as UsersServices from '../services/users.services'
import Error from './Error'

import {useNavigate} from 'react-router-dom'

function Perfil(){

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmarPassword, setConfirm] = useState("")
    const [user, setUser] = useState({})
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const userid = JSON.parse(localStorage.getItem("user"));
    const id = userid._id
    console.log(userid._id)

    useEffect(()=>{
        UsersServices.findById(id)
        .then(data => {
            console.log(data)
            setUser(data)
        })
    }, [id])

    function changeName(e){
        setMail(e.target.value)
    }
    function changePassword(e){
        setPassword(e.target.value)
    }
    function changeConfirm(e){
        setConfirm(e.target.value)
    }
    function onSubmit(e){
        e.preventDefault()
        {if(password === confirmarPassword){
            UsersServices.edit(id, {mail, password})
            .then((data) => {
                console.log(data)
                navigate("/", { state: { setEditPerfil : true } })          
            })
        }else{
            setError(true)
        }}
    }

    return (<div className='section-editar'>
    {error && <><Error mensaje={"Los passwords no coinciden"}></Error></>}
        <h1>Editar Perfil</h1> 
        <form onSubmit={onSubmit}>
        <div className='mb-3'>
            <label className="form-label">Nombre</label>
            <input className="form-control" type="text" name='mail' onChange={changeName} value={mail}/>
        </div>
            <label className="form-label">Contraseña</label>
            <input className="form-control" type="text" name='password' onChange={changePassword} value={password} />
            <label className="form-label">Confirmar Contraseña</label>
            <input className="form-control" type="text" name='confirmar-password' onChange={changeConfirm} value={confirmarPassword} />
            <button className='btn btn-dark w-100'>Editar Perfil</button>            
        </form>
    </div> )
}

export default Perfil