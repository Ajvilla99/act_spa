// === PLANTILLA SPA CURSOS ===
// Instrucciones: Implementa aquí las funciones de renderizado de vistas.
// Usa el DOM para mostrar formularios, listas y mensajes según la ruta activa.
// Puedes usar fetch o el módulo api.js para obtener datos.
// Usa el módulo auth.js para autenticación.

import { api } from "./api.js"; // Implementa y exporta funciones de API en api.js
import { auth } from "./auth.js"; // Implementa y exporta funciones de autenticación en auth.js
// import { router } from "./router.js"; // Importa el enrutador para redirigir después de acciones

// Muestra un mensaje de página no encontrada
export function renderNotFound() {
  
  document.getElementById("app").innerHTML = "<h2>Página no encontrada</h2>";
}

// Implementa la vista de login
export async function showLogin() {
  
  document.getElementById("app").innerHTML = `
    <div class="login-container">
      <div class="login-container_box">
        <div class="login_logo">
          [LOGO AQUI]
        </div>
        <form id="form" class="login-form">
          <h2 style="text-align:center; margin-bottom:1em;">Iniciar Sesion</h2>
          <input type="email" id="e" placeholder="Coreo electrónico" required>
          <input type="password" id="p" placeholder="Contraseña" required>
          <button class="btn_primary">Iniciar sesion</button>
          <br>
          <a href="#/register" data-link>¿No tienes cuenta? Regístrate</a>
        </form>
      </div>
    </div>`;
  document.getElementById("form").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(e.target.e.value, e.target.p.value);
      location.hash = "#/dashboard";
    } catch (err) {
      alert(err.message);
    }
  };
}

// Implementa la vista de registro
export async function showRegister() {
  
  document.getElementById("app").innerHTML = `
    <div class="register_container">
      <form id="f" class="register-form card">
        <h2 style="text-align:center; margin-bottom:1em;">Crear cuenta</h2>
        <input placeholder="Nombre" id="n" class="input_register">
        <input placeholder="Correo electronico" id="e" class="input_register">
        <input placeholder="Contraseña" id="p" class="input_register">
        <button class="btn_primary">Registrar</button>
      </form>
      
      <span>
        ¿Ya tienes una cuenta?
        <a href="#/login">
          Iniciar sesion
        </a>
      </span>
    </div>`;
  document.getElementById("f").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.register(e.target.n.value, e.target.e.value, e.target.p.value);
      await auth.login(e.target.e.value, e.target.p.value);
      location.hash = "#/dashboard";
    } catch (err) {
      alert(err.message);
    }
  };
}

// Implementa la vista principal del dashboard
export async function showDashboard() {
  
  const u = auth.getUser();
  const courses = await api.get("/courses");
  console.log(courses);
  document.getElementById("app").innerHTML = `
    <section class="dashboard">
      <div class="dashboard_header">
        <div class="dashboard_header_profile">
          ${u.name.charAt(0).toUpperCase()}
        </div>
        <div class="dashboard_header_info">
          <h2>Hola de nuevo, ${u.name || "Usuario"}</h2>
          <a href="">Mi perfil</a>
        </div>
        
      </div>

      <div class="box_data">

        <div class="dashboard_card">
          <p>Cursos</p>
          <h2>
            10
          </h2>
          <div class="dashboard_card_link">
            <a href="#/dashboard/courses">ver mas</a>
          </div>
        </div>

        <div class="dashboard_card">
          <p>Estudiantes</p>
          <h2>
            10
          </h2>
          <div class="dashboard_card_link">
            <a href="">ver mas</a>
          </div>
        </div>

        <div class="dashboard_card">
          <p>Instructores</p>
          <h2>
            10
          </h2>
          <div class="dashboard_card_link">
            <a href="">ver mas</a>
          </div>
        </div>
      </div>


      <div class="dashboard_category">

        <div class="category_content">
          <div class="category_box_header">
            <h2>Cursos</h2>
            <a href="#/dashboard/courses">ver mas</a>
          </div>

          <div class="category_box_grid">
            ${
              courses.map((c) => `
                <div class="cat_grid_item">
                  <div class="item_image">
                    [IMAGEN CURSO]
                  </div>
                  <div class="item_data">
                    <h3>${c.title}</h3>
                    <p class="item_data_instructor">Instructor: ${c.instructor || 'Por asignar'}</p>
                    <p class="item_data_level">Nivel: ${c.level}</p>
                  </div>
                  ${
                    ( u.role === 'student' ) ? `
                      <button class="btn_action" id="">                      
                        Incribirse
                      </button>
                    `
                    : ''
                  }
                </div>
            `).join('')}
          </div>
        </div>
      </div>

    </section>
  `;
  document.querySelectorAll("[data-link]").forEach((a) => {
    a.onclick = (e) => {
      e.preventDefault();
      location.hash = a.getAttribute("href");
    };
  });
}

