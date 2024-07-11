/* PRODUCTOS*/
const productos = [
    {
        id: "capsula-01",
        titulo: "Ristretto ",
        imagen: "./img/capsulas/01.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 13000
    },
    {
        id: "capsula-02",
        titulo: "Colombia  ",
        imagen: "./img/capsulas/02.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 16000
    },
    {
        id: "capsula-03",
        titulo: "Chiaro    ",
        imagen: "./img/capsulas/03.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 14500
    },
    {
        id: "capsula-04",
        titulo: "Shanghai  ",
        imagen: "./img/capsulas/04.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 15000
    },
    {
        id: "capsula-05",
        titulo: "Lungo     ",
        imagen: "./img/capsulas/05.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 14500
    },
    {
        id: "capsula-06",
        titulo: "Arpeggio   ",
        imagen: "./img/capsulas/06.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 14500
    },
    {
        id: "capsula-07",
        titulo: "Tokyo     ",
        imagen: "./img/capsulas/07.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 14500
    },
    {
        id: "capsula-08",
        titulo: "Vienna    ",
        imagen: "./img/capsulas/08.png",
        categoria: {
            nombre: "Cápsulas",
            id: "capsulas"
        },
        precio: 14500
    },
    {
        id: "maquina-01",
        titulo: "Citiz     ",
        imagen: "./img/maquinas/01.png",
        categoria: {
            nombre: "Máquinas",
            id: "maquinas"
        },
        precio: 368290
    },
    {
        id: "maquina-02",
        titulo: "Lattissima",
        imagen: "./img/maquinas/02.png",
        categoria: {
            nombre: "Máquinas",
            id: "maquinas"
        },
        precio: 755090
    },
    {
        id: "maquina-03",
        titulo: "Aeroccino ",
        imagen: "./img/maquinas/03.png",
        categoria: {
            nombre: "Máquinas",
            id: "maquinas"
        },
        precio: 159790
    },
    {
        id: "maquina-04",
        titulo: "Essenza   ",
        imagen: "./img/maquinas/04.png",
        categoria: {
            nombre: "Máquinas",
            id: "maquinas"
        },
        precio: 228390
    }
]

const cliente = [
]

/* VARIABLES */
let contenedorProductos = document.getElementById("contenedor-productos")
let itemsCarrito = document.getElementById("items-carrito")
let tituloPagina = document.getElementById("titulo-pagina")
let botonesCategorias = document.querySelectorAll(".boton-categoria")
let botonesAgregarAlCarrito = document.querySelectorAll(".producto-agregar")

/* RENDERIZAR PRODUCTOS */
function renderizarProductos(arrayProductos) {
    contenedorProductos.innerHTML = ""
    arrayProductos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar al carrito</button>
            </div>`
        contenedorProductos.appendChild(div);
    })
    actualizarBotonesAgregar()
}
renderizarProductos(productos)

/* MOSTRAR PRODUCTOS POR CATEGORIAS */
botonesCategorias.forEach(boton => {
    boton.onclick = (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")
        if (e.currentTarget.id != "todos") {
            let productosPorCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPagina.innerText = productosPorCategoria.categoria.nombre
            const categoriaElegida = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            renderizarProductos(categoriaElegida);
        } else {
            tituloPagina.innerText = "Todos los productos"
            renderizarProductos(productos)
        }
    }
});

/*CARRITO, AGREGAR AL CARRITO Y LOCAL STORAGE*/
let carrito;

let carritoLS = localStorage.getItem("productos-carrito")

if (carritoLS) {
    carrito = JSON.parse(carritoLS)
    actualizarItemsCarrito()
} else {
    carrito = []
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton)
    if(carrito.some(producto => producto.id === idBoton)) {
        const index = carrito.findIndex(producto => producto.id === idBoton)
        carrito[index].cantidad++
    } else {
        productoAgregado.cantidad = 1
        carrito.push(productoAgregado)
    }
    actualizarItemsCarrito();
    localStorage.setItem("productos-carrito", JSON.stringify(carrito))
}

function actualizarItemsCarrito() {
    let nuevoItemCarrito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    itemsCarrito.innerText = nuevoItemCarrito
}

/* ACTUALIZAR BOTONES AGREGAR AL CARRITO */
function actualizarBotonesAgregar() {
    botonesAgregarAlCarrito = document.querySelectorAll(".producto-agregar")
    botonesAgregarAlCarrito.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}