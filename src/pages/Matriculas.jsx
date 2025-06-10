import './Matriculas.css';
import Contenido from '../components/Contenido';
import MenuLateral from '../components/MenuLateral';
import { useState } from 'react';

const Matriculas = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    grado: '',
    direccion: '',
    correo: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key].trim() === '') {
        alert('Por favor completa todos los campos');
        return;
      }
    }

    try {
      const resCheck = await fetch(`http://localhost:3001/matriculas?cedula=${formData.cedula}`);
      const dataCheck = await resCheck.json();
      if (dataCheck.length > 0) {
        alert('Ya existe un estudiante con esa cédula');
        return;
      }

      const res = await fetch('http://localhost:3001/matriculas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Matrícula guardada con éxito');
        setFormData({
          nombre: '',
          cedula: '',
          grado: '',
          direccion: '',
          correo: '',
          telefono: '',
        });
      } else {
        alert('Error al guardar matrícula');
      }
    } catch (error) {
      console.error('Error al guardar matrícula:', error);
      alert('Error al guardar matrícula');
    }
  };

  return (
    <div className="aplicacion">
      <MenuLateral />
      <div className="aplicacion__contenido">
        <div className="aplicacion__contenido-fondo"></div>
        <main className="aplicacion__principal">
          <section className="aplicacion__eslogan">
            <h2 className="aplicacion__eslogan-texto">Matrículas abiertas</h2>
          </section>

          <section className="matricula__formulario-contenedor">
            <h3 className="matricula__titulo">Formulario de Inscripción</h3>
            <form className="matricula__formulario" onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cedula"
                placeholder="Cédula"
                value={formData.cedula}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="grado"
                placeholder="Grado a cursar"
                value={formData.grado}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={formData.correo}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
              <button type="submit">Enviar Matrícula</button>
            </form>
          </section>

          <Contenido />
        </main>
      </div>
    </div>
  );
};

export default Matriculas;
