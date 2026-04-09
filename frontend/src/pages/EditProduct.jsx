import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, getProducts } from "../services/api";
import "../App.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({ name: "", price: "" });

  useEffect(() => {
    getProducts().then((data) => {
      const found = data.find(p => p.id == id);
      setProduct(found);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateProduct(id, product);
    navigate("/products");
  };

  return (
    <main className="center">
      <section className="card">
        <h2>Editar Producto</h2>

        <form onSubmit={handleUpdate}>
          <input
            className="input"
            value={product?.name || ""}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />

          <input
            className="input"
            value={product?.price || ""}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <button className="button">Actualizar</button>
        </form>
      </section>
    </main>
  );
}

export default EditProduct;