

class SiteNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>FakeStore</h1>
        <nav>
          <a href="index.html">Inicio</a>
          <a href="catalogo.html">Catálogo</a>
          <a href="nosotros.html">Nosotros</a>
          <a href="carrito.html">Carrito</a>
          <a href="contacto.html">Contacto</a>
        </nav>
      </header>
    `;
  }
}

customElements.define('site-navbar', SiteNavbar);
