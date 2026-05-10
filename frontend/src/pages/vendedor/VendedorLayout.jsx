import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/api";

function VendedorLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="sidebar-brand">🔧 AutoStock</h2>
        <p className="sidebar-user">👤 {user?.name}</p>
        <nav>
          <NavLink to="/vendedor/inicio" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            🏠 Inicio
          </NavLink>
          <NavLink to="/vendedor/inventario" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            📋 Inventario
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default VendedorLayout;