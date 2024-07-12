// Función para cargar libros desde la API por categoría
function cargarLibrosPorCategoria(categoria) {
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=subject:" + categoria;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            $("#" + categoria.toLowerCase() + "-container").empty();

            if (response.totalItems === 0) {
                $("#" + categoria.toLowerCase() + "-container").html("<p>No se encontraron libros en esta categoría.</p>");
                return;
            }

            for (let i = 0; i < Math.min(4, response.items.length); i++) {
                agregarLibroPorCategoria(response.items[i].volumeInfo, categoria);
            }

            if (response.items.length > 4) {
                $("#" + categoria.toLowerCase() + "-container").append(`<button class="btn btn-primary ver-mas-btn" data-categoria="${categoria}">Ver más</button>`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los libros:", error);
        }
    });
}

// Manejar clic en el botón "Ver más" para categorías
$(document).on("click", ".ver-mas-btn", function () {
    let categoria = $(this).data("categoria");
    cargarMasLibros(categoria);
});


// Manejar clic en el botón "Ver más" para la búsqueda de libros
$(document).on("click", ".ver-mas-btn-busqueda", function () {
    let titulo = $(this).data("titulo");
    cargarMasLibrosPorTituloBusqueda(titulo);
});

// Función para cargar más libros de una categoría
function cargarMasLibros(categoria) {
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=subject:" + categoria;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            let numTarjetasCargadas = $("#" + categoria.toLowerCase() + "-container").children(".producto").length;

            $(".ver-mas-btn[data-categoria='" + categoria + "']").remove();

            for (let i = numTarjetasCargadas; i < Math.min(numTarjetasCargadas + 4, response.items.length); i++) {
                agregarLibroPorCategoria(response.items[i].volumeInfo, categoria);
            }

            if (numTarjetasCargadas + 4 >= response.items.length) {
                $(".ver-mas-btn[data-categoria='" + categoria + "']").hide();
            } else {
                $("#" + categoria.toLowerCase() + "-container").append(`<button class="btn btn-primary ver-mas-btn" data-categoria="${categoria}">Ver más</button>`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar más libros:", error);
        }
    });
}


// Función para cargar libros desde la API por título en la sección de libros
function cargarLibrosPorTituloBusqueda(titulo) {
    if (!titulo) {
        console.error("El título no está definido.");
        return;
    }

    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + titulo;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            $("#libro-busqueda-container").empty();

            if (response.totalItems === 0) {
                $("#libro-busqueda-container").html("<p>No se encontraron libros con ese título.</p>");
                return;
            }

            for (let i = 0; i < Math.min(3, response.items.length); i++) {
                agregarLibroPorBusqueda(response.items[i].volumeInfo);
            }

            if (response.items.length > 3) {
                $("#libro-busqueda-container").append(`<button class="btn btn-primary ver-mas-btn-busqueda" data-titulo="${titulo}">Ver más</button>`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los libros:", error);
        }
    });
}

// Función para cargar más libros por título en la sección de libros
function cargarMasLibrosPorTituloBusqueda(titulo) {
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + titulo;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            let numLibrosCargados = $("#libro-busqueda-container").children(".producto").length;
            $(".ver-mas-btn-busqueda[data-titulo='" + titulo + "']").remove();

            for (let i = numLibrosCargados; i < Math.min(numLibrosCargados + 3, response.items.length); i++) {
                agregarLibroPorBusqueda(response.items[i].volumeInfo);
            }

            if (numLibrosCargados + 3 < response.items.length) {
                $("#libro-busqueda-container").append(`<button class="btn btn-primary text-center ver-mas-btn-busqueda" data-titulo="${titulo}">Ver más</button>`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar más libros por título:", error);
        }
    });
}


// Función para agregar libros por categoría
function agregarLibroPorCategoria(libro, categoria) {
    let thumbnailUrl = libro.imageLinks && libro.imageLinks.thumbnail ? libro.imageLinks.thumbnail : '';

    if (!thumbnailUrl) {
        thumbnailUrl = "../public/noDisponible.jpg";
    }

    let cardHtml = `
    <div class="producto col-12 col-md-6 col-lg-3">
        <div class="d-flex justify-content-center align-items-center">
            <div class="card mb-4">
                <img src="${thumbnailUrl}" class="card-img-top" alt="${libro.title}" />
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text typeM bold">$XX</p> <!-- Falta el precio, ya que no está disponible en la API -->
                    <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#btncomprar">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    $("#" + categoria.toLowerCase() + "-container").append(cardHtml);
}

// Función para agregar libros por búsqueda
function agregarLibroPorBusqueda(libro) {
    let thumbnailUrl = libro.imageLinks && libro.imageLinks.thumbnail ? libro.imageLinks.thumbnail : '';

    if (!thumbnailUrl) {
        thumbnailUrl = "../public/noDisponible.jpg";
    }

    let cardHtml = `
    <div class="producto col-12 col-md-6 col-lg-4">
        <div class="d-flex justify-content-center align-items-center">
            <div class="card mb-4">
                <img src="${thumbnailUrl}" class="card-img-top" alt="${libro.title}" />
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text typeM bold">$XX</p>
                    <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#btncomprar">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    $("#libro-busqueda-container").append(cardHtml);
}


// Cuando el documento esté listo, cargar libros para todas las categorías
$(document).ready(function () {
    cargarLibrosPorCategoria("suspense");
    cargarLibrosPorCategoria("fear");
    cargarLibrosPorCategoria("history");
    cargarLibrosPorCategoria("anime");
});

// Manejar el evento de cambio en el campo de entrada de título en la sección de reseñas
$("#input-titulo").on("input", function () {
    let titulo = $(this).val().trim();
    if (titulo !== "") {
        cargarLibrosPorTituloReseñas(titulo);
    } else {
        $("#reseñas-container").empty();
    }
});

// Manejar el evento de cambio en el campo de entrada de título en la sección de búsqueda de libros
$("#input-busqueda").on("input", function () {
    let titulo = $(this).val().trim();
    if (titulo !== "") {
        cargarLibrosPorTituloBusqueda(titulo);
    } else {
        $("#libro-busqueda-container").empty();
    }
});



function isTokenPresent() {
    const token = localStorage.getItem("authToken");
    return token !== null;
}

function isTokenExpired(token) {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = payload.exp * 1000;
    return Date.now() > expirationDate;
}

function checkToken() {
    const token = localStorage.getItem("authToken");
    if (!token || isTokenExpired(token)) {
        localStorage.removeItem("authToken");
        window.location.href = "../pages/Forms/inicio.html";
    }
}

function updateUI() {
    const userButtons = document.getElementById("userButtons");

    if (!isTokenPresent()) {
        userButtons.style.display = "block"; // Mostrar el botón si el token está presente
    } else {
        userButtons.style.display = "none"; // Ocultar el botón si no está presente
    }
}

function logout() {
    localStorage.removeItem("authToken"); // Eliminar el token
    window.location.href = "../pages/Forms/inicio.html"; // Redirigir al inicio de sesión
}

document.addEventListener("DOMContentLoaded", () => {
    checkToken();
    updateUI();
});
