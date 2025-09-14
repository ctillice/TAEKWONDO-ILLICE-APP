import React, { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";

export default function Recibos(){
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoId, setAlumnoId] = useState("");
  const [mes, setMes] = useState(()=>{
    const d=new Date(); const m=String(d.getMonth()+1).padStart(2,'0'); return `${d.getFullYear()}-${m}`;
  });
  const [importe, setImporte] = useState("");

  useEffect(()=>{
    const a = localStorage.getItem("alumnos");
    const list = a ? JSON.parse(a) : [];
    setAlumnos(list);
    if(list.length>0){
      setAlumnoId(String(list[0].id));
      setImporte(String(list[0].cuota || "25"));
    }
  },[]);

  const alumno = useMemo(()=> alumnos.find(x=> String(x.id)===String(alumnoId)), [alumnos, alumnoId]);

  useEffect(()=>{
    if(alumno) setImporte(String(alumno.cuota || ""));
  },[alumnoId]); // eslint-disable-line

  const generarPDF = () => {
    if(!alumno){ alert("Selecciona un alumno"); return; }
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Recibo Mensualidad - Taekwondo", 20, 20);
    doc.setFontSize(12);
    doc.text(`Alumno: ${alumno.nombre}`, 20, 40);
    doc.text(`Grupo: ${alumno.grupo}`, 20, 50);
    doc.text(`Mes: ${formateaMes(mes)}`, 20, 60);
    doc.text(`Importe: ${Number(importe).toFixed(2)} €`, 20, 70);
    const safeName = alumno.nombre.replace(/\s+/g,'_');
    doc.save(`Recibo_${safeName}_${mes}.pdf`);
  };

  const enviarWhatsApp = () => {
    if(!alumno){ alert("Selecciona un alumno"); return; }
    const mensaje = `Recibo mensualidad\nAlumno: ${alumno.nombre}\nGrupo: ${alumno.grupo}\nMes: ${formateaMes(mes)}\nImporte: ${Number(importe).toFixed(2)} €`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <h2>Recibos</h2>

      {alumnos.length===0 && <div className="card">Primero inscribe alumnos en la pestaña "Alumnos".</div>}

      {alumnos.length>0 && (
        <div className="card">
          <div className="row">
            <div>
              <label>Alumno</label>
              <select className="select" value={alumnoId} onChange={e=>setAlumnoId(e.target.value)}>
                {alumnos.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
              </select>
            </div>
            <div>
              <label>Mes</label>
              <input type="month" value={mes} onChange={e=>setMes(e.target.value)} />
            </div>
          </div>
          <div className="row mt-1">
            <div>
              <label>Importe (€)</label>
              <input type="number" value={importe} onChange={e=>setImporte(e.target.value)} />
            </div>
          </div>
          <div className="mt-2">
            <button className="btn btn-primary" onClick={generarPDF}>📄 Descargar PDF</button>
            <button className="btn btn-outline" onClick={enviarWhatsApp} style={{marginLeft: '8px'}}>💬 WhatsApp</button>
          </div>
        </div>
      )}
    </div>
  );
}

function formateaMes(val){
  if(!val) return "";
  const [y,m] = val.split("-");
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  return `${meses[Number(m)-1]} ${y}`;
}
