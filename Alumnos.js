import React, { useState, useEffect } from "react";

export default function Alumnos() {
  // Cargar desde LocalStorage o array vacío
  const [alumnos, setAlumnos] = useState(() => {
    const guardados = localStorage.getItem("alumnos");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [form, setForm] = useState({ nombre: "", grupo: "", cuota: "", salud: false, imagen: false });

  // Guardar en LocalStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
  }, [alumnos]);

  // Manejar inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Añadir alumno
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlumnos([...alumnos, form]);
    setForm({ nombre: "", grupo: "", cuota: "", salud: false, imagen: false });
  };

  return (
    <div>
      <h2>Alumnos</h2>

      {/* Formulario de inscripción */}
      <form onSubmit={handleSubmit} className="card">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del alumno"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grupo"
          placeholder="Grupo (Niños/Adultos)"
          value={form.grupo}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cuota"
          placeholder="Cuota (€)"
          value={form.cuota}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="salud"
            checked={form.salud}
            onChange={handleChange}
          /> Autorización salud
        </label>
        <label>
          <input
            type="checkbox"
            name="imagen"
            checked={form.imagen}
            onChange={handleChange}
          /> Autorización imagen
        </label>
        <button type="submit">➕ Inscribir alumno</button>
      </form>

      {/* Lista de alumnos */}
      {alumnos.map((a, i) => (
        <div className="card" key={i}>
          <p><b>{a.nombre}</b></p>
          <p>Grupo: {a.grupo}</p>
          <p>Cuota: {a.cuota} €</p>
          <p>Consentimientos: Salud {a.salud ? "✔" : "✘"} | Imagen {a.imagen ? "✔" : "✘"}</p>
        </div>
      ))}
    </div>
  );
}
