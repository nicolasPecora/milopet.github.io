document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.querySelector(".productos-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const pageInfo = document.getElementById("page-info");

    let currentPage = 1;
    const limit = 6; // Mostrar 6 productos por página
    let totalProductos = 0;

    // Función para cargar productos desde el archivo local JSON
    function fetchProductos(page) {
        const skip = (page - 1) * limit;

        // Cargar productos desde el archivo local JSON
        fetch('productos_mascotas.json')
            .then(response => response.json())
            .then(data => {
                const productos = data.products;

                // Limpiar el contenedor de productos
                productosContainer.innerHTML = "";

                // Genera las cards de productos
                productos.forEach(product => {
                    const cardDiv = document.createElement("div");
                    cardDiv.className = "card";

                    cardDiv.innerHTML = `
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="precio">$${product.price}</p>
                            <button class="btn btn-primary agregar-carrito">Agregar al carrito</button>
                        </div>
                    `;

                    // Agregar evento al botón "Agregar"
                    const botonAgregar = cardDiv.querySelector(".agregar-carrito");
                    botonAgregar.addEventListener("click", () => {
                        agregarAlCarrito(product);
                    });

                    // Añadir la card al contenedor
                    productosContainer.appendChild(cardDiv);
                });

                // Actualiza la información de la página
                pageInfo.textContent = `Página ${currentPage}`;
                prevBtn.disabled = currentPage === 1;
                nextBtn.disabled = (currentPage * limit) >= productos.length;
            })
            .catch(error => console.error("Error fetching products:", error));
    }

    // Función para agregar un producto al carrito (localStorage)
    function agregarAlCarrito(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.title} ha sido agregado al carrito!`);
    }

    // Manejo de los botones de paginación
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchProductos(currentPage);
        }
    });

    nextBtn.addEventListener("click", () => {
        if ((currentPage * limit) < totalProductos) {
            currentPage++;
            fetchProductos(currentPage);
        }
    });

    // Carga inicial de productos
    fetchProductos(currentPage);
});
