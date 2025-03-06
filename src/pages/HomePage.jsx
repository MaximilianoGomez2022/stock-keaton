import { useState, useEffect } from "react"
import *as ProductosServices from '../services/products.services.js'
import *as SesionServices from '../services/sesion.services.js'
import { Link } from 'react-router-dom'
import Success from "./Success.jsx"
import { useLocation } from 'react-router-dom';


function HomePage() {

   const [productos, setProductos] = useState([])
   const [historial, setHistorial] = useState([])
   const [sesion, setSesion] = useState([])
   const inicio = localStorage.getItem('inicio')
   const location = useLocation();
   

   useEffect(()=>{
      ProductosServices.find()
      .then(data => {
         if (Array.isArray(data)) {
           setProductos(data);
           setHistorial(data);
         } else {
           console.error("Error: la API no devolvió un array", data);
           setProductos([]); // Evita errores con .map()
         }
       })
       .catch(err => {
         console.error("Error en ProductosServices.find():", err);
         setProductos([]); // Evita errores con .map()
       });
   }, []);

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
            {location.state?.setExito &&<><Success mensaje={"Agregaste tu producto."}/></>}
            {location.state?.setDelete &&<><Success mensaje={"Eliminaste tu producto."}/></>}
            {location.state?.setEdit &&<><Success mensaje={"Editaste tu producto."}/></>}
            {location.state?.setEditPerfil &&<><Success mensaje={"Editaste tu perfil."}/></>}
            <h1>Bienvenido !</h1>
            <div className="inicio-sesion">
            <p>Inicio de sesión: {inicio}</p>
               {sesion.map(({_id, hora}) =>
                  <p key={_id}>Anterior inicio de sesión: {hora}</p>
               )}
            </div>
            <section className="section-tabla">
            <table>
               <thead>
                  <tr>
                     <th>PRODUCTO</th>
                     <th>CANTIDAD</th>
                     <th>PORCIONES</th>
                     <th>ULTIMA DESCARGA</th>
                     <th>ACCIONES</th>
                  </tr>
               </thead>
               <tbody>      
               {Array.isArray(productos) ? (
               productos.map(({ _id, nombre, cantidad, porciones, ultimaDescarga }) => (
                  <tr key={_id}>
                     <td data-label="Nombre">{nombre}</td>
                     <td data-label="Cantidad">{cantidad}</td>
                     <td data-label="Porciones">{porciones}</td>
                     <td data-label="Ultima Descarga">{ultimaDescarga}</td>
                     <td data-label="Acciones" className="acciones">
                     <div>
                        <Link to={`/products/${_id}/edit`}>
                           <img src="/img/editar.svg" alt="Editar" />
                           Editar
                        </Link>
                     </div>
                     <div>
                        <Link to={`/products/${_id}/delete`}>
                           <img src="/img/eliminar.svg" alt="Eliminar" />
                           Eliminar
                        </Link>
                     </div>
                     </td>
                  </tr>
               ))
               ) : (
               <tr>
                  <td colSpan="5">No hay productos disponibles</td>
               </tr>
               )}
               </tbody>
            </table>
            </section>
            </div> )

}

export default HomePage