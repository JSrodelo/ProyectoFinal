import { useNavigate, Link } from "react-router-dom"; 
import { alertaRedireccion } from "../helpers/funciones";

const MenuLateral = () => {
  let navigate = useNavigate();
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    alertaRedireccion(
      navigate,
      "Sesión finalizada",
      "En breves segundos cerraremos la sesión",
      "info",
      "/"
    );
  }

  return (
    <aside className="aplicacion__menu-lateral">
      <h1 className="aplicacion__menu-lateral-logo">
        Institución <span className="aplicacion__menu-lateral-logo--resaltado"></span>
      </h1>
      <h2>Usuario: {usuario?.nombre}</h2>
      <img className="aplicacion__menu-lateral-logo-imagen" src="/icons.png" alt="Logo" />
      <nav className="aplicacion__menu-lateral-navegacion">
        <Link className="aplicacion__menu-lateral-navegacion-item" to="/home">Inicio</Link>
        <Link className="aplicacion__menu-lateral-navegacion-item" to="/notas">Notas</Link>
        <Link className="aplicacion__menu-lateral-navegacion-item" to="/matriculas">Matriculas</Link>
         <Link className="aplicacion__menu-lateral-navegacion-item" to="/eventos">Eventos</Link>


        <button onClick={cerrarSesion} type="button" className="aplicacion__menu-lateral-navegacion-item">
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
};

export default MenuLateral;
