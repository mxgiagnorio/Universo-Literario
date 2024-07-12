$(document).ready(function () {
    let startIndex = 0; // Índice de inicio de la consulta
    let maxResults = 8; // Número máximo de resultados a mostrar por página

    function cargarLibros() {
        // Realiza una consulta a la API de libros con los parámetros startIndex, maxResults y orderBy
        $.ajax({
            url: 'https://www.googleapis.com/books/v1/volumes?q=subject:general&startIndex=' + startIndex + '&maxResults=' + maxResults + '&orderBy=newest',
            dataType: 'json',
            success: function (data) {
                $.each(data.items, function (i, item) {
                    let portada;
                    if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.extraLarge) {
                        portada = item.volumeInfo.imageLinks.extraLarge;
                    } else if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
                        portada = item.volumeInfo.imageLinks.thumbnail;
                    } else {
                        portada = './public/noDisponible.jpg';
                    }
                    let titulo = item.volumeInfo.title;
                    let precio = item.saleInfo.listPrice ? item.saleInfo.listPrice.amount : 'No disponible';
                    $('#libros-container').append(`
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="card">
                            <img src="${portada}" class="card-img-top img-fluid" alt="${titulo}">
                            <div class="card-body">
                                <h5 class="card-title">${titulo}</h5>
                                <p class="card-text">Precio: ${precio}</p>
                                <a href="#" class="btn btn-primary">Ver Detalles</a>
                             </div>
                        </div>
                     </div>
                     </div>
                    `);
                });
                startIndex += maxResults;
            }
        });
    }

    cargarLibros();

    // Manejar clics en el botón "Cargar más libros"
    $('#cargar-mas').click(function () {
        cargarLibros();
    });
});

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
<<<<<<< HEAD
=======


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
        window.location.href = "./pages/Forms/inicio.html";
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
    window.location.href = "./pages/Forms/inicio.html"; // Redirigir al inicio de sesión
}

document.addEventListener("DOMContentLoaded", () => {
    checkToken();
    updateUI();
});
>>>>>>> master
