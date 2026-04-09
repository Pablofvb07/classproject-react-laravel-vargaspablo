import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  createProduct,
  deleteProduct
} from "../services/api";
import "../App.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: "", price: "" });

  const navigate = useNavigate();

  // 👤 Obtener usuario (opcional pero pro)
  const user = JSON.parse(localStorage.getItem("user"));

  const loadProducts = () => {
    getProducts().then(setProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔐 LOGOUT REAL
  const handleLogout = () => {
    localStorage.removeItem("user"); // 👈 borra sesión
    navigate("/"); // 👈 redirige al login
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createProduct(product);
    setProduct({ name: "", price: "" });
    loadProducts();
  };

  return (
    <main className="container">
      <header>
        <h1>Productos</h1>

        {/* 👤 Usuario + logout */}
        <div>
          <span>👋 {user?.name}</span>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>

      <section>
        <form onSubmit={handleCreate} className="form">
          <input
            className="input"
            placeholder="Producto"
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />
          <input
            className="input"
            placeholder="Precio"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />
          <button className="button">Crear</button>
        </form>
      </section>

      <section>
        <ul>
          {products.map((p) => (
            <li key={p.id} className="product">
              <span>{p.name} - ${p.price}</span>

              <nav>
                <button onClick={() => navigate(`/edit/${p.id}`)}>
                  ✏️
                </button>
                <button
                  onClick={() => deleteProduct(p.id).then(loadProducts)}
                >
                  🗑️
                </button>
              </nav>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Products;