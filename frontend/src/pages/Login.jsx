import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";
import "../App.css";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUser(form);

    if (data.error) return alert("Error");
    
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/products");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(form);
    alert("Usuario creado");
    setIsRegister(false);
  };

  return (
    <main className="center">
      <section className="card">
        <h2>{isRegister ? "Registro" : "Login"}</h2>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
            <input
              className="input"
              placeholder="Nombre"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            className="input"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="button">
            {isRegister ? "Registrar" : "Ingresar"}
          </button>
        </form>

        <button onClick={() => setIsRegister(!isRegister)} className="link">
          {isRegister ? "Tengo cuenta" : "Crear cuenta"}
        </button>
      </section>
    </main>
  );
}

export default Login;   