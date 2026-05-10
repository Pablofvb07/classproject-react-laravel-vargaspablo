import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";
import Swal from "sweetalert2";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "vendedor" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const data = await loginUser(form);
    if (data.error) { setError(data.error); return; }
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    if (data.user.role === "admin") navigate("/admin/productos");
    else navigate("/vendedor/inicio");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const data = await registerUser(form);
    if (data.error) { setError(data.error); return; }
    await Swal.fire({
      icon: "success",
      title: "¡Usuario creado!",
      text: "Ya puedes iniciar sesión",
      confirmButtonColor: "#4f46e5"
    });
    setIsRegister(false);
  };

  return (
    <main className="login-page">
      <article className="login-card">
        <header className="login-header">
          <h1>🔧 AutoStock</h1>
          <p>{isRegister ? "Crea tu cuenta" : "Inicia sesión en tu cuenta"}</p>
        </header>

        {error && <p className="alert danger">{error}</p>}

        <form className="login-form" onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
            <>
              <input className="input" placeholder="Nombre completo"
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <select className="input" value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="vendedor">Vendedor</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}
          <input className="input" placeholder="Correo electrónico" type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input" type="password" placeholder="Contraseña"
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button className="button" type="submit">
            {isRegister ? "Crear cuenta" : "Ingresar"}
          </button>
        </form>

        <footer className="login-footer">
          <button className="link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </button>
        </footer>
      </article>
    </main>
  );
}

export default Login;