import React, { useEffect, useState } from "react";

export default function Consentimientos(){
  const [alumnos, setAlumnos] = useState([]);
  useEffect(()=>{
    const a = localStorage.getItem("alumnos");
    setAlumnos(a ? JSON.parse(a) : []);
  },[]);

  if(alumnos.length===0) return <div><h2>Consentimientos</h2><div className="card">Aún no hay alumnos. Inscríbelos en la pestaña "Alumnos".</div></div>;

  return (
    <div>
      <h2>Consentimientos</h2>
      {alumnos.map(a => (
        <div className="card" key={a.id}>
          <b>{a.nombre}</b> <span className="pill">{a.grupo}</span>
          <div className="badges mt-1">
            <span>Salud {a.salud ? "✔" : "✘"}</span>
            <span>WhatsApp {a.telWhatsapp ? "✔" : "✘"}</span>
            <span>RRSS {a.imagenRRSS ? "✔" : "✘"}</span>
            <span>Internet {a.imagenInternet ? "✔" : "✘"}</span>
            <span>Publicidad {a.publicidad ? "✔" : "✘"}</span>
            <span>Federación {a.cesionFederacion ? "✔" : "✘"}</span>
            <span>Otros {a.cesionOtros ? "✔" : "✘"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
