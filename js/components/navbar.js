// components/navbar.js
import { navbarScrollEffect } from '../utils/ui.js';


class SiteNavbar extends HTMLElement {
  connectedCallback() {
    
    this.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top luxe">
      <div class="container">
        <a class="navbar-brand fw-bold" href="index.html">Rincón del Carmen</a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="nav" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="rooms.html">Habitaciones</a></li>
            <li class="nav-item"><a class="nav-link" href="booking.html">Reservar</a></li>
            <li class="nav-item"><a class="nav-link" href="history.html">Historia</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">Contacto</a></li>
            <li class="nav-item"><a class="nav-link" href="mis-reservas.html">Mis reservas</a></li>
            <li class="nav-item"><a class="nav-link" href="admin/dashboard.html">Admin</a></li>
          </ul>
          <div class="d-flex gap-2">
          <span class="navbar-text small text-white-50 me-2">Hola, </span>
                   <a class="btn btn-sm btn-outline-light" id="btnLogout">Salir</a>
              <a href="auth.html" class="btn btn-sm btn-light">Ingresar / Registrarse</a>
          </div>
        </div>
      </div>
    </nav>`;

    navbarScrollEffect();

    this.querySelector('#btnLogout')?.addEventListener('click', () => {
      logout();
      location.href = `index.html`;
    });
  }
}

customElements.define('site-navbar', SiteNavbar);