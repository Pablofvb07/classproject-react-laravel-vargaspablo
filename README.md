# 🔧 AutoStock — Sistema de Gestión de Inventario Automotriz

Sistema web de gestión de inventario para una tienda de accesorios automotrices y baterías de vehículos y camiones. Permite administrar productos, stock, proveedores y ventas mediante un sistema de login con roles de usuario.

---

## 🌐 Deploy

| Servicio | URL |
|---|---|
| 🎨 Frontend (Vercel) | [classproject-react-laravel-vargaspa.vercel.app](https://classproject-react-laravel-vargaspa.vercel.app) |
| 🔙 Backend (Render) | [autostock-grupovargas-backend.onrender.com](https://autostock-grupovargas-backend.onrender.com) |
| 🗄️ Base de datos | MySQL en Railway |

> ⚠️ El backend está deployado en Render con plan gratuito. La primera petición puede tardar ~30 segundos en "despertar" el servidor si estuvo inactivo.
> ⚠️ La base de datos en Railway tiene 10 días de prueba gratuita.

---

## 🎥 Video explicativo

[![Video explicativo](https://img.shields.io/badge/YouTube-Ver%20video-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=vmC6C_wRQjo)

---

## 🧠 Descripción

AutoStock es una aplicación web completa que separa el backend (API REST con Laravel) del frontend (SPA con React). Incluye:

- Sistema de autenticación con tokens reales (Laravel Sanctum)
- Control de acceso basado en roles (Admin y Vendedor)
- Gestión completa de productos con categorías y proveedores
- Registro de ventas con validación de cédula/RUC ecuatoriana en el backend
- Historial de ventas con información del cliente y vendedor
- Interfaces separadas y personalizadas según el rol del usuario

---

## 👥 Roles del sistema

### 🔑 Admin
- CRUD completo de productos y proveedores
- Registrar ventas
- Ver historial completo de ventas

### 🛒 Vendedor
- Ver inventario de productos
- Registrar ventas de productos
- Módulo de baterías compatibles *(próximamente)*

---

## 🛠️ Tecnologías

### Backend
- PHP 8.4
- Laravel 13
- Laravel Sanctum (autenticación por tokens)
- MySQL
- Docker

### Frontend
- React 19
- React Router DOM v7
- Vite 8
- SCSS modular
- SweetAlert2

---

## 📁 Estructura del proyecto

```
Proyecto Ing.Web/
│
├── backend/          # API REST con Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   └── Middleware/
│   │   └── Models/
│   ├── database/migrations/
│   ├── routes/api.php
│   ├── docker/
│   │   ├── start.sh
│   │   └── nginx.conf
│   └── Dockerfile
│
├── frontend/         # SPA con React
│   ├── src/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── vendedor/
│   │   ├── services/api.js
│   │   └── styles/
│   └── .env.production
│
└── README.md
```

---

## ⚙️ Instalación local

### Requisitos previos
- PHP >= 8.4
- Composer
- Node.js >= 18
- XAMPP (Apache + MySQL)
- Docker Desktop *(opcional, solo para build)*

---

### 🔙 Backend (Laravel)

**1. Iniciar XAMPP** — encender Apache y MySQL

**2. Crear base de datos** en `http://localhost/phpmyadmin`:
```sql
CREATE DATABASE crud_db;
```

**3. Instalar dependencias:**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

**4. Configurar `.env`:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crud_db
DB_USERNAME=root
DB_PASSWORD=
```

**5. Correr migraciones:**
```bash
php artisan migrate
```

**6. Iniciar servidor:**
```bash
php artisan serve
```

✅ Backend disponible en `http://127.0.0.1:8000`

---

### 🎨 Frontend (React)

**1. Crear archivo de entorno local** `frontend/.env.local`:
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

**2. Instalar dependencias e iniciar:**
```bash
cd frontend
npm install
npm run dev
```

✅ Frontend disponible en `http://localhost:5173`

---

## 🌐 API — Endpoints principales

### Autenticación (pública)
```
POST  /api/register
POST  /api/login
POST  /api/logout
```

### Productos (requiere token)
```
GET   /api/products        — Admin y Vendedor
GET   /api/products/{id}   — Admin y Vendedor
POST  /api/products        — Solo Admin
PUT   /api/products/{id}   — Solo Admin
DELETE /api/products/{id}  — Solo Admin
```

### Proveedores (requiere token)
```
GET   /api/proveedores        — Admin y Vendedor
POST  /api/proveedores        — Solo Admin
PUT   /api/proveedores/{id}   — Solo Admin
DELETE /api/proveedores/{id}  — Solo Admin
```

### Ventas (requiere token)
```
POST  /api/ventas   — Admin y Vendedor
GET   /api/ventas   — Solo Admin
```

---

## 🔐 Credenciales de prueba

| Rol | Email | Password |
|---|---|---|
| Admin | admin@test.com | 123456 |
| Vendedor | vendedor@test.com | 123456 |

---

## 🚨 Validaciones destacadas

- **Cédula/RUC ecuatoriana** validada en el backend con algoritmo del Módulo 10 antes de registrar cualquier venta con garantía
- **Proveedor obligatorio** para baterías, opcional para accesorios
- **Control de stock** — no se puede vender más unidades de las disponibles
- **Middleware de roles** — las rutas de escritura están protegidas en el backend, no solo en el frontend

---

## 🐳 Docker

El backend está dockerizado para producción:

```bash
cd backend
docker build -t autostock-backend .
docker run -p 8000:80 \
  -e APP_KEY=tu_app_key \
  -e DB_HOST=tu_host \
  -e DB_DATABASE=tu_db \
  -e DB_USERNAME=tu_user \
  -e DB_PASSWORD=tu_password \
  autostock-backend
```

---

## 📋 Historial de commits

```
feat: interfaces separadas admin/vendedor con SCSS modular y SweetAlert2
feat: módulo de ventas con validación de cédula/RUC ecuatoriana en backend
feat: módulo de proveedores con dropdown en formulario de productos
feat: roles admin/vendedor con Laravel Sanctum
feat: estructura base con autenticación y CRUD de productos
```

---

## 📬 Contacto

**Pablo Francisco Vargas Barriga**

[![Email](https://img.shields.io/badge/Email-pablovargas44%40gmail.com-blue?style=for-the-badge&logo=gmail)](mailto:pablovargas44@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Pablo%20Vargas-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/pablo-francisco-vargas-barriga-09198b335/)

---

*Proyecto desarrollado para la materia de Ingeniería Web — 2026*
