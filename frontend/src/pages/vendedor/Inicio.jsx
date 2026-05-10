import { useNavigate } from "react-router-dom";

function Inicio() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <h2>Bienvenido, {user?.name} 👋</h2>
        <p>¿Qué deseas hacer hoy?</p>
      </header>

      <div className="dashboard-cards">
        <article className="dashboard-card" onClick={() => navigate("/vendedor/inventario")}>
          <span className="dashboard-icon">📋</span>
          <h3>Ver Inventario</h3>
          <p>Consulta el stock disponible y registra ventas de productos</p>
        </article>

        <article className="dashboard-card disabled">
          <span className="dashboard-icon">🔋</span>
          <h3>Módulo de Baterías</h3>
          <p>Encuentra baterías compatibles por marca, modelo y año del vehículo</p>
          <span className="coming-soon">Próximamente</span>
        </article>
      </div>
    </section>
  );
}

export default Inicio;