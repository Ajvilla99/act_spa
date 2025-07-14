import './api.js'; // Implementa la API en js/api.js
import { auth } from './auth.js'; // Implementa la autenticación en js/auth.js
import { router } from './router.js'; // Implementa el enrutador en js/router.js

// Al cargar por primera vez
document.addEventListener("DOMContentLoaded", () => {
  router();

  // Listener menú de usuario
  const showMenuBtn = document.getElementById("show-menu");
  const menuActions = document.getElementById("user-menu-actions");

  if (showMenuBtn && menuActions) {
    showMenuBtn.addEventListener("click", () => {
      menuActions.classList.toggle("hidden");
      console.log('click');
      
    });
  }

  // Listener logout
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      auth.logout();
      location.hash = "#/login";
    });
  }
});

// Inicializa el enrutador al cargar la página y al cambiar el hash
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);


