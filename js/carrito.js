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
const formularioCliente = document.getElementById("datos-cliente")
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
                <div class="carrito-producto-imagen-contenedor">
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                </div>
                <div class="carrito-producto-titulo">
                    <small>Articulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                        <div class="selector-cantidad">
                    <button id="${producto.id}" class="restar-cantidad botones-selector-cantidad">-</button>
                    <p class="carrito-item-cantidad">${producto.cantidad}</p>
                    <button id="${producto.id}" class="sumar-cantidad botones-selector-cantidad">+</button>
                       </div> 
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
    actualizarBotonesAgregar()
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

/* ACTUALIZAR BOTONES AGREGAR AL CARRITO */
function actualizarBotonesAgregar() {

    let botonesSumarCantidad = document.querySelectorAll('.sumar-cantidad')
    botonesSumarCantidad.forEach(boton => {
        boton.addEventListener("click", sumarCantidad)
    })

    let botonesRestarCantidad = document.querySelectorAll('.restar-cantidad')
    botonesRestarCantidad.forEach(boton => {
        boton.addEventListener('click',restarCantidad)
    })
}

/* FUNCION SUMAR CANTIDAD DE UN ITEM*/
function sumarCantidad(e) {
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
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)  
    productosEnCarrito[index].cantidad ++

    renderizarCarrito()
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito))
}

/* FUNCION RESTAR CANTIDAD DE UN ITEM */
function restarCantidad(e) {
    Toastify({
        text: "Producto eliminado",
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

      const idBoton = e.currentTarget.id;
      console.log(idBoton)
      const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
      if (productosEnCarrito[index].cantidad > 1) {
          console.log(index)
          productosEnCarrito[index].cantidad -- 
      } else {
        console.log(index)
        productosEnCarrito.splice(index, 1)
      }

    renderizarCarrito()
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito))
}

/* FUNCION ELIMINAR ITEM DEL CARRITO */
function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
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
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
    
    productosEnCarrito.splice(index, 1)
    renderizarCarrito()

    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito))
}

/* BOTON VACIAR CARRITO */
botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0
            localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito))
            renderizarCarrito()   
        }
    })
}

/* TOTAL Y FINALIZAR COMPRA */
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}

/* BOTON IR AL CHECKOUT */
botonCheckout.addEventListener("click", checkout)

function checkout() {
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorDatosCliente.classList.remove("disabled")
    botonCheckout.classList.add("disabled")
    botonFinalizar.classList.remove("disabled")
    botonVaciar.classList.add("disabled")
}

/* BOTON FINALIZAR COMPRA */
formularioCliente.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault()

    Swal.fire({
        title: '¿Deseas confirmar la compra?',
        icon: 'question',
        html: `Seleccionaste ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} producto/s por un total de $${productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)}.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {

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
                <p>${formularioCliente.name.value} </p>
                <p>${formularioCliente.address.value} </p>
                <p>${formularioCliente.telephone.value} </p>
                <p>${formularioCliente.email.value} </p>
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

            comprarCarrito()

            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            renderizarCarrito();
        }
    })
}

/* FUNCION COMPRAR CARRITO */
function comprarCarrito() {

    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorDatosCliente.classList.add("disabled")
    contenedorResumen.classList.remove("disabled")
}