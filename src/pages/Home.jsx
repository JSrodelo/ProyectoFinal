import "./Home.css";
import Contenido from "../components/Contenido";
import MenuLateral from "../components/MenuLateral";

const Home = () => {
  return (
    <div className="aplicacion">
      <MenuLateral />
      <div className="aplicacion__contenido">
        <div className="aplicacion__contenido-fondo"></div>
        <main className="aplicacion__principal">
          <section className="aplicacion__eslogan">
            <h1>Bienvenidos al Centro Educativo</h1> 
             </section>
          <div className="aplicacion__eslogan1">
            <h2>Aspectos que tendremos en cuenta al navegar por nuestra pagína :</h2>
          </div>
          <br />
          <br />
            <section className="cards">
              <section className="home__cards">
                <div className="home__card">
                  <img
                    src="./uno.jpg"
                    alt="Card 1"
                    className="home__card-img"
                  />
                  <h3 className="home__card-title">Acerca de nosotros:</h3>
                  <p className="home__card-text">
                   Esta sección debe reflejar la esencia del colegio. Comparte su historia, pero de una manera sencilla, como si contaras una historia interesante. No abuses de la solemnidad ni los adjetivos para no parecer aburrido o pretencioso.
                  </p>
                </div>
                <div className="home__card">
                  <img
                    src="./dos.jpg"
                    alt="Card 2"
                    className="home__card-img"
                  />
                  <h3 className="home__card-title">Sección de noticias y eventos </h3>
                  <p className="home__card-text">
                  Mantemos a la comunidad informada sobre los últimos acontecimientos, logros académicos y eventos próximos. Esta sección la actualizamos cada que hay enventos regularmente.
                  </p>
                </div>
                <div className="home__card">
                  <img
                    src="./tres.jpg"
                    alt="Card 3"
                    className="home__card-img"
                  />
                  <h3 className="home__card-title">Información detallada</h3>
                  <p className="home__card-text">
                 Describe los programas académicos, metodologías de enseñanza y especializaciones. Incluye también información sobre el cuerpo docente, con énfasis en sus calificaciones y experiencia.
                  </p>
                </div>
                <div className="home__card">
                  <img
                    src="./cuatro.jpg"
                    alt="Card 3"
                    className="home__card-img"
                  />
                  <h3 className="home__card-title">Vida estudiantil y actividades</h3>
                  <p className="home__card-text">
                    Muestra lo que hace único al colegio fuera del aula. Detalla actividades extracurriculares, clubes, deportes y eventos. Esto no solo enriquece la percepción del colegio, sino que también muestra un enfoque holístico de la educación.
                  </p>
                </div>
                <div className="home__card">
                  <img
                    src="./cinco.jpg"
                    alt="Card 3"
                    className="home__card-img"
                  />
                  <h3 className="home__card-title">Portal para padres y estudiantes</h3>
                  <p className="home__card-text">
                   Este espacio debe ser una herramienta interactiva donde padres y estudiantes puedan acceder a horarios, calendarios académicos, recursos educativos y plataformas de comunicación con el personal del colegio.


                  </p>
                </div>
                <div className="home__card">
                  <img
                    src="./seis.jpg"
                    alt="Card 3"
                    className="home__card-img"
                  />
                  <h3 className="home__card-title">Blog educativo</h3>
                  <p className="home__card-text">
                    Considera un blog con artículos sobre tendencias educativas, consejos para padres, logros de estudiantes y más. Esto no solo mejora el SEO, sino que también establece al colegio como una autoridad educativa.
                  </p>
                </div>
            </section>
            
          </section>
          <Contenido />
        </main>
      </div>
    </div>
  );
};

export default Home;
