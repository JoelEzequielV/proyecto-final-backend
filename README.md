# 🛒 Proyecto Final --- Backend Node.js + Express + Firebase Firestore

Este es el backend del Proyecto Final desarrollado con Node.js, Express,
Firebase Firestore y autenticación JWT.

Incluye:

-   CRUD completo de productos
-   Sistema de autenticación con JWT
-   Arquitectura MVC con separación clara por capas
-   Validaciones estrictas
-   Middleware global de errores
-   Script seed para crear un usuario administrador
-   Firestore como base de datos NoSQL

------------------------------------------------------------------------

## 🚀 Tecnologías utilizadas

-   Node.js
-   Express
-   Firebase Firestore
-   JWT (Json Web Tokens)
-   dotenv
-   Nodemon (modo desarrollo)
-   Postman para pruebas

------------------------------------------------------------------------

## 📦 Instalación

Clonar el repositorio:

    git clone <URL-del-repo>
    cd project-root

Instalar dependencias:

    npm install

------------------------------------------------------------------------

## 🔐 Configuración del entorno (.env)

Crear un archivo `.env` en la raíz:

    PORT=3000
    JWT_SECRET=tu_clave_secreta
    FIREBASE_SERVICE_ACCOUNT=./firebase/serviceAccountKey.json

------------------------------------------------------------------------

## 🔥 Seed --- Crear usuario administrador

Ejecutar:

    node scripts/seedUser.mjs

Esto genera un usuario:

    email: admin@empresa.com
    password: Admin123!

------------------------------------------------------------------------

## ▶️ Ejecución del servidor

Modo producción:

    npm start

Modo desarrollo:

    npm run dev

------------------------------------------------------------------------

## 🛣️ Endpoints

### 🔐 Autenticación

**POST /auth/login**

Body:

``` json
{
  "email": "admin@empresa.com",
  "password": "Admin123!"
}
```

------------------------------------------------------------------------

### 📦 Productos

#### GET `/api/products`

Obtiene todos los productos.

#### GET `/api/products/:id`

Obtiene un producto por ID.

#### POST `/api/products/create`

(Requiere token JWT)

Body:

``` json
{
  "title": "Producto",
  "description": "Descripción detallada",
  "price": 999,
  "image": ""
}
```

#### DELETE `/api/products/:id`

(Requiere token JWT)

------------------------------------------------------------------------

## ⚠️ Middleware de errores

El proyecto incluye:

-   Manejo de rutas no encontradas
-   Mensajes claros de error
-   Devoluciones con status HTTP correctos

------------------------------------------------------------------------

## ✔️ Validaciones implementadas

-   `title` obligatorio y con mínimo 3 caracteres
-   `price` debe ser número \> 0
-   `description` mínimo 10 caracteres
-   `image` debe ser string (opcional)

------------------------------------------------------------------------


