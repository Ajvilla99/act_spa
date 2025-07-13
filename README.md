# SPA Gestión de Cursos - usuario123

## Instrucciones

1. Instala dependencias:
   ```
   npm install
   ```

2. Inicia la API:
   ```
   npm run start:api
   ```

3. Inicia el servidor local:
   ```
   npm start
   ```

4. Abre en navegador: `http://127.0.0.1:8080/login`

## Usuarios por defecto

- **Administrador:** admin@example.com / admin123

## Funcionalidades

- Registro e inicio de sesión con roles.
- CRUD de cursos para administradores.
- Inscripción a cursos para estudiantes.
- Persistencia de sesión con Local Storage.
- Rutas protegidas y redireccionamiento.

---

## Descripción del Proyecto

SPA Gestión de Cursos es una aplicación web desarrollada como Single Page Application (SPA) que permite la gestión de cursos académicos, orientada tanto a administradores como a estudiantes. El sistema permite la administración completa de cursos, así como la inscripción y visualización de los mismos por parte de los estudiantes.

## Estructura del Proyecto

- **src/**
  - **components/**: Componentes reutilizables de la interfaz (formularios, tablas, menús, etc).
  - **pages/**: Vistas principales (Login, Registro, Dashboard, Cursos, etc).
  - **services/**: Lógica para interactuar con la API (autenticación, cursos, usuarios).
  - **utils/**: Funciones auxiliares (validaciones, helpers).
  - **App.js / main.js**: Punto de entrada de la aplicación.
- **db.json**: Base de datos simulada para la API local (json-server).
- **public/**: Archivos estáticos y plantilla HTML principal.

## Tecnologías Utilizadas

- **Frontend:** JavaScript (ES6+), HTML5, CSS3, [Framework/Librería usada, ej: React, Vue, etc.]
- **Backend/API:** json-server (API REST simulada)
- **Gestión de estado:** Local Storage
- **Ruteo:** [React Router, Vue Router, etc. según corresponda]
- **Estilos:** [CSS Modules, Bootstrap, Tailwind, etc. según corresponda]
- **Herramientas:** npm, Node.js

## Principales Rutas de la Aplicación

- `/login`: Página de inicio de sesión.
- `/register`: Registro de nuevos usuarios.
- `/dashboard`: Panel principal según el rol.
- `/cursos`: Listado y gestión de cursos.
- `/inscripciones`: Inscripción y visualización de cursos inscritos (estudiantes).
- `/admin`: Panel de administración (solo administradores).

## Roles y Permisos

- **Administrador:** Acceso completo a la gestión de cursos y usuarios.
- **Estudiante:** Visualización e inscripción a cursos.

## Seguridad y Persistencia

- Autenticación basada en Local Storage.
- Rutas protegidas según el rol del usuario.
- Redireccionamiento automático si no hay sesión activa.

## Instalación y Ejecución

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Inicia la API local con `npm run start:api`.
4. Inicia la aplicación con `npm start`.
5. Accede a través de `http://127.0.0.1:8080/login`.

## Consideraciones Técnicas

- El proyecto utiliza una API REST simulada con json-server.
- La persistencia de sesión y datos se maneja en el navegador mediante Local Storage.
- El sistema está preparado para ser extendido con nuevas funcionalidades y roles.

## Capturas de Pantalla

_Agrega aquí imágenes de la interfaz si lo deseas._

## Autor

usuario123

---
