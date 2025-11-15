# ⚡ API REST – LoopBack + MongoDB  
**Trabajo Práctico – Sistemas Distribuidos**

Este proyecto implementa una **API RESTful** desarrollada con **LoopBack ** (Node.js) y conectada a **MongoDB **, como parte de un trabajo práctico universitario.  
La API gestiona **Usuarios**, **Artículos** y **Carritos de compra**, simulando el backend de una aplicación de e-commerce básica.

---

## 📦 Tecnologías Utilizadas

- **Node.js **
- **LoopBack **
- **TypeScript**
- **MongoDB**
- **Loopback MongoDB **
- **OpenAPI / Swagger**
- **Visual Studio Code**

---
## 🚀 Funcionalidades Principales

### 👤 Usuarios
- Registrar usuarios  
- Login con verificación de contraseña  
- Obtener datos del usuario  
- Relación 1:N con carritos

### 📦 Artículos
- Crear artículos  
- Listar todos los artículos  
- Obtener un artículo por ID  
- Actualizar y eliminar

### 🛒 Carritos
- Crear carritos asociados a un usuario  
- Agregar artículos y cantidades  
- Calcular automáticamente el total  
- Listar carritos de un usuario

---

## 🗄️ Base de Datos – MongoDB Atlas

La API utiliza **MongoDB Atlas** como base de datos NoSQL en la nube.  
Para configurarla, seguir estos pasos:

### 1. Crear Cluster
- Ingresar a https://www.mongodb.com/cloud/atlas
- Crear un nuevo proyecto
- Crear un clúster (Shared Tier – Gratis)

### 2. Configurar Access
- Ir a *Network Access*
- Agregar IP: `0.0.0.0/0` (permite conexión desde cualquier lugar)
- Ir a *Database Access*
- Crear un usuario con contraseña segura

### 3. Obtener la URI de Conexión
En *Connect → Connect your application*, copiar la URI:

mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/<nombreDB>?retryWrites=true&w=majority

bash
Copiar código

### 4. Configurar en el Proyecto
Crear un archivo `.env`:

MONGO_URI="mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/miBase?retryWrites=true&w=majority"

markdown
Copiar código

### 5. Verificar Datos con MongoDB Compass
Puedes conectarte con la URI para inspeccionar:
- Colección `usuarios`
- Colección `articulos`
- Colección `carritos`

---

👥 Team Members  
- Santiago Alloud  
- Felipe Palazzi  
- Mauricio Nahuel Salto 

---
