import { useState, useEffect } from "react"
import *as SesionServices from '../services/sesion.services.js'
import { Link } from 'react-router-dom'
import Success from "./Success.jsx"
import { useLocation } from 'react-router-dom';

import Lista from "../components/Lista.jsx";


function HomePage() {

   const [sesion, setSesion] = useState([])
   const inicio = localStorage.getItem('inicio')
   const location = useLocation();
   

   useEffect(() => {
      SesionServices.find()
        .then(data => {
          if (Array.isArray(data)) {
            setSesion(data);
            data.forEach(sesion => {
              localStorage.setItem("id", sesion._id);
            });
          } else {
            console.error("Error: la API no devolvió un array", data);
            setSesion([]); // Evita errores
          }
        })
        .catch(err => {
          console.error("Error en SesionServices.find():", err);
          setSesion([]); // Evita errores
        });
    }, []);

   return ( 
            <div className="contenedor-home">
            {location.state?.setExito &&<><Success mensaje={"Agregaste tu pedido."}/></>}
            {location.state?.setDelete &&<><Success mensaje={"Eliminaste tu pedido."}/></>}
            {location.state?.setEdit &&<><Success mensaje={"Editaste tu pedido."}/></>}
            {location.state?.setEditPerfil &&<><Success mensaje={"Editaste tu perfil."}/></>}
            {location.state?.setEditContraseña &&<><Success mensaje={"Editaste tu contraseña."}/></>}
            <div className="bienvenida">
            <div className="inicio-sesion">
            <h1>LISTA DE PEDIDOS</h1>
            <p>Inicio de sesión: {inicio}</p>
               {sesion.map(({_id, hora}) =>
                  <p key={_id}>Anterior inicio de sesión: {hora}</p>
               )}
            </div>
            <Link to={"/pedido/nuevo"} className="btn-dark"><i className="fas fa-plus"></i> NUEVO PEDIDO</Link>
            </div>
            <Lista></Lista>
            </div> )

}

export default HomePage