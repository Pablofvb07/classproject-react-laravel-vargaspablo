import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/api";

function AdminLayout() {
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
          <NavLink to="/admin/productos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            📦 Productos
          </NavLink>
          <NavLink to="/admin/proveedores" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            🏭 Proveedores
          </NavLink>
          <NavLink to="/admin/ventas" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            💰 Ventas
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar sesión
        </button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;