# Full Stack Open — Parte 4 (Backend Avanzado)

### _Estructura de la aplicación, pruebas de Node.js y administración de usuarios_

Este repositorio contiene los ejercicios correspondientes a la **Parte 4** del curso **Full Stack Open** dictado por la Universidad de Helsinki.
En esta sección se evoluciona el backend de la Parte 3 hacia una arquitectura profesional, implementando pruebas automáticas y un sistema completo de autenticación.

---

## Contenidos principales

### **1. Estructura de la aplicación**

- Separación de responsabilidades (Controladores, Modelos, Middlewares).
- Configuración de entornos de desarrollo y producción (`dotenv`).
- Uso de `express-async-errors` para eliminar los bloques try-catch.

### **2. Pruebas de Node.js (Testing)**

- Configuración de un entorno de pruebas con **Jest** o **Node:test**.
- Pruebas de integración para la API usando **supertest**.
- Uso de una base de datos de pruebas independiente para no ensuciar los datos reales.

### **3. Administración de usuarios**

- Creación de esquemas de usuario en MongoDB.
- Almacenamiento seguro de contraseñas con **bcrypt** (hashing).
- Validación de datos a nivel de servidor y base de datos.

### **4. Autenticación basada en Token**

- Implementación de **JSON Web Tokens (JWT)**.
- Creación de middleware para la extracción y validación de tokens.
- Restricción de acciones (ej: solo el creador puede eliminar su contenido).

### **5. Ejercicio principal: Blog List**

Incluye funcionalidades como:

- Listar, crear y eliminar blogs.
- Registro de usuarios y login.
- Funciones de utilidad (encontrar el blog con más likes, total de likes, etc.).
- Pruebas automáticas de toda la lógica del backend.

---

Cada archivo dentro de la carpeta `tests` valida una funcionalidad específica de la API y la lógica de negocio.

---

## 📁 Estructura del proyecto

```
.
├── bloglist-backend
│ ├── app.js # App Express configurada
│ ├── index.js # Punto de entrada (servidor)
│ ├── controllers # Rutas y lógica de negocio
│ │ ├── blogs.js
│ │ ├── users.js
│ │ └── login.js
│ ├── models # Modelos de Mongoose
│ │ ├── blog.js
│ │ └── user.js
│ ├── tests # Archivos de prueba
│ │ ├── blog_api.test.js
│ │ ├── list_helper.test.js
│ │ └── test_helper.js
│ ├── utils # Herramientas y middleware
│ │ ├── config.js
│ │ ├── logger.js
│ │ ├── middleware.js
│ │ └── list_helper.js
│ ├── package.json
│ └── .env # Variables de entorno (no incluido en git)
└── utils_tests.js # Scripts de apoyo para lógica de pruebas
```

## Cómo ejecutar los ejercicios

Clonar este repositorio:

```bash
   git clone <url-del-repo>
```

Entrar a la carpeta:

```bash
   cd part4/bloglist-backend
```

Instalar dependencias:

```bash
   npm install
```

Ejecutar las pruebas:

```bash
   npm test
```

Ejecutar la aplicación en modo desarrollo:

```bash
   npm run dev
```

> **Nota:** Es indispensable crear un archivo `.env` que contenga las variables `MONGODB_URI` y `TEST_MONGODB_URI` para que la aplicación y los tests puedan conectarse a la base de datos.

## Tecnologías utilizadas

Node.js

Express

MongoDB / Mongoose

Jest / Supertest

JWT (JSON Web Token)

Bcrypt
