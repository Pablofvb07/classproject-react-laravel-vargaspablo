import { useEffect, useState } from "react";
import { getProducts, registrarVenta } from "../../services/api";
import Swal from "sweetalert2";

function Inventario() {
  const [products, setProducts] = useState([]);
  const [ventaModal, setVentaModal] = useState(false);
  const [ventaForm, setVentaForm] = useState({
    product_id: null,
    cantidad: 1,
    cliente_nombre: "",
    tipo_cliente: "consumidor_final",
    cliente_cedula: ""
  });
  const [error, setError] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const load = () => getProducts().then(setProducts);

  useEffect(() => { load(); }, []);

  const handleVenderClick = (p) => {
    if (p.stock === 0) {
      Swal.fire({
        icon: "warning",
        title: "Sin stock",
        text: `El producto "${p.name}" no tiene stock disponible.`,
        confirmButtonColor: "#4f46e5"
      });
      return;
    }
    setProductoSeleccionado(p);
    setVentaForm({ product_id: p.id, cantidad: 1, cliente_nombre: "", tipo_cliente: "consumidor_final", cliente_cedula: "" });
    setVentaModal(true);
    setError("");
  };

  const handleVenta = async (e) => {
    e.preventDefault();
    setError("");
    const data = await registrarVenta(ventaForm);
    if (data.error) { setError(data.error); return; }
    setVentaModal(false);
    load();
    Swal.fire({
      icon: "success",
      title: "¡Venta registrada!",
      html: `<b>Producto:</b> ${productoSeleccionado.name}<br><b>Total:</b> $${data.total}`,
      confirmButtonColor: "#4f46e5"
    });
  };

  return (
    <section>
      <h2>📋 Inventario</h2>

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td><span className={`badge ${p.categoria}`}>{p.categoria}</span></td>
              <td>{p.proveedor?.nombre || "—"}</td>
              <td>
                <button
                  className={`button ${p.stock === 0 ? "ghost" : ""}`}
                  onClick={() => handleVenderClick(p)}
                  disabled={p.stock === 0}
                >
                  {p.stock === 0 ? "Sin stock" : "💰 Vender"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ventaModal && (
        <div className="modal-overlay">
          <article className="modal">
            <h3>💰 Registrar Venta</h3>
            <p className="modal-subtitle">
              Producto: <strong>{productoSeleccionado?.name}</strong> — Stock: <strong>{productoSeleccionado?.stock}</strong>
            </p>

            {error && <p className="alert danger">{error}</p>}

            <form onSubmit={handleVenta} className="flex-col">
              <input className="input" placeholder="Nombre del cliente"
                value={ventaForm.cliente_nombre}
                onChange={(e) => setVentaForm({ ...ventaForm, cliente_nombre: e.target.value })} />

              <select className="input" value={ventaForm.tipo_cliente}
                onChange={(e) => setVentaForm({ ...ventaForm, tipo_cliente: e.target.value, cliente_cedula: "" })}>
                <option value="consumidor_final">Consumidor Final</option>
                <option value="cedula">Cédula</option>
                <option value="ruc">RUC</option>
              </select>

              {ventaForm.tipo_cliente !== "consumidor_final" && (
                <input className="input"
                  placeholder={ventaForm.tipo_cliente === "cedula" ? "Cédula (10 dígitos)" : "RUC (13 dígitos)"}
                  value={ventaForm.cliente_cedula}
                  onChange={(e) => setVentaForm({ ...ventaForm, cliente_cedula: e.target.value })} />
              )}

              <input className="input" placeholder="Cantidad" type="number" min="1"
                max={productoSeleccionado?.stock}
                value={ventaForm.cantidad}
                onChange={(e) => setVentaForm({ ...ventaForm, cantidad: parseInt(e.target.value) })} />

              <footer className="modal-actions">
                <button type="button" className="button ghost" onClick={() => setVentaModal(false)}>
                  Cancelar
                </button>
                <button className="button" type="submit">Confirmar venta</button>
              </footer>
            </form>
          </article>
        </div>
      )}
    </section>
  );
}

export default Inventario;