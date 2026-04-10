# 🚀 Sistema CRUD con Autenticación (Laravel + React)

Aplicación web completa que permite registrar usuarios, iniciar sesión y gestionar productos mediante un CRUD (Crear, Leer, Actualizar, Eliminar).

---

## 🧠 Descripción

Este proyecto implementa una arquitectura moderna separando:

* 🔙 **Backend** con Laravel (API REST)
* 🎨 **Frontend** con React (SPA)
* 🗄️ **Base de datos** MySQL (gestionada con XAMPP)

Incluye autenticación básica y protección de rutas en el frontend.

---

## 🛠️ Tecnologías utilizadas

### Backend

* PHP
* Laravel
* MySQL (XAMPP)
* Eloquent ORM

### Frontend

* React
* React Router DOM
* Fetch API
* CSS

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

### 🔧 Backend

* PHP (>= 8.x)
* Composer
* XAMPP (Apache + MySQL)
* Node.js (para herramientas de frontend si usas Laravel Mix/Vite)

### 🎨 Frontend

* Node.js
* npm

---

## 📁 Estructura del proyecto

```
Proyecto Ing.Web/
│
├── backend/        # API Laravel
├── frontend/       # Aplicación React
└── README.md
```

---

## 🧩 Instalación y ejecución

---

### 🔙 1. Backend (Laravel + XAMPP)

#### ▶️ Paso 1: Iniciar XAMPP

Abrir XAMPP y encender:

* ✅ Apache
* ✅ MySQL

---

#### ▶️ Paso 2: Configurar proyecto Laravel

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

---

#### ▶️ Paso 3: Configurar base de datos

Entrar a:

```
http://localhost/phpmyadmin
```

Crear base de datos:

```
crud_db
```

---

Editar archivo `.env`:

```env
DB_DATABASE=crud_db
DB_USERNAME=root
DB_PASSWORD=
```

---

#### ▶️ Paso 4: Migraciones

```bash
php artisan migrate
```

---

#### ▶️ Paso 5: Iniciar servidor Laravel

```bash
php artisan serve
```

---

✅ Backend corriendo en:

```
http://127.0.0.1:8000
```

---

### 🎨 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

✅ Frontend disponible en:

```
http://localhost:5173
```

---

## 🌐 API

Endpoints principales:

```
GET     /api/products
POST    /api/products
PUT     /api/products/{id}
DELETE  /api/products/{id}

POST    /api/register
POST    /api/login
```

---

## 🔐 Funcionalidades

### 👤 Autenticación

* Registro de usuario
* Login
* Persistencia de sesión con localStorage
* Protección de rutas con `ProtectedRoute`

### 📦 CRUD de Productos

* Crear productos
* Listar productos
* Editar productos
* Eliminar productos

---

## 🔒 Protección de rutas

Se implementa un componente `ProtectedRoute` que:

* Verifica si existe un usuario en `localStorage`
* Redirige al login si no hay sesión activa

---

## 🧠 Conceptos aplicados

* Arquitectura cliente-servidor
* SPA (Single Page Application)
* Consumo de APIs REST
* Patrón MVC (Laravel)
* Manejo de estado en React
* Control de acceso (frontend)

---

## 🚀 Mejoras futuras

* Autenticación con tokens (JWT o Laravel Sanctum)
* Validaciones avanzadas
* Mejor diseño UI/UX
* Manejo global de estado (Context API / Redux)
* Deploy en producción

---

## 👨‍💻 Autor

**Pablo Vargas**
Estudiante de Ingeniería en Software

---

## ⭐ Notas

Este proyecto fue desarrollado con fines educativos para comprender la integración entre Laravel y React, así como el uso de XAMPP para la gestión de bases de datos en entornos locales.
