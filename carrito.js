document.addEventListener("DOMContentLoaded", () => {
    // Cargar los productos del carrito desde localStorage
    const carritoItemsStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const carritoTableBody = document.getElementById('carrito-items');
    const totalgeneral = document.getElementById('total');
    let total = 0;

    // Verificar si el carrito está vacío
    if (carritoItemsStorage.length === 0) {
        const mensajeVacio = document.createElement('p');
        mensajeVacio.textContent = "Tu carrito está vacío. Agrega productos para proceder.";
        document.getElementById('carrito-vacio').appendChild(mensajeVacio);
    } else {
        // Cargar productos en la tabla del carrito
        carritoItemsStorage.forEach(item => {
            const row = document.createElement('tr');

            // Nombre del producto
            const nombreCelda = document.createElement('td');
            nombreCelda.textContent = item.title;
            row.appendChild(nombreCelda);

            // Precio del producto
            const precioCelda = document.createElement('td');
            precioCelda.textContent = `$${item.price}`;
            row.appendChild(precioCelda);

            // Cantidad (hardcodeado a 1 para cada producto en el carrito)
            const cantidadCelda = document.createElement('td');
            cantidadCelda.textContent = 1;
            row.appendChild(cantidadCelda);

            // Subtotal (cantidad * precio)
            const subtotal = item.price * 1; // Siempre 1 en este caso, puedes expandirlo si permites cantidades
            const subtotalCelda = document.createElement('td');
            subtotalCelda.textContent = `$${subtotal}`;
            row.appendChild(subtotalCelda);

            // Agregar la fila a la tabla
            carritoTableBody.appendChild(row);

            // Sumar al total general
            total += subtotal;
        });

        // Mostrar el total
        totalgeneral.textContent = `$${total.toFixed(2)}`;
    }

    // Botón para limpiar el carrito y volver al inicio
    document.getElementById('limpiar-carrito').addEventListener('click', () => {
        localStorage.removeItem('cart');  // Eliminar el carrito del localStorage
        window.location.href = 'index.html';  // Redirigir al inicio
    });

    // Botón para finalizar la compra con SweetAlert
    document.getElementById('finalizar-compra').addEventListener('click', () => {
        Swal.fire({
            title: 'Compra Procesada',
            text: 'Se ha procesado la compra con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Limpiar el carrito después de finalizar la compra
        localStorage.removeItem('cart');  // Eliminar el carrito del localStorage

        // Redirigir al inicio después de 4 segundos
        setTimeout(() => {
            window.location.href = 'index.html';  // Volver a la página principal
        }, 4000);
    });
});
