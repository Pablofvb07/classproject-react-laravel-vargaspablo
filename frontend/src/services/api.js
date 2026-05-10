const API = "http://127.0.0.1:8000/api";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
});

// 🔐 AUTH
export const loginUser = (data) =>
  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const registerUser = (data) =>
  fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const logoutUser = () =>
  fetch(`${API}/logout`, {
    method: "POST",
    headers: authHeaders()
  }).then(res => res.json());

// 📦 PRODUCTOS
export const getProducts = () =>
  fetch(`${API}/products`, {
    headers: authHeaders()
  }).then(res => res.json());

export const getProduct = (id) =>
  fetch(`${API}/products/${id}`, {
    headers: authHeaders()
  }).then(res => res.json());

export const createProduct = (data) =>
  fetch(`${API}/products`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json());

export const updateProduct = (id, data) =>
  fetch(`${API}/products/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteProduct = (id) =>
  fetch(`${API}/products/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  }).then(res => res.json());

// 💰 VENTAS
export const registrarVenta = (data) =>
  fetch(`${API}/ventas`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json());

export const getVentas = () =>
  fetch(`${API}/ventas`, {
    headers: authHeaders()
  }).then(res => res.json());

  // 🏭 PROVEEDORES
export const getProveedores = () =>
  fetch(`${API}/proveedores`, {
    headers: authHeaders()
  }).then(res => res.json());

export const createProveedor = (data) =>
  fetch(`${API}/proveedores`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json());

export const updateProveedor = (id, data) =>
  fetch(`${API}/proveedores/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteProveedor = (id) =>
  fetch(`${API}/proveedores/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  }).then(res => res.json());