import React from "react";
import "./Estilos.css";
import { useState, useEffect } from "react";

const peliculas = [
  {
    id: 1,
    titulo: "Deadpool and wolverine",
    caratula:
      "https://i.pinimg.com/736x/e9/46/6f/e9466f2b25c52ee3a0f58a4a5b27ceeb.jpg",
    duracion: "2.5hrs",
  },
  {
    id: 2,
    titulo: "Gigantes de acero",
    caratula:
      "https://m.media-amazon.com/images/S/pv-target-images/4b0adfab0476119532c10f0c6f54ee01f9a773e5705d79c2500c0b3d754ccae0.jpg",
    duracion: "1.5hrs",
  },
  {
    id: 3,
    titulo: "El Todopoderoso",
    caratula:
      "https://m.media-amazon.com/images/M/MV5BM2IyOTY3MTYtMmZiZS00MmU0LWFlZjctYTM4ZDdkNmUxNjA2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    duracion: "2hrs",
  },
];

export const App = () => {
  const [datosPelis, setDatosPelis] = useState(null);

  function openModal(pelicula) {
    setDatosPelis(pelicula);
  }

  function cerrarModal() {
    setDatosPelis(null);
  }

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  useEffect(() => {
    if (datosPelis) setVisible(true);
  }, [datosPelis]);

  const [form, setForum] = useState(null);
  const [horario, setHorario] = useState(null);
  const [asiento, setAsiento] = useState(null);
  const [peli, setPeli] = useState(null);
  useEffect(() => {
    if (form) setVisible1(true);
  }, [form]);
  function enviar(e) {
    e.preventDefault();

    setDatosPelis(null);
  }

  function forum() {
    setForum([
      {
        id: 1,
        horario: horario,
        asiento: asiento,
        pelicula: peli,
      },
    ]);
  }

  function cerrarFinal() {
    setForum(null);
    setVisible1(false);
  }

  return (
    <>
      <header>
        <nav>
          <h1>Cine Sensacional</h1>
        </nav>
      </header>
      <main>
        {peliculas.map((pelicula, index) => (
          <div key={pelicula.id} className="pelicula">
            <h1>{pelicula.titulo}</h1>
            <img src={pelicula.caratula} alt="" />
            <button
              onClick={() => {
                openModal(pelicula);
                setPeli(pelicula.titulo);
              }}
            >
              Comprar
            </button>
          </div>
        ))}
      </main>

      {visible && (
        <div
          className={`padre ${datosPelis ? "fadeIn" : "fadeOut"}`}
          onAnimationEnd={() => {
            if (!datosPelis) setVisible(false);
          }}
        >
          <div className="modal">
            <h1>{datosPelis?.titulo}</h1>
            <form action="" onSubmit={enviar}>
              <label htmlFor="">Duracion:</label>
              <span>{datosPelis?.duracion}</span>
              <br />
              <label htmlFor="">Nro de asiento:</label>
              <select
                onChange={(e) => {
                  setAsiento(e.target.value);
                }}
              >
                <option value="" selected disabled>
                  --Selecciona--
                </option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="A3">A3</option>
                <option value="A4">A4</option>
              </select>
              <br />
              <label htmlFor="">Horario</label>
              <select
                onChange={(e) => {
                  setHorario(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  --Selecciona--
                </option>
                <option value="3:00 p.m.">3:00 p.m.</option>
                <option value="8:00 a.m.">8:00 a.m.</option>
              </select>{" "}
              <br />
              <center>
              <button type="submit" onClick={forum}>
                Comprar
              </button> </center>
            </form>
            <button onClick={() => cerrarModal()} className="cerrar">
              Cerrar
            </button>
          </div>
        </div>
      )}
      {visible1 && (
        <div className="final padre">
          <div className="modal">
            <h1>Gracias por tu compra</h1>
            <h3>detalles de la transaccion</h3>
            <label htmlFor="">Horario: {form[0]?.horario}</label>
            <label htmlFor="">Asiento: {form[0]?.asiento}</label>
            <label htmlFor="">Pelicula: {form[0]?.pelicula}</label>
            {console.log(form[0].horario)}
            <button onClick={cerrarFinal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};
