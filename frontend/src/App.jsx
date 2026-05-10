import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import Productos from "./pages/admin/Productos";
import Proveedores from "./pages/admin/Proveedores";
import Ventas from "./pages/admin/Ventas";
import VendedorLayout from "./pages/vendedor/VendedorLayout";
import Inicio from "./pages/vendedor/Inicio";
import Inventario from "./pages/vendedor/Inventario";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admin/productos" />} />
        <Route path="productos" element={<Productos />} />
        <Route path="proveedores" element={<Proveedores />} />
        <Route path="ventas" element={<Ventas />} />
      </Route>

      <Route path="/vendedor" element={
        <ProtectedRoute requiredRole="vendedor">
          <VendedorLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/vendedor/inicio" />} />
        <Route path="inicio" element={<Inicio />} />
        <Route path="inventario" element={<Inventario />} />
      </Route>
    </Routes>
  );
}

export default App;