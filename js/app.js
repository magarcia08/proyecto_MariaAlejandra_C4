// URL API
let url = "https://fakestoreapi.com/products";

// Variables globales
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Obtener productos
async function obtenerProductos() {
  try {
    let respuesta = await fetch(url);
    productos = await respuesta.json();
    cargarCategorias();
    mostrarProductos(productos);
  } catch (error) {
    console.log("Error al cargar productos");
  }
}

// Mostrar productos
function mostrarProductos(lista) {
  let contenedor = document.getElementById("lista-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach(producto => {
    contenedor.innerHTML += `
      <div class="card">
        <img src="${producto.image}">
        <h4>${producto.title}</h4>
        <p>$${producto.price}</p>
        <button onclick="agregarCarrito(${producto.id})">Agregar</button>
      </div>
    `;
  });
}

// Cargar categorías
function cargarCategorias() {
  let select = document.getElementById("categoria");
  if (!select) return;

  let categorias = productos.map(p => p.category);
  let categoriasUnicas = [...new Set(categorias)];

  categoriasUnicas.forEach(cat => {
    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

// Agregar al carrito
function agregarCarrito(id) {
  let producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado");
}

// Mostrar carrito
function mostrarCarrito() {
  let contenedor = document.getElementById("carrito-lista");
  let totalTexto = document.getElementById("total");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach((p, index) => {
    total += p.price;
    contenedor.innerHTML += `
      <p>
        ${p.title} - $${p.price}
        <button onclick="eliminarProducto(${index})">X</button>
      </p>
    `;
  });

  totalTexto.innerText = "Total: $" + total.toFixed(2);
}

// Eliminar producto
function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
}

// Eventos filtros
let buscar = document.getElementById("buscar");
if (buscar) {
  buscar.addEventListener("input", () => {
    let texto = buscar.value.toLowerCase();
    let filtrados = productos.filter(p =>
      p.title.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
  });
}

let categoria = document.getElementById("categoria");
if (categoria) {
  categoria.addEventListener("change", () => {
    if (categoria.value === "all") {
      mostrarProductos(productos);
    } else {
      let filtrados = productos.filter(p => p.category === categoria.value);
      mostrarProductos(filtrados);
    }
  });
}

let ordenar = document.getElementById("ordenar");
if (ordenar) {
  ordenar.addEventListener("change", () => {
    let copia = [...productos];
    if (ordenar.value === "precio-asc") {
      copia.sort((a, b) => a.price - b.price);
    }
    if (ordenar.value === "precio-desc") {
      copia.sort((a, b) => b.price - a.price);
    }
    mostrarProductos(copia);
  });
}

// Inicializar
obtenerProductos();
mostrarCarrito();
