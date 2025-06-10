import Home from "../pages/Home";
import Login from "../pages/Login";
import RutaProtegida from "../components/RutaProtegida";
import Registro from "../pages/Registro";
import Notas from "../pages/Notas";
import Matriculas from "../pages/Matriculas";
import GraficoEventos from "../pages/GraficoEventos";

export let enrutador = [
  {
    path: '/home',
    element: <RutaProtegida proteger={<Home />} />
  },
  {
    path: '/',
    element: <Login />
  },
  {
    path: "/registro",
    element: <Registro />
  },
  {
    path: "/notas",
    element: <Notas />
  },
  {
    path: "/matriculas",
    element: <Matriculas />
  },
  {
  path: "/eventos",
  element: <GraficoEventos />
  }

];
