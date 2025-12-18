// URL de la API
let url = "https://fakestoreapi.com/products";

// Variables globales
let productos = [];
let carrito = [];

// Elementos del DOM
let listaProductos = document.getElementById("listaProductos");
let itemsCarrito = document.getElementById("itemsCarrito");
let totalCarrito = document.getElementById("totalCarrito");
let contadorCarrito = document.getElementById("contadorCarrito");
let filtroCategoria = document.getElementById("filtroCategoria");
let ordenar = document.getElementById("ordenar");
let buscador = document.getElementById("buscador");

// Cargar carrito desde localStorage
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  actualizarCarrito();
}

// CONSUMO DE API
async function obtenerProductos() {
  try {
    let respuesta = await fetch(url);
    productos = await respuesta.json();
    mostrarProductos(productos);
    cargarCategorias(productos);
  } catch (error) {
    console.log("Error al cargar productos", error);
  }
}

// MOSTRAR PRODUCTOS
function mostrarProductos(lista) {
  listaProductos.innerHTML = "";

  lista.forEach(producto => {
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${producto.image}">
      <h3>${producto.title}</h3>
      <p>$ ${producto.price}</p>
      <button onclick="agregarAlCarrito(${producto.id})">
        Agregar al carrito
      </button>
    `;

    listaProductos.appendChild(card);
  });
}

// CATEGORIAS
function cargarCategorias(lista) {
  let categorias = lista.map(p => p.category);
  let categoriasUnicas = ["all", ...new Set(categorias)];

  categoriasUnicas.forEach(cat => {
    let option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filtroCategoria.appendChild(option);
  });
}

// AGREGAR AL CARRITO
function agregarAlCarrito(id) {
  let producto = productos.find(p => p.id === id);
  carrito.push(producto);
  guardarCarrito();
  actualizarCarrito();
}

// MOSTRAR CARRITO
function actualizarCarrito() {
  itemsCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((prod, index) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <p>${prod.title} - $${prod.price}</p>
      <button onclick="eliminarProducto(${index})"></button>
    `;
    itemsCarrito.appendChild(div);
    total += prod.price;
  });

  totalCarrito.textContent = total.toFixed(2);
  contadorCarrito.textContent = carrito.length;
}

// ELIMINAR PRODUCTO
function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

// GUARDAR EN LOCALSTORAGE
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// FILTROS
filtroCategoria.addEventListener("change", () => {
  let valor = filtroCategoria.value;

  if (valor === "all") {
    mostrarProductos(productos);
  } else {
    let filtrados = productos.filter(p => p.category === valor);
    mostrarProductos(filtrados);
  }
});

// ORDENAR
ordenar.addEventListener("change", () => {
  let valor = ordenar.value;
  let copia = [...productos];

  if (valor === "precioAsc") {
    copia.sort((a, b) => a.price - b.price);
  }

  if (valor === "precioDesc") {
    copia.sort((a, b) => b.price - a.price);
  }

  if (valor === "nombre") {
    copia.sort((a, b) => a.title.localeCompare(b.title));
  }

  mostrarProductos(copia);
});

// BUSCADOR
buscador.addEventListener("input", () => {
  let texto = buscador.value.toLowerCase();

  let resultado = productos.filter(p =>
    p.title.toLowerCase().includes(texto)
  );

  mostrarProductos(resultado);
});

buscador.addEventListener("input", () => {
    let texto 
})

