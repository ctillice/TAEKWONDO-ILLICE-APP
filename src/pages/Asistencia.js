import React, { useEffect, useMemo, useState } from "react";

const KEY_ALUMNOS = "alumnos";
const KEY_ASIS = "asistencias"; // { "YYYY-MM-DD": { "idAlumno": true/false } }

function todayISO(){
  const d = new Date();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export default function Asistencia(){
  const [fecha, setFecha] = useState(todayISO());
  const [alumnos, setAlumnos] = useState([]);
  const [asisMap, setAsisMap] = useState(() => {
    const saved = localStorage.getItem(KEY_ASIS);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(()=>{
    const a = localStorage.getItem(KEY_ALUMNOS);
    setAlumnos(a ? JSON.parse(a) : []);
  },[]);

  const presentForDate = useMemo(()=> asisMap[fecha] || {}, [asisMap, fecha]);

  const toggle = (id) => {
    setAsisMap(prev => {
      const day = { ...(prev[fecha] || {}) };
      day[id] = !day[id];
      const next = { ...prev, [fecha]: day };
      localStorage.setItem(KEY_ASIS, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div>
      <h2>Asistencia</h2>

      <div className="card">
        <label>Fecha</label>
        <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} />
      </div>

      {alumnos.length === 0 && <div className="card">Primero inscribe alumnos en la pestaña "Alumnos".</div>}

      <div className="list">
        {alumnos.map(a => {
          const presente = !!presentForDate[a.id];
          return (
            <div className="card row-center" key={a.id} onClick={()=>toggle(a.id)} style={{cursor:'pointer', justifyContent:'space-between'}}>
              <div>
                <b>{a.nombre}</b> <span className="pill">{a.grupo}</span>
              </div>
              <div className="toggle" style={{color: presente ? "var(--ok)" : "var(--danger)"}}>
                {presente ? "✔ Presente" : "✘ Ausente"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
