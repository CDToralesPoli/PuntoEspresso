//PRODUCTOS
const productos = [
    {
        id: "capsula-01",
        titulo: "Ristretto Italiano",
        imagen: "./img/capsulas/01.jpg",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 13000
    },
    {
        id: "capsula-02",
        titulo: "Colombia",
        imagen: "./img/capsulas/02.jpg",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 16000
    },
    {
        id: "capsula-03",
        titulo: "Chiaro",
        imagen: "./img/capsulas/03.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 14500
    },
    {
        id: "capsula-04",
        titulo: "Vaniglia",
        imagen: "./img/capsulas/04.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 15000
    },
    {
        id: "capsula-05",
        titulo: "Buenos Aires Lungo",
        imagen: "./img/capsulas/05.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 14500
    },
    {
        id: "maquina-01",
        titulo: "Citiz",
        imagen: "./img/maquinas/01.png",
        categoria: {
            nombre: "Máquinas",
            id: "maquinas"
        },
        precio: 368290
    },
    {
        id: "maquina-02",
        titulo: "Gran Lattissima",
        imagen: "./img/maquinas/02.png",
        categoria: {
            nombre: "Máquinas",
            id: "maquinas"
        },
        precio: 755090
    },
    {
        id: "maquina-03",
        titulo: "Aeroccino",
        imagen: "./img/maquinas/03.png",
        categoria: {
            nombre: "Máquinas",
            id: "maquinas"
        },
        precio: 159790
    }
]

let contenedorProductos = document.getElementById("contenedor-productos")

//RENDERIZAR PRODUCTOS
function renderizarProductos(arrayProductos) {

    contenedorProductos.innerHTML = ""

    arrayProductos.forEach(producto => {
        const card = document.createElement("div")
        card.classList.add("producto")
        card.innerHTML = `  <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                            <div class="producto-detalles">
                            <h3 class="producto-titulo">${producto.titulo}</h3>
                            <p class="producto-precio">$${producto.precio}</p>
                            <button class="producto-agregar" id="${producto.id}">Agregar</button>
                            </div>`
        contenedorProductos.appendChild(card)
    })
    botonAgregarAlCarrito()
}

renderizarProductos(productos)

//AGREGAR AL CARRITO
//function botonAgregarAlCarrito() {
//    botonAgregar = document.querySelectorAll(".producto-agregar")
//    botonAgregar.forEach(boton => {
//        boton.addEventListener("click", agregarAlCarrito)
//    });
//}

let productosCarrito;
let productosCarritoLS = localStorage.getItem("productos-en-carrito")
//let botonAgregar = document.querySelectorAll(".producto-agregar");
let itemsCarrito = document.getElementById("items-carrito");

if (productosCarritoLS) {
    productosCarrito = JSON.parse(productosCarritoLS);
    actualizarItemsCarrito()
} else {
    productosCarrito = [];
}

function botonAgregarAlCarrito() {
    botonAgregar = document.querySelectorAll(".producto-agregar")
    botonAgregar.forEach(button => {
        button.onclick = (e) => {
            const idProducto = e.currentTarget.id
            const productoSeleccionado = productos.find(producto => producto.id == idProducto)
            if(productosCarrito.some(producto => producto.id === idProducto)) {
                const index = productosCarrito.findIndex(producto => producto.id === idProducto)
                productosCarrito[index].cantidad++
            } else {
                productoSeleccionado.cantidad = 1
                productosCarrito.push(productoSeleccionado)
            }
        
            actualizarItemsCarrito()
        
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito))
            
        }
    })
    
}

function actualizarItemsCarrito() {
    let nuevoItemCarrito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    itemsCarrito.innerText = nuevoItemCarrito;
}