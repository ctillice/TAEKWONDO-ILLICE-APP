import React, { useState, useEffect } from "react";

const STORAGE_KEY = "alumnos";

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    nombre: "", dni: "", fecha: "", telefono: "",
    padre: "", telPadre: "",
    grupo: "Niños", cuota: "25",
    salud: false, telWhatsapp: true, imagenRRSS: false, imagenInternet: false,
    publicidad: false, cesionFederacion: true, cesionOtros: false
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alumnos));
  }, [alumnos]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.nombre.trim()) return;
    const nuevo = { id: Date.now(), createdAt: new Date().toISOString(), ...form };
    setAlumnos((list) => [nuevo, ...list]);
    setForm({
      nombre: "", dni: "", fecha: "", telefono: "",
      padre: "", telPadre: "",
      grupo: "Niños", cuota: "25",
      salud: false, telWhatsapp: true, imagenRRSS: false, imagenInternet: false,
      publicidad: false, cesionFederacion: true, cesionOtros: false
    });
  };

  const eliminar = (id) => setAlumnos((list) => list.filter(a => a.id !== id));

  return (
    <div>
      <h2>Alumnos</h2>

      <form onSubmit={handleSubmit} className="card">
        <div className="row">
          <div>
            <label>Nombre y apellidos</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre y apellidos" required />
          </div>
          <div>
            <label>DNI</label>
            <input name="dni" value={form.dni} onChange={handleChange} placeholder="DNI" />
          </div>
        </div>

        <div className="row mt-1">
          <div>
            <label>Fecha nacimiento</label>
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
          </div>
          <div>
            <label>Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
          </div>
        </div>

        <div className="row mt-1">
          <div>
            <label>Nombre padre/madre</label>
            <input name="padre" value={form.padre} onChange={handleChange} placeholder="Padre/Madre/Tutor" />
          </div>
          <div>
            <label>Teléfono padre/madre</label>
            <input name="telPadre" value={form.telPadre} onChange={handleChange} placeholder="Teléfono padre/madre" />
          </div>
        </div>

        <div className="row mt-1">
          <div>
            <label>Grupo</label>
            <select name="grupo" value={form.grupo} onChange={handleChange} className="select">
              <option>Niños</option>
              <option>Adultos</option>
            </select>
          </div>
          <div>
            <label>Cuota €/mes</label>
            <select name="cuota" value={form.cuota} onChange={handleChange} className="select">
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>

        <div className="row-3 mt-2">
          <label><input type="checkbox" name="salud" checked={form.salud} onChange={handleChange}/> Salud</label>
          <label><input type="checkbox" name="telWhatsapp" checked={form.telWhatsapp} onChange={handleChange}/> Teléfono/WhatsApp</label>
          <label><input type="checkbox" name="imagenRRSS" checked={form.imagenRRSS} onChange={handleChange}/> Imagen en RRSS</label>
          <label><input type="checkbox" name="imagenInternet" checked={form.imagenInternet} onChange={handleChange}/> Imagen en Internet</label>
          <label><input type="checkbox" name="publicidad" checked={form.publicidad} onChange={handleChange}/> Publicidad club</label>
          <label><input type="checkbox" name="cesionFederacion" checked={form.cesionFederacion} onChange={handleChange}/> Cesión Federación</label>
          <label><input type="checkbox" name="cesionOtros" checked={form.cesionOtros} onChange={handleChange}/> Cesión a otros</label>
        </div>

        <div className="mt-2">
          <button className="btn btn-primary" type="submit">➕ Inscribir alumno</button>
        </div>
      </form>

      {alumnos.length === 0 && <div className="card">Aún no hay alumnos inscritos.</div>}

      {alumnos.map((a) => (
        <div className="card" key={a.id}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <b>{a.nombre}</b> <span className="pill">{a.grupo}</span>
              <div className="badges mt-1">
                <span>Cuota: {a.cuota}€</span>
                <span>Salud {a.salud ? "✔" : "✘"}</span>
                <span>WhatsApp {a.telWhatsapp ? "✔" : "✘"}</span>
                <span>RRSS {a.imagenRRSS ? "✔" : "✘"}</span>
                <span>Internet {a.imagenInternet ? "✔" : "✘"}</span>
                <span>Publicidad {a.publicidad ? "✔" : "✘"}</span>
                <span>Federación {a.cesionFederacion ? "✔" : "✘"}</span>
                <span>Otros {a.cesionOtros ? "✔" : "✘"}</span>
              </div>
              <div className="mt-1" style={{color:'#667085',fontSize:'.9rem'}}>
                DNI: {a.dni || "-"} · Tel: {a.telefono || "-"} · Padre/Madre: {a.padre || "-"} ({a.telPadre || "-"}) 
              </div>
            </div>
            <button className="btn btn-danger" onClick={()=>eliminar(a.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
