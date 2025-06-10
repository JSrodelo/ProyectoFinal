import React, { useEffect, useState } from 'react';
import "./GraficoEventos.css";
import MenuLateral from "../components/MenuLateral";

const endpoints = [
  {
    url: "http://localhost:5000/grafico-eventos",
    titulo: "Resultados de Votación de Eventos",
    descripcion: "Este gráfico muestra cuántos votos recibió cada evento de parte de los estudiantes."
  },
  {
    url: "http://localhost:5000/grafico-asistencia",
    titulo: "Asistencia a Eventos",
    descripcion: "Visualiza cuántos estudiantes asistieron físicamente a cada evento realizado."
  },
  {
    url: "http://localhost:5000/grafico-satisfaccion",
    titulo: "Satisfacción Estudiantil",
    descripcion: "Representa el promedio de satisfacción expresado por los estudiantes en una escala del 1 al 5."
  }
];

const GraficoEventos = () => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    Promise.all(endpoints.map(endpoint =>
      fetch(endpoint.url)
        .then(response => response.blob())
        .then(blob => ({
          titulo: endpoint.titulo,
          descripcion: endpoint.descripcion,
          src: URL.createObjectURL(blob)
        }))
    ))
      .then(setImagenes)
      .catch(error => console.error("Error al cargar los gráficos:", error));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <MenuLateral />
      {imagenes.length === 0 ? (
        <p>Cargando gráficos...</p>
      ) : (
        imagenes.map((img, index) => (
          <div key={index} style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 className='resultadoEventos'>{img.titulo}</h2>
            <p style={{ marginBottom: '1rem' }}>{img.descripcion}</p>
            <img
              src={img.src}
              alt={`Gráfico ${index}`}
              style={{
                width: '70%',
                maxWidth: '600px',
                borderRadius: '10px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default GraficoEventos;
