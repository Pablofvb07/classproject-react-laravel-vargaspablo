import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  const getProducts = () => {
    fetch("http://127.0.0.1:8000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const saveProduct = (e) => {
    e.preventDefault();

    if (!name || !price) {
      Swal.fire("Error", "Completa todos los campos", "warning");
      return;
    }

    const url = editingId
      ? `http://127.0.0.1:8000/api/products/${editingId}`
      : "http://127.0.0.1:8000/api/products";

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, price })
    })
      .then(() => {
        Swal.fire("Éxito", editingId ? "Actualizado" : "Creado", "success");
        setName("");
        setPrice("");
        setEditingId(null);
        getProducts();
      });
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: "¿Eliminar?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:8000/api/products/${id}`, {
          method: "DELETE"
        }).then(() => {
          Swal.fire("Eliminado", "", "success");
          getProducts();
        });
      }
    });
  };

  const editProduct = (p) => {
    setName(p.name);
    setPrice(p.price);
    setEditingId(p.id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CRUD Productos 🚀</h1>

      <form onSubmit={saveProduct} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button style={styles.button}>
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <div style={styles.list}>
        {products.map(p => (
          <div key={p.id} style={styles.card}>
            <div>
              <strong>{p.name}</strong>
              <p>${p.price}</p>
            </div>

            <div>
              <button
                style={styles.editBtn}
                onClick={() => editProduct(p)}
              >
                ✏️
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteProduct(p.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 estilos mejorados
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial",
    padding: "20px"
  },
  title: {
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    flex: 1,
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 20px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  editBtn: {
    marginRight: "5px",
    background: "orange",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default App;