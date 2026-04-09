import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct";
import ProtectedRoute from "./pages/ProtectedRoute"; // 👈 IMPORTANTE

function App() {
  return (
    <Routes>
      {/* 🔓 Pública */}
      <Route path="/" element={<Login />} />

      {/* 🔒 Protegidas */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;