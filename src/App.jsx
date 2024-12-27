import LoginPage from "./pages/LoginPage"
import Perfil from "./pages/Perfil.jsx"
import ProductsDeletePage from "./pages/ProductsDeletePage"
import ProductNewPage from "./pages/ProductNewPage"
import EditPage from "./pages/EditPage"
import HomePage from "./pages/HomePage"
import {Routes, Route, Link, useNavigate, Navigate} from 'react-router-dom'
import { useState, useEffect } from "react"
import ProductDetails from './pages/ProductsDetails.jsx'
import NotFoundPage from './pages/NotFoundPage'
import * as authService from './services/auth.services.js'
import SinPermiso from "./pages/SinPermiso.jsx"
import './estilos.css'
import *as SesionServices from './services/sesion.services.js'
import Success from "./pages/Success.jsx"
import Error from "./pages/Error.jsx"
import { useLocation } from 'react-router-dom';

function RoutePrivate({isAuthenticate, children}){
  return (
      <>
          {isAuthenticate ? children : <Navigate to="/login"/>}
      </>
  )
}

function RouteAdmin( {isAdmin, children}){
  return (
      <>
          {isAdmin ? children : <Navigate to="/sin-permiso"/>}
      </>
  )
}

function onClickBarra() {
  console.log('hola')
}

function App() {
    //logica
    const [isAuthenticate, setAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cerrar, setCerrar] = useState(false)
    const navigate = useNavigate()
    const fechaActual = new Date();
    const formattedDate = fechaActual.toLocaleString();
    const [selectedBarra, setSelectedBarra] = useState(true);
    const [hamburguesa, setHamburguesa] = useState(true);
  
    const handleItemClick = () => {
      if(selectedBarra === true) {
        setSelectedBarra(false)
        setHamburguesa(false)
        console.log('seletdbarra', selectedBarra)
      } else {
        setSelectedBarra(true)
        setHamburguesa(true)
        console.log('seletdbarra', selectedBarra)
      }
    };

    //useEffect(() => {
    //  const token = localStorage.getItem('token')
    //  if(token){
    //      setAuthenticated(true)
    //      console.log('autenticado')
    //      navigate('/')
    //  } else {
    //    setAuthenticated(false)
    //    navigate('/login')
    //  }
    //}, [])
  
    useEffect(() => {
        if(!isAuthenticate) {
       navigate('/login')
        } else {
         navigate('/')
         console.log('Fecha Actual: ', fechaActual)
       }
    }, [isAuthenticate])
  
    function onLogin(user,token){
      setAuthenticated(true)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('inicio', formattedDate)
      if(user.role === 'admin'){
        console.log('Ingresó el admin')
        setIsAdmin(true)     
      } else {
        setIsAdmin(false)
        console.log('Ingresó', user.role)
      }
      navigate('/', { state: { setExito : false } })
      console.log(userid._id)
  }
  
  function onLogout(){
    setCerrar(false)
    const hora = localStorage.getItem('inicio')
    const id = localStorage.getItem('id')
    console.log(hora)
    console.log("este es el id", id)
    SesionServices.editSesion(id, {hora})
    .then(() => {
      setCerrar(true)
      console.log("guardaste la sesión")          
    })
    authService.logout()
    setAuthenticated(false)
    setIsAdmin(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('inicio')
    navigate('/login')
  }

    //vista
    return (
        <div>
        <header>
        <div className="logo">
            <a href="/" id="logo">Stock Keaton</a>
        </div>
        <nav id="menu">
            {isAdmin&&<><ul id="hamburguesa">
                <li><a onClick={handleItemClick} className={hamburguesa ? 'hambtrue' : 'hambfalse'} href="#menu">abrir</a></li>
                <li><a onClick={handleItemClick} href="#" className={hamburguesa ? 'hambtrue' : 'hambfalse'}>cerrar</a></li>
            </ul></>}
          <ul id="barra" onClick={handleItemClick} className={ selectedBarra ? 'barratrue' : 'barrafalse' }>
            {isAuthenticate &&<><li><Link to={'/'}>Home</Link></li></>}
            {isAuthenticate &&<><li><Link to={'/products/new'}>Agregar Producto</Link></li></>}
            {isAuthenticate &&<><li><Link to={'/perfil/editar'}>Editar Perfil</Link></li></>}      
            {isAuthenticate &&<><li id="cerrar-sesion"><a onClick={onLogout}>Cerrar sesión</a></li></>}
          </ul>          
        </nav>
        </header>
        {isAuthenticate &&<><Success mensaje={"Iniciaste sesión correctamente"}/></>}
        {cerrar &&<><Success mensaje={"Cerraste sesión correctamente"}/></>}
        <Routes>
            
            <Route path={'/'}  element={<RoutePrivate isAuthenticate={isAuthenticate}><RouteAdmin isAdmin={isAdmin}><HomePage/></RouteAdmin></RoutePrivate>}></Route>

            <Route path={'/login'} element={<LoginPage onLogin={onLogin} />}></Route>

            <Route path='/products/new' element={<ProductNewPage/>}></Route>

            <Route path='/products/:id' element={<ProductDetails/>}></Route>

            <Route path='/products/:id/edit' element={<EditPage/>}></Route>

            <Route path='/products/:id/delete' element={<ProductsDeletePage/>}></Route>

            <Route path='/notfound' element={<NotFoundPage/>}></Route>

            <Route path='/sin-permiso' element={<SinPermiso/>}></Route>

            <Route path='/perfil/editar' element={<Perfil></Perfil>}></Route>

            <Route path='/*' element={<h1>Error 404</h1>}></Route>
        </Routes>
        </div>
    )
}

export default App