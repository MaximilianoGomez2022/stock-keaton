import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { Link } from "react-router-dom";

function BarraLateral ({onLogout}) {

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const isLogin = useSelector((state) => state.login.isLogin);

    return (
        <aside id="sidebar" className={`sidebar ${isOpen ? "open" : "closed"} ${isLogin ? "barra-block" : "barra-none"}`}>
        <button id="toggle-btn" onClick={() => dispatch(toggleSidebar())}>
            <i class="fas fa-bars"></i>
        </button>
        <div className={`${isOpen ? "nav-open" : "nav-closed"}`}>
        <h2>STOCKEATON</h2>
        <nav>
            <Link to={'/'}><i class="fas fa-home"></i>Home</Link>
            <Link to={'/pedido/nuevo'}><i className="fas fa-plus"></i>Nuevo Pedido</Link>
            <Link to={'/perfil/editar'}><i className="fas fa-user"></i>Editar Perfil</Link>     
            <li id="cerrar-sesion"><a onClick={onLogout}><i className="fas fa-sign-out-alt"></i> Cerrar sesión</a></li>
        </nav>
        </div>
        </aside>
    )


}

export default BarraLateral