// Implementa la vista de listado de cursos
export async function showCourses() {
  const user = auth.getUser();
  const courses = await api.get("/courses");

  document.getElementById("app").innerHTML = `
    <h2>Cursos disponibles</h2>
    <ul>${courses
      .map(
        (c) => `
      <li>${c.title || "Sin título"} (${c.capacity || 0} slots) — Instructor: ${
          c.instructor || "N/A"
        }
        ${
          user.role === "admin"
            ? `<button onclick="editCourse(${c.id})">Editar</button>`
            : ""
        }
        ${
          user.role === "student"
            ? `<button class="enroll-btn" data-id="${c.id}">Inscribirse</button>`
            : ""
        }
      </li>`
      )
      .join("")}</ul>`;

  if (user.role === "student") {
    document.querySelectorAll(".enroll-btn").forEach((btn) => {
      btn.onclick = async () => {
        const courseId = btn.dataset.id;

        // Obtener curso actual
        const course = await api.get("/courses/" + courseId);

        // Simular lista de inscritos (opcional)
        if (!course.enrolled) course.enrolled = [];

        // Evitar doble inscripción
        if (course.enrolled.includes(user.email)) {
          alert("Ya estás inscrito en este curso.");
          return;
        }

        let capacity = course.capacity - 1;

        // Verificar capacidad
        if (course.enrolled.length >= course.capacity) {
          alert("Este curso ya está lleno.");
          return;
        }

        course.enrolled.push(user.email);
        course.capacity = capacity;

        await api.put("/courses/" + courseId, course);
        alert("Inscripción exitosa!");
        showCourses(); // recargar lista
      };
    });
  }
}

// Implementa la vista para crear un curso (solo admin)
export function showCreateCourse() {
  
  document.getElementById("app").innerHTML = `
    <h2>Crear Curso</h2>
    <form id="f">
      <input placeholder="Título" id="title">
      <input placeholder="Instructor" id="instructor">
      <input type="number" placeholder="Capacidad" id="capacity">
      <button>Guardar</button>
    </form>`;
  document.getElementById("f").onsubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      instructor: e.target.instructor.value,
      capacity: parseInt(e.target.capacity.value),
    };
    await api.post("/courses", data);
    location.hash = "#/dashboard/courses";
    // router();
  };
}

// Implementa la vista para editar un curso (solo admin)
export async function showEditCourse() {
  const user = auth.getUser();
  if (user.role !== "admin") {
    renderNotFound();
    return;
  }

  
  const courseId = location.hash.split("/").pop();
  const course = await api.get("/courses/" + courseId);

  if (!course) {
    renderNotFound();
    return;
  }

  document.getElementById("app").innerHTML = `
    <h2>Editar Curso</h2>
    <form id="f">
      <input id="title" placeholder="Título" value="${course.title}">
      <input id="instructor" placeholder="Instructor" value="${course.instructor}">
      <input type="number" id="capacity" placeholder="Capacidad" value="${course.capacity}">
      <button>Guardar</button>
    </form>`;

  document.getElementById("f").onsubmit = async (e) => {
    e.preventDefault();
    const updated = {
      title: e.target.title.value,
      instructor: e.target.instructor.value,
      capacity: parseInt(e.target.capacity.value),
    };
    await api.put("/courses/" + courseId, updated);
    location.hash = "#/dashboard/courses";
    // router();
  };
}