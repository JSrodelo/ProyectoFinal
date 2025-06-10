import { useEffect, useState } from 'react';
import './Notas.css';
import Contenido from '../components/Contenido';
import MenuLateral from '../components/MenuLateral';

const Notas = () => {
  const [matriculas, setMatriculas] = useState([]);
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formNota, setFormNota] = useState({
    cedula: '',
    materia: 'Matemáticas',
    n1: '',
    n2: ''
  });

  const [cedulaBusqueda, setCedulaBusqueda] = useState('');
  const [estudianteEncontrado, setEstudianteEncontrado] = useState(null);
  const [notasEstudiante, setNotasEstudiante] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resMatriculas = await fetch('http://localhost:3000/matriculas');
        const dataMatriculas = await resMatriculas.json();

        const resNotas = await fetch('http://localhost:3000/notas');
        const dataNotas = await resNotas.json();

        setMatriculas(dataMatriculas);
        setNotas(dataNotas);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  const handleFormNotaChange = (e) => {
    const { name, value } = e.target;
    setFormNota(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitNota = async (e) => {
    e.preventDefault();

    const { cedula, materia, n1, n2 } = formNota;

    if (!cedula || !materia || n1 === '' || n2 === '') {
      alert("Por favor completa todos los campos.");
      return;
    }

    const existeEstudiante = matriculas.find(m => m.cedula === cedula);
    if (!existeEstudiante) {
      alert("No se encontró estudiante con esa cédula.");
      return;
    }

    const notaExistente = notas.find(n => n.cedula === cedula && n.materia === materia);

    const metodo = notaExistente ? 'PUT' : 'POST';
    const url = notaExistente
      ? `http://localhost:3000/notas/${notaExistente.id}`
      : 'http://localhost:3000/notas';

    const notaData = {
      cedula,
      materia,
      n1: parseFloat(n1),
      n2: parseFloat(n2)
    };

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notaData)
      });

      if (res.ok) {
        alert("Nota guardada correctamente.");
        const nuevaNota = await res.json();

        if (notaExistente) {
          setNotas(prev => prev.map(n => n.id === nuevaNota.id ? nuevaNota : n));
        } else {
          setNotas(prev => [...prev, nuevaNota]);
        }

        setFormNota(prev => ({ ...prev, n1: '', n2: '' }));

        if (cedulaBusqueda === cedula) {
          filtrarNotasEstudiante(cedula);
        }
      } else {
        alert("Error al guardar nota.");
      }
    } catch (err) {
      console.error("Error al enviar nota:", err);
    }
  };

  const handleBuscarCedula = (e) => {
    const cedula = e.target.value.trim();
    setCedulaBusqueda(cedula);

    if (cedula === '') {
      setEstudianteEncontrado(null);
      setNotasEstudiante([]);
      return;
    }

    filtrarEstudiante(cedula);
    filtrarNotasEstudiante(cedula);
  };

  const filtrarEstudiante = (cedula) => {
    const est = matriculas.find(m => m.cedula === cedula);
    setEstudianteEncontrado(est || null);
  };

  const filtrarNotasEstudiante = (cedula) => {
    const notasFiltradas = notas.filter(n => n.cedula === cedula);
    setNotasEstudiante(notasFiltradas);
  };

  const calcularFinalYEstado = (n1, n2) => {
    const final = ((parseFloat(n1) + parseFloat(n2)) / 2).toFixed(2);
    const estado = final >= 3 ? "Aprobado" : "Reprobado";
    return { final, estado };
  };

  return (
    <div className="aplicacion">
      <MenuLateral />
      <div className="aplicacion__contenido">
        <div className="aplicacion__contenido-fondo"></div>
        <main className="aplicacion__principal">

          <section className="aplicacion__eslogan">
            <h1 className="aplicacion__eslogan-texto">Notas de los estudiantes</h1>
          </section>

          {}
          <section className="notas__formulario">
            <h3>Asignar Notas</h3>
            <form onSubmit={handleSubmitNota}>
              <input
                type="text"
                name="cedula"
                placeholder="Cédula del estudiante"
                value={formNota.cedula}
                onChange={handleFormNotaChange}
                required
              />
              <select
                name="materia"
                value={formNota.materia}
                onChange={handleFormNotaChange}
                required
              >
                <option>Matemáticas</option>
                <option>Biología</option>
                <option>Física</option>
              </select>
              <input
                type="number"
                name="n1"
                placeholder="Nota 1"
                step="0.1"
                value={formNota.n1}
                onChange={handleFormNotaChange}
                required
              />
              <input
                type="number"
                name="n2"
                placeholder="Nota 2"
                step="0.1"
                value={formNota.n2}
                onChange={handleFormNotaChange}
                required
              />
              <button type="submit">Guardar Nota</button>
            </form>
          </section>

          {}
          <section className="notas__busqueda">
            <h3>Buscar estudiante por Cédula</h3>
            <input
              type="text"
              placeholder="Ingrese cédula para ver notas"
              value={cedulaBusqueda}
              onChange={handleBuscarCedula}
            />
          </section>

          {}
          {loading ? (
            <p>Cargando datos...</p>
          ) : estudianteEncontrado ? (
            <section className="notas__info-estudiante">
              <h3>Información del estudiante</h3>
              <p><strong>Nombre:</strong> {estudianteEncontrado.nombre}</p>
              <p><strong>Cédula:</strong> {estudianteEncontrado.cedula}</p>
              <p><strong>Grado:</strong> {estudianteEncontrado.grado}</p>
              <p><strong>Dirección:</strong> {estudianteEncontrado.direccion}</p>
              <p><strong>Correo:</strong> {estudianteEncontrado.correo}</p>
              <p><strong>Teléfono:</strong> {estudianteEncontrado.telefono}</p>
            </section>
          ) : cedulaBusqueda !== '' ? (
            <p>No se encontró estudiante con esa cédula.</p>
          ) : null}

          {}
          {notasEstudiante.length > 0 && (
            <section className="notas__tabla">
              <h3>Notas de {estudianteEncontrado?.nombre}</h3>
              <table className="notas__tabla-contenido">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Materia</th>
                    <th>Nota 1</th>
                    <th>Nota 2</th>
                    <th>Nota Final</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {notasEstudiante.map((nota, i) => {
                    const { final, estado } = calcularFinalYEstado(nota.n1, nota.n2);
                    return (
                      <tr key={nota.id}>
                        <td>{i + 1}</td>
                        <td>{nota.materia}</td>
                        <td>{nota.n1}</td>
                        <td>{nota.n2}</td>
                        <td>{final}</td>
                        <td className={estado === "Aprobado" ? "aprobado" : "reprobado"}>{estado}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}

          <Contenido />
        </main>
      </div>
    </div>
  );
};

export default Notas;
