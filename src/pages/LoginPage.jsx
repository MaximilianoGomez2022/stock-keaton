import {useState} from 'react'
import * as authService from '../services/auth.services.js'
import Error from './Error.jsx'

import { login } from '../services/auth.services.js'

function LoginPage({onLogin}){
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState([])
    const [errorTrue, setErrorTrue] = useState(false)
    const [errorMail, setErrorMail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorPassObligatoria, setPassObligatoria] = useState("")
    const [mostrar, setMostrar] = useState(false);
    const [aMostrar, setaMostrar] = useState("");
    


    function onSubmit(event){
        setErrorTrue(false)
        event.preventDefault()
        authService.login(mail, password)
        .then(({ user, token }) => {
            if (!user || !token) {
                throw new Error("Usuario o token no recibido");
            }
            onLogin(user, token);
        })
        .catch(error => {
            console.error("Error en login:", error);

            // Asegúrate de manejar los errores como array
            const errorMessage = Array.isArray(error.errors)
                ? error.errors
                : [error.message || "Error al iniciar sesión"];

            setError(errorMessage);
            setErrorTrue(true);
        });
    }

    function onChangeMail(event){
        setMail(event.target.value)
    }

    function onChangePassword(event){
        setPassword(event.target.value)
    }

    const toggleMostrar = () => {
        setMostrar(!mostrar);
      };

    return (
        <div className='login'>
            {errorTrue &&<><Error mensaje={"Revisa los datos ingresados e intentá nuevamente."}/></>}
            <form onSubmit={onSubmit}>
            <h1>STOCKEATON</h1>
            <div className='titulo-login'>
                <h2>Iniciar Sesión</h2>
            </div>
            <div className='errores-login'>
            {(error || []).map((err, index) => <p key={index}>{err}</p>)}
            </div>
                <div className='mb-3'>
                <label className="form-label">Nombre: </label>
                <input className="form-control" type="text" name="mail" onChange={onChangeMail} value={mail} />
                </div>

                <div className='mb-3'>
                <label>Contraseña: </label>
                <input name="password" type={mostrar ? 'text' : 'password'} onChange={onChangePassword} value={password} />
                <a onClick={toggleMostrar}>{mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña'}</a>
                </div>
     
                <button>Ingresar</button>
            </form>
        </div>)           
}


export default LoginPage