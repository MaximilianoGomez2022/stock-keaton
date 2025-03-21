import LoginPage from "./pages/LoginPage"
import Perfil from "./pages/Perfil.jsx"
import PedidosELiminarPage from "./pages/PedidosEliminarPage.jsx"
import ProductNewPage from "./pages/ProductNewPage"
import EditPage from "./pages/EditPage"
import HomePage from "./pages/HomePage"
import PedidoDetalle from "./pages/PedidoDetalle.jsx"
import NuevoPedidoPage from "./pages/NuevoPedidoPage.jsx"

import {Routes, Route, Link, useNavigate, Navigate, Outlet} from 'react-router-dom'
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

import BarraLateral from "./components/BarraLateral.jsx"

import { useSelector, useDispatch } from "react-redux";
import { loginFalse, loginTrue } from "./redux/loginSlice.js"

function RoutePrivate({ isAuthenticate }) {
  return isAuthenticate ? <Outlet /> : <Navigate to="/login" replace />;
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
    const dispatch = useDispatch();
    const location = useLocation();
    const isLoginPage = location.pathname === '/login'

    const isOpen = useSelector((state) => state.sidebar.isOpen);
    console.log(isOpen)

    const isLogin = useSelector((state) => state.login.isLogin)

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
        setIsAdmin(true);
        dispatch(loginTrue());
        console.log(isLogin, 'este es del reduxx')
      } else {
        setIsAdmin(false)
        console.log('Ingresó', user.role)
      }
      navigate('/', { state: { setExito : false } })
      console.log(user._id)
  }

  function onLogout(){
    setCerrar(true)
    const hora = localStorage.getItem('inicio')
    // const id = localStorage.getItem('id')
    // SesionServices.editSesion(id, {hora})
    // .then(() => {
    //   console.log("guardaste la sesión")
    // })
    authService.logout()
    setAuthenticated(false)
    setIsAdmin(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('inicio')
    dispatch(loginFalse())
    navigate('/login')
    setCerrar(false)
  }

    //vista
    return (
        <div className="contenedor-app">

        {/* Mostrar la barra lateral solo si NO estamos en el login */}
        {!isLoginPage && <BarraLateral onLogout={onLogout} />}  
        {isAuthenticate &&<><Success mensaje={"Bienvenido !"}/></>}
        {!isAuthenticate &&<><Success mensaje={"Cerraste sesión"}/></>}

        <main className={`${isOpen ? "main-open" : "main-closed"}`}>
        <Routes>
          {/* Rutas protegidas */}
          <Route element={<RoutePrivate isAuthenticate={isAuthenticate} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/pedido/new" element={<ProductNewPage />} />
              <Route path="/pedido/nuevo" element={<NuevoPedidoPage />} />
              <Route path="/pedido/:id" element={<ProductDetails />} />
              <Route path="/pedido/:id/ver" element={<PedidoDetalle />} />
              <Route path="/pedido/:id/edit" element={<EditPage />} />
              <Route path="/pedido/:id/delete" element={<PedidosELiminarPage />} />
              <Route path="/perfil/editar" element={<Perfil />} />
          </Route>

          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />
          <Route path="/*" element={<h1>Error 404</h1>} />
      </Routes>
        </main>
        </div>
    )
}

export default App