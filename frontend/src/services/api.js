const API = "http://127.0.0.1:8000/api";

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
  });

// 📦 PRODUCTS
export const getProducts = () =>
  fetch(`${API}/products`).then(res => res.json());

export const createProduct = (data) =>
  fetch(`${API}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const updateProduct = (id, data) =>
  fetch(`${API}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const deleteProduct = (id) =>
  fetch(`${API}/products/${id}`, {
    method: "DELETE"
  });