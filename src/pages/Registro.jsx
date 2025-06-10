import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  alertaError,
  alertaRedireccion,
  generarToken,
} from "../helpers/funciones";
import "./Registro.css";
let apiUsuarios = "http://localhost:3000/usuarios";

const Registro = () => {
  const [getUsuario, setUsuario] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getName, SetName] = useState("");
  const [getHoraLogin, setHoraLogin] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  let navigate = useNavigate();

  function getUsuarios() {
    fetch(apiUsuarios)
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getUsuarios();
  }, []);

  function buscarUsuario() {
    let usuarioEncontrado = usuarios.find(
      (usuario) => getUsuario == usuario.usuario
    );
    return usuarioEncontrado;
  }

  function registrarUsuario() {
    if (!buscarUsuario()) {
        let nuevoUsuario ={
            nombre: getName,
            usuario: getUsuario,
            contrasena: getPassword,
        };
        fetch(apiUsuarios, {
            method: "POST",
            body: JSON.stringify(nuevoUsuario),
        });
      alertaRedireccion(
        navigate,
        "Bienvenido " + buscarUsuario().nombre +
        "Registrado Correctamente",
        "En breves momento sera redireccionado al Login",
        "success",
        "/home"
      );
      let horaInicio = new Date();
      console.log(horaInicio);
 
    } else {
      alertaError("Error", "Usuario ya existe en la base de datos", "Error");
    }
  }

  return (
    <form className="form">
      Sign Up
      <input
        onChange={(e) => setUsuario(e.target.value)}
        type="text"
        className="input"
        placeholder="name"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        className="input"
        placeholder="Password"
      />
      <input onChange={(e)=> SetName(e.target.value)} 
      type="text" 
      className="input" 
      placeholder="Nombre" 
      />

      <Link to="/"><button type="button" onClick={registrarUsuario}>Registro</button></Link> 
      <Link className="yaTienesCuenta" to ="/">Ya tienes una cuenta?</Link>
    </form>
  );
};

export default Registro;
