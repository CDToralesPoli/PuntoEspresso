let productosEnCarrito = localStorage.getItem("productos-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.getElementById("carrito-vacio")
const contenedorCarritoProductos = document.getElementById("productos")
const contenedorCarritoAcciones = document.getElementById("carrito-acciones")
const contenedorCarritoComprado = document.getElementById("carrito-comprado")
let botonesEliminar = document.querySelectorAll(".eliminar-producto")
const botonVaciar = document.getElementById("carrito-acciones-vaciar")
const contenedorTotal = document.getElementById("total")
const botonCheckout = document.getElementById("carrito-acciones-comprar")
const formularioCliente = document.getElementById("datos-cliente");
const contenedorDatosCliente = document.getElementById("contenedor-datos-cliente")
const botonFinalizar = document.getElementById("form-acciones-comprar")
const contenedorResumen = document.getElementById("resumen-compra")

/* RENDERIZAR PRODUCTOS DEL CARRITO */
function renderizarCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")
        contenedorDatosCliente.classList.add("disabled")
        botonCheckout.classList.remove("disabled")
    
        contenedorCarritoProductos.innerHTML = ""
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Articulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="eliminar-producto" id="${producto.id}"><p>Eliminar</p></button>
            `
    
            contenedorCarritoProductos.appendChild(div)
        })
    
    actualizarBotonesEliminar()
    actualizarTotal()
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
        contenedorDatosCliente.classList.add("disabled")
    }
}

renderizarCarrito()

/* BOTONES ELIMINAR PRODUCTOS Y VACIAR CARRITO */
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".eliminar-producto")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
    
    productosEnCarrito.splice(index, 1)
    renderizarCarrito()

    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito))

}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    productosEnCarrito.length = 0
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito))
    renderizarCarrito()   
}

/* TOTAL Y FINALIZAR COMPRA */

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}

botonCheckout.addEventListener("click", checkout)

function checkout() {
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorDatosCliente.classList.remove("disabled")
    botonCheckout.classList.add("disabled")
    botonFinalizar.classList.remove("disabled")
}

formularioCliente.addEventListener("submit", onFormSubmit);

botonFinalizar.addEventListener("click", comprarCarrito)

function comprarCarrito() {

    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorDatosCliente.classList.add("disabled")
    contenedorResumen.classList.remove("disabled")
}


function onFormSubmit(event) {
    event.preventDefault()

    let random = Math.random()
    random = Math.trunc(random)
    console.log(random)

    contenedorResumen.innerHTML = ""
    
    const datosFactura = document.createElement("div")
    datosFactura.classList.add("datos-empresa")
    datosFactura.innerHTML = `
        <h2>FACTURA ${Math.floor(Math.random() * (9999999999999 - 100000000000 + 1) ) + 100000000000}</h2>
        <h2><br>Punto Espresso </h2>
        <p>Av Francisco de Haro 5285. Posadas </p>
        <p>contacto@puntoespresso.com.ar </p>
        <h3><br>Datos del cliente</h3>
        <p>Nombre: ${formularioCliente.name.value} </p>
        <p>Dirección: ${formularioCliente.address.value} </p>
        <p>Teléfono: ${formularioCliente.telephone.value} </p>
        <p>Correo: ${formularioCliente.email.value} </p>
        <p><br> </p>
        `
    contenedorResumen.appendChild(datosFactura)

    const titulos = document.createElement("div")
            titulos.classList.add("resumen-productos")
            titulos.innerHTML = `
                <div class="carrito-producto-titulo">
                    <small>Articulo</small>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                </div>
            `
    contenedorResumen.appendChild(titulos)

    productosEnCarrito.forEach(producto => {
    const resumen = document.createElement("div")
            resumen.classList.add("resumen-productos")
            resumen.innerHTML = `
                <div class="carrito-producto-titulo">
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
            `
    contenedorResumen.appendChild(resumen)})

    const total = document.createElement("div")
            total.classList.add("resumen-total")
            total.innerHTML = `
                <h3><br>Total $${productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)}</h3>
            `
    contenedorResumen.appendChild(total)
    
    productosEnCarrito.length = 0
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito))

    contenedorCarritoComprado.classList.remove("disabled")
}