import { useEffect, useState } from "react";
import { getVentas } from "../../services/api";

function Ventas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => { getVentas().then(setVentas); }, []);

  return (
    <section>
      <h2>💰 Historial de Ventas</h2>

      <table className="tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Vendedor</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Cédula/RUC</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{new Date(v.created_at).toLocaleDateString('es-EC')}</td>
              <td>{v.product?.name}</td>
              <td>{v.user?.name}</td>
              <td>{v.cliente_nombre}</td>
              <td>
                <span className={`badge ${v.tipo_cliente === 'consumidor_final' ? 'accesorio' : 'bateria'}`}>
                  {v.tipo_cliente === 'consumidor_final' ? 'Consumidor final' : v.tipo_cliente.toUpperCase()}
                </span>
              </td>
              <td>{v.cliente_cedula || "—"}</td>
              <td>{v.cantidad}</td>
              <td><strong>${v.total}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Ventas;