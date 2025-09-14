import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Alumnos from "./pages/Alumnos";
import Asistencia from "./pages/Asistencia";
import Consentimientos from "./pages/Consentimientos";
import Recibos from "./pages/Recibos";

function App() {
  return (
    <div className="app">
      <div className="content">
        <Routes>
          <Route path="/" element={<Alumnos />} />
          <Route path="/asistencia" element={<Asistencia />} />
          <Route path="/consentimientos" element={<Consentimientos />} />
          <Route path="/recibos" element={<Recibos />} />
        </Routes>
      </div>
      <nav className="navbar">
        <Link to="/">👥 Alumnos</Link>
        <Link to="/asistencia">✅ Asistencia</Link>
        <Link to="/consentimientos">🔒 LOPD</Link>
        <Link to="/recibos">💳 Recibos</Link>
      </nav>
    </div>
  );
}
export default App;
