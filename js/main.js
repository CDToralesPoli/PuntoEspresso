/* PRODUCTOS*/
let productos = [
]

let cliente = [
]

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data
        renderizarProductos(productos)
    })


const contenedorProductos = document.getElementById("contenedor-productos")
const itemsCarrito = document.getElementById("items-carrito")
const tituloPagina = document.getElementById("titulo-pagina")
const botonesCategorias = document.querySelectorAll(".boton-categoria")
const cantidadItem = document.querySelectorAll('.carrito-item-cantidad')

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
                <div class="selector-cantidad">
                    <button id="restar-cantidad" class="restar-cantidad botones-selector-cantidad">-</button>
                    <input type="text" value="1" class="carrito-item-cantidad" id=cantidad-${producto.id}>
                    <button id="sumar-cantidad" class="sumar-cantidad botones-selector-cantidad">+</button>
                    <p class="producto-precio">$${producto.precio}</p>
                </div>
                <button class="producto-agregar" id="${producto.id}">Agregar al carrito</button>
            </div>`
        contenedorProductos.appendChild(div)
    })
    
    actualizarBotonesAgregar()
}

/* ACTUALIZAR BOTONES AGREGAR AL CARRITO */
function actualizarBotonesAgregar() {

    let botonesSumarCantidad = document.querySelectorAll('.sumar-cantidad');
    botonesSumarCantidad.forEach(boton => {
        boton.addEventListener("click", sumarCantidad)
    })

    let botonesRestarCantidad = document.querySelectorAll('.restar-cantidad');
    botonesRestarCantidad.forEach(boton => {
        boton.addEventListener('click',restarCantidad)
    })

    let botonesAgregarAlCarrito = document.querySelectorAll(".producto-agregar")
    botonesAgregarAlCarrito.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

/* MOSTRAR PRODUCTOS SEGUN CATEGORIAS */
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
})

/* CARRITO */
let carrito = [
]

/* ACTUALIZAR ITEMS ICONO CARRITO */
function actualizarItemsCarrito() {
    let nuevoItemCarrito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    itemsCarrito.innerText = nuevoItemCarrito
}

/* AGREGAR AL CARRITO */
function agregarAlCarrito(e) {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id
    console.log(idBoton)
    const cantidad = document.getElementById('cantidad-' + idBoton)
    const valor = parseInt(cantidad.value)
    const productoAgregado = productos.find(producto => producto.id === idBoton)
    if(carrito.some(producto => producto.id === idBoton)) {
        const index = carrito.findIndex(producto => producto.id === idBoton)
        carrito[index].cantidad = carrito[index].cantidad + valor
    } else {
        productoAgregado.cantidad = valor
        carrito.push(productoAgregado)
    }
    actualizarItemsCarrito();
    localStorage.setItem("productos-carrito", JSON.stringify(carrito))
}

/* LOCAL STORAGE */
let carritoLS = localStorage.getItem("productos-carrito")

if (carritoLS) {
    carrito = JSON.parse(carritoLS)
    actualizarItemsCarrito()
} else {
    carrito = [
    ]
}

/* SUMAR CANTIDAD DE UN ITEM */
function sumarCantidad(event){
    let buttonClicked = event.currentTarget
    let selector = buttonClicked.parentElement
    if (selector.getElementsByClassName('carrito-item-cantidad')[0].value<=99){
    selector.getElementsByClassName('carrito-item-cantidad')[0].value ++
    }
}

/* RESTAR CANTIDAD DE UN ITEM */
function restarCantidad(event){
    let buttonClicked = event.currentTarget
    let selector = buttonClicked.parentElement
    if((selector.getElementsByClassName('carrito-item-cantidad')[0].value)>1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value --
        console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value)
    }
}