// Función para cargar las reseñas de los libros más nuevos al cargar la página
$(document).ready(function () {
    cargarReseñasDeLibrosNuevos();
});

function mostrarReseñaDeLibro(libro) {
    let reseñaHtml = `
    <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12 mt-5">
        <div class="d-flex justify-content-center align-items-center">
            <img class="custom-img img-fluid" src="${libro.imageLinks.thumbnail}" alt="" />
        </div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 mt-5">
        <div class="d-flex justify-content-center align-items-center">
            <h3 class="">${libro.title}</h3>
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <p class="mt-4">
                ${libro.description ? libro.description : "No hay descripción disponible para este libro."}
            </p>
        </div>
    </div>
</div>

    `;

    // Agregar la reseña al contenedor
    $("#reseñas-container").append(reseñaHtml);
}

// Función para cargar las reseñas de los libros más nuevos
function cargarReseñasDeLibrosNuevos() {
    // URL base de la API de Google Books para obtener los libros más nuevos
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=newest&maxResults=4";

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            // Verificar si se encontraron resultados
            if (response.totalItems === 0) {
                console.log("No se encontraron libros nuevos.");
                return;
            }

            // Iterar sobre los libros de la respuesta y mostrar sus reseñas
            for (let i = 0; i < 2; i++) {
                if (i >= response.items.length) break;
                let libro = response.items[i].volumeInfo;
                mostrarReseñaDeLibro(libro);
            }

            // Si hay más de dos libros, agregar botón "Ver más"
            if (response.items.length > 2) {
                $("#reseñas-container").append(`<button id="ver-mas-libros" class="btn btn-primary mt-3">Ver más</button>`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los libros más nuevos:", error);
        }
    });
}

// Función para buscar reseñas de libros por título
function buscarReseñasPorTitulo(titulo) {
    // Verificar si el título de búsqueda está vacío
    if (titulo.trim() === "") {
        console.log("El título de búsqueda está vacío.");
        return;
    }

    // URL base de la API de Google Books para buscar libros por título
    let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(titulo)}&maxResults=10`;
    console.log("URL de la API:", apiUrl); // Agregar esta línea para depurar la URL

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            console.log("Respuesta de la API:", response);
            // Limpiar el contenedor de reseñas
            $("#reseñas-container").empty();

            // Mostrar las reseñas de los libros encontrados
            if (response.items && response.items.length > 0) {
                for (let i = 0; i < response.items.length; i++) {
                    let libro = response.items[i].volumeInfo;
                    mostrarReseñaDeLibro(libro);
                }
            } else {
                $("#reseñas-container").html("<p>No se encontraron resultados para esta búsqueda.</p>");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al buscar reseñas de libros:", error);
        }
    });
}


// Manejar el evento keyup para la entrada de texto
$("#input-titulo").on("keyup", function () {
    let titulo = $(this).val();
    if (titulo.trim() !== "") {
        buscarReseñasPorTitulo(titulo);
    } else {
        cargarReseñasDeLibrosNuevos();
    }
});

// Función para cargar los siguientes dos libros al hacer clic en "Ver más"
$(document).on("click", "#ver-mas-libros", function () {
    cargarSiguientesDosLibros();
});

function cargarSiguientesDosLibros() {
    // URL base de la API de Google Books para obtener los libros más nuevos
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=newest&maxResults=4&startIndex=2";

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            // Verificar si se encontraron resultados
            if (response.totalItems === 0) {
                console.log("No se encontraron libros nuevos.");
                return;
            }

            // Iterar sobre los libros de la respuesta y mostrar sus reseñas
            for (let i = 0; i < 2; i++) { // Solo mostramos dos libros adicionales
                let libroIndex = i;
                if (libroIndex >= response.items.length) break;
                let libro = response.items[libroIndex].volumeInfo;
                mostrarReseñaDeLibro(libro);
            }

            // Si no hay más libros después de estos dos, ocultar el botón "Ver más"
            if (response.items.length <= 4) {
                $("#ver-mas-libros").hide();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los siguientes libros:", error);
        }
    });
}



// -----------------------------
// Manejar clic en el botón "Ver más"
$(document).on("click", ".ver-mas-btn", function () {
    let titulo = $(this).data("titulo");
    cargarMasLibrosPorTitulo(titulo);
});

// Función para cargar libros desde la API por título
function cargarLibrosPorTitulo(titulo) {
    if (!titulo) {
        console.error("El título no está definido.");
        return;
    }

    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + titulo;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            $("#libro-container").empty();

            if (response.totalItems === 0) {
                $("#libro-container").html("<p>No se encontraron libros con ese título.</p>");
                return;
            }

            for (let i = 0; i < Math.min(3, response.items.length); i++) {
                agregarLibro(response.items[i].volumeInfo);
            }

            if (response.items.length > 3) {
                $("#libro-container").append(`<button class="btn btn-primary ver-mas-btn" data-titulo="${titulo}">Ver más</button>`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los libros:", error);
        }
    });
}

// Función para cargar más libros basados en el título de búsqueda
function cargarMasLibrosPorTitulo(titulo) {
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + titulo;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            let numLibrosCargados = $("#libro-container").children(".producto").length;

            $(".ver-mas-btn[data-titulo='" + titulo + "']").remove();

            for (let i = numLibrosCargados; i < Math.min(numLibrosCargados + 3, response.items.length); i++) {
                agregarLibro(response.items[i].volumeInfo);
            }

            if (numLibrosCargados + 3 >= response.items.length) {
                $(".ver-mas-btn[data-titulo='" + titulo + "']").hide();
            } else {
                let buttonHtml = `<button class="btn btn-primary d-flex justify-content-center ver-mas-btn" data-titulo="${titulo}">Ver más</button>`;
                $("#libro-container").append(buttonHtml);
            }

        },
        error: function (xhr, status, error) {
            console.error("Error al cargar más libros por título:", error);
        }
    });
}

function agregarLibro(libro) {
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
    $("#libro-container").append(cardHtml);
}

// Manejar el evento de cambio en el campo de entrada de título
$("#input-busqueda").on("input", function () {
    let titulo = $(this).val().trim();
    if (titulo !== "") {
        cargarLibrosPorTitulo(titulo);
    } else {
        $("#libro-container").empty();
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
