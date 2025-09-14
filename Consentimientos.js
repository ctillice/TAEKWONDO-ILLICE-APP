import React from "react";
export default function Consentimientos() {
  const datos = [
    { nombre: "Juan Pérez", salud: "Sí", imagen: "No" },
    { nombre: "María López", salud: "No", imagen: "Sí" }
  ];
  return (
    <div>
      <h2>Consentimientos</h2>
      {datos.map((d, i) => (
        <div className="card" key={i}>
          <p><b>{d.nombre}</b></p>
          <p>Salud: {d.salud}</p>
          <p>Imagen: {d.imagen}</p>
        </div>
      ))}
    </div>
  );
}
