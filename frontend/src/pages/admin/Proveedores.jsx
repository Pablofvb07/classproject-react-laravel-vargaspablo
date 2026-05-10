import { useEffect, useState } from "react";
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from "../../services/api";
import Swal from "sweetalert2";

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", direccion: "" });
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");

  const load = () => getProveedores().then(setProveedores);

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = editando ? await updateProveedor(editando.id, form) : await createProveedor(form);
    if (data.errors || data.error) { setError(data.message || data.error); return; }
    setForm({ nombre: "", telefono: "", email: "", direccion: "" });
    setEditando(null);
    load();
    Swal.fire({
      icon: "success",
      title: editando ? "¡Proveedor actualizado!" : "¡Proveedor creado!",
      confirmButtonColor: "#4f46e5",
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleEditar = (p) => {
    setEditando(p);
    setForm({ nombre: p.nombre, telefono: p.telefono, email: p.email, direccion: p.direccion });
  };

  const handleEliminar = async (p) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar proveedor?",
      text: `Se eliminará "${p.nombre}" permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (result.isConfirmed) {
      await deleteProveedor(p.id);
      load();
      Swal.fire({ icon: "success", title: "Eliminado", timer: 1200, showConfirmButton: false });
    }
  };

  return (
    <section>
      <h2>🏭 Proveedores</h2>

      {error && <p className="alert danger">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <h3>{editando ? "Editar proveedor" : "Nuevo proveedor"}</h3>

        <input className="input" placeholder="Nombre de la empresa" value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        <input className="input" placeholder="Teléfono" value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
        <input className="input" placeholder="Email" type="email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" placeholder="Dirección" value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })} />

        <footer className="flex-row">
          <button className="button" type="submit">{editando ? "Actualizar" : "Crear"}</button>
          {editando && (
            <button type="button" className="button ghost"
              onClick={() => { setEditando(null); setForm({ nombre: "", telefono: "", email: "", direccion: "" }); }}>
              Cancelar
            </button>
          )}
        </footer>
      </form>

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.telefono}</td>
              <td>{p.email}</td>
              <td>{p.direccion}</td>
              <td>
                <button className="btn-icon" onClick={() => handleEditar(p)} title="Editar">✏️</button>
                <button className="btn-icon danger" onClick={() => handleEliminar(p)} title="Eliminar">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Proveedores;