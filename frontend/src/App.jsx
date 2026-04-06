import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API = "http://127.0.0.1:8000/api";

  // 📦 OBTENER PRODUCTOS
  const getProducts = () => {
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    if (user) getProducts();
  }, [user]);

  // 🔐 LOGIN
  const login = (e) => {
    e.preventDefault();

    fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert("Credenciales incorrectas");
        } else {
          setUser(data);
        }
      });
  };

  // 📝 REGISTER
  const register = (e) => {
    e.preventDefault();

    fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    }).then(() => {
      alert("Usuario creado");
      setIsRegister(false);
    });
  };

  // ➕ CREAR / ✏️ EDITAR
  const saveProduct = (e) => {
    e.preventDefault();

    const url = editingId
      ? `${API}/products/${editingId}`
      : `${API}/products`;

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: productName, price })
    }).then(() => {
      setProductName("");
      setPrice("");
      setEditingId(null);
      getProducts();
    });
  };

  // ❌ ELIMINAR
  const deleteProduct = (id) => {
    fetch(`${API}/products/${id}`, {
      method: "DELETE"
    }).then(() => getProducts());
  };

  // ✏️ EDITAR
  const editProduct = (p) => {
    setProductName(p.name);
    setPrice(p.price);
    setEditingId(p.id);
  };

  // 🔐 LOGIN / REGISTER UI
  if (!user) {
    return (
      <div className="center">
        <div className="card">
          <h2>{isRegister ? "Crear Cuenta" : "Bienvenido"}</h2>
          <p>{isRegister ? "Regístrate para continuar" : "Inicia sesión"}</p>

          <form onSubmit={isRegister ? register : login}>
            {isRegister && (
              <input
                className="input"
                placeholder="Nombre"
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              className="input"
              type="email"
              placeholder="Correo"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="input"
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="button">
              {isRegister ? "Registrarse" : "Ingresar"}
            </button>
          </form>

          <button
            className="link"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Ya tengo cuenta" : "Crear cuenta"}
          </button>
        </div>
      </div>
    );
  }

  // 🔓 APP PRINCIPAL (CRUD)
  return (
    <div className="container">
      <h1 style={{ color: "white" }}>
        Bienvenido {user.name} 🚀
      </h1>

      <button
        style={{
          marginBottom: "15px",
          padding: "8px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer"
        }}
        onClick={() => setUser(null)}
      >
        Cerrar sesión
      </button>

      <form onSubmit={saveProduct} className="form">
        <input
          className="input"
          placeholder="Producto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="button">
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      {products.map(p => (
        <div key={p.id} className="product">
          <div>
            <strong>{p.name}</strong>
            <p>${p.price}</p>
          </div>

          <div>
            <button onClick={() => editProduct(p)}>✏️</button>
            <button onClick={() => deleteProduct(p.id)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;