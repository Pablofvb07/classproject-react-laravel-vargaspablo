import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct, updateProduct, getProveedores, registrarVenta } from "../../services/api";
import Swal from "sweetalert2";

function Productos() {
  const [products, setProducts] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "", categoria: "accesorio", proveedor_id: "" });
  const [editando, setEditando] = useState(null);
  const [ventaModal, setVentaModal] = useState(false);
  const [ventaForm, setVentaForm] = useState({ product_id: null, cantidad: 1, cliente_nombre: "", tipo_cliente: "consumidor_final", cliente_cedula: "" });
  const [error, setError] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const load = () => {
    getProducts().then(setProducts);
    getProveedores().then(setProveedores);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = editando ? await updateProduct(editando.id, form) : await createProduct(form);
    if (data.errors || data.error) { setError(data.message || data.error); return; }
    setForm({ name: "", price: "", stock: "", categoria: "accesorio", proveedor_id: "" });
    setEditando(null);
    load();
    Swal.fire({
      icon: "success",
      title: editando ? "¡Producto actualizado!" : "¡Producto creado!",
      confirmButtonColor: "#4f46e5",
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleEditar = (p) => {
    setEditando(p);
    setForm({ name: p.name, price: p.price, stock: p.stock, categoria: p.categoria, proveedor_id: p.proveedor_id || "" });
  };

  const handleEliminar = async (p) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar producto?",
      text: `Se eliminará "${p.name}" permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (result.isConfirmed) {
      await deleteProduct(p.id);
      load();
      Swal.fire({ icon: "success", title: "Eliminado", timer: 1200, showConfirmButton: false });
    }
  };

  const handleVenderClick = (p) => {
    if (p.stock === 0) {
      Swal.fire({ icon: "warning", title: "Sin stock", text: `"${p.name}" no tiene stock disponible.`, confirmButtonColor: "#4f46e5" });
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
      <h2>📦 Productos</h2>

      {error && !ventaModal && <p className="alert danger">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <h3>{editando ? "Editar producto" : "Nuevo producto"}</h3>

        <input className="input" placeholder="Nombre del producto" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Precio" type="number" value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="input" placeholder="Stock" type="number" value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })} />

        <select className="input" value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value, proveedor_id: "" })}>
          <option value="accesorio">Accesorio</option>
          <option value="bateria">Batería</option>
        </select>

        {form.categoria === "bateria" && (
          <select className="input" value={form.proveedor_id}
            onChange={(e) => setForm({ ...form, proveedor_id: e.target.value })}>
            <option value="">-- Selecciona un proveedor --</option>
            {proveedores.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        )}

        <footer className="flex-row">
          <button className="button" type="submit">{editando ? "Actualizar" : "Crear"}</button>
          {editando && (
            <button type="button" className="button ghost"
              onClick={() => { setEditando(null); setForm({ name: "", price: "", stock: "", categoria: "accesorio", proveedor_id: "" }); }}>
              Cancelar
            </button>
          )}
        </footer>
      </form>

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Acciones</th>
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
                <button className="btn-icon" onClick={() => handleEditar(p)} title="Editar">✏️</button>
                <button className="btn-icon danger" onClick={() => handleEliminar(p)} title="Eliminar">🗑️</button>
                <button className="btn-icon" onClick={() => handleVenderClick(p)} title="Vender">💰</button>
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
                <button type="button" className="button ghost" onClick={() => setVentaModal(false)}>Cancelar</button>
                <button className="button" type="submit">Confirmar venta</button>
              </footer>
            </form>
          </article>
        </div>
      )}
    </section>
  );
}

export default Productos;