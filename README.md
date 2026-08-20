# 💊 Sistema de Gestión Farmacéutica

Este es un sistema web integral diseñado para optimizar el control de inventario, ventas y proveedores de la empresa. El proyecto está construido bajo el patrón de arquitectura **MVC (Modelo-Vista-Controlador)** para garantizar la escalabilidad y el orden del código.

---

## 🚀 Tecnologías Utilizadas

El sistema utiliza la combinación del entorno Node y React para una experiencia rápida y reactiva:

* **Frontend:** React.js, HTML5, CSS3 / Tailwind.
* **Backend:** Node.js, Express.js.
* **Base de Datos:** MariaDB.
* **Contenedores:** Docker.

---

## 📂 Arquitectura del Proyecto (MVC)

El proyecto separa la lógica de negocio de la interfaz de usuario mediante la siguiente estructura:

* **Modelos:** Gestión de datos y consultas directas a MariaDB.
* **Vistas:** Interfaz interactiva construida en React para el usuario final.
* **Controladores:** Lógica intermedia que procesa las peticiones de la vista y responde con los datos del modelo.

---

## 🛠️ Requisitos Previos

Antes de clonar e instalar el proyecto, asegúrate de tener instalado en tu equipo:

* **Node.js** (Versión 18 o superior recomendada)
* **MariaDB** / **MySQL**
* **Docker** (Opcional, para despliegue en contenedores)

---

## 💻 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio y acceder
```bash
git clone <URL_DE_TU_REPOSITORIO>
cd nombre-del-proyecto
```

### 2. Configurar el Servidor (Backend)
1. Navega a la carpeta del servidor: `cd backend` (o el nombre de tu carpeta).
2. Instala las dependencias: `npm install`.
3. Configura las variables de entorno: Crea un archivo `.env` y añade tus credenciales de MariaDB:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_base_datos
   ```
4. Inicia el servidor: `npm start` o `npm run dev`.

### 3. Configurar el Cliente (Frontend)
1. Abre una nueva terminal y navega a la interfaz: `cd frontend`.
2. Instala las dependencias: `npm install`.
3. Inicia la aplicación de React: `npm start` (o `npm run dev` si usas Vite).

---

## 👥 Colaboradores

* **[Tu Nombre / Usuario de Git]** - Desarrollador Principal / Líder de Proyecto
* **[Nombre de tu Socio / Usuario de Git]** - Desarrollador Frontend / Backend

---

## 🔒 Flujo de Trabajo (Git)

Para mantener el orden del código, trabajamos bajo las siguientes reglas:
1. **No hacer commits directos a `main`.**
2. Todo el desarrollo se integra y prueba en la rama `dev`.
3. Para una funcionalidad nueva, crear una rama dedicada: `git checkout -b feature/nombre-funcion`.
