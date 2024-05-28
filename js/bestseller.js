// Función para cargar libros desde la API por categoría
function cargarLibrosPorCategoria(categoria) {
    // URL base de la API de Google Books
    // PRUEBA GIT
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=subject:" + categoria;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            // Limpiar el contenedor de libros
            $("#" + categoria.toLowerCase() + "-container").empty();

            // Verificar si se encontraron resultados
            if (response.totalItems === 0) {
                $("#" + categoria.toLowerCase() + "-container").html("<p>No se encontraron libros en esta categoría.</p>");
                return;
            }

            // Iterar sobre los datos de la API y agregar cada libro al contenedor
            for (let i = 0; i < Math.min(4, response.items.length); i++) {
                agregarLibro(response.items[i].volumeInfo, categoria);
            }

            // Agregar botón "Ver más" si hay más de 4 libros
            if (response.items.length > 4) {
                $("#" + categoria.toLowerCase() + "-container").append(`<button class="btn btn-primary ver-mas-btn" data-categoria="${categoria}">Ver más</button>`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los libros:", error);
        }
    });
}

// Manejar clic en el botón "Ver más"
$(document).on("click", ".ver-mas-btn", function () {
    let categoria = $(this).data("categoria");
    cargarMasLibros(categoria);
});

// Función para cargar más libros de una categoría
function cargarMasLibros(categoria) {
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=subject:" + categoria;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            // Obtener el número de tarjetas ya cargadas
            let numTarjetasCargadas = $("#" + categoria.toLowerCase() + "-container").children(".producto").length;

            // Eliminar el botón "Ver más" antes de agregar más libros
            $(".ver-mas-btn[data-categoria='" + categoria + "']").remove();

            // Iterar sobre los siguientes 4 datos de la API y agregar cada libro al contenedor
            for (let i = numTarjetasCargadas; i < Math.min(numTarjetasCargadas + 4, response.items.length); i++) {
                agregarLibro(response.items[i].volumeInfo, categoria);
            }

            // Si no quedan más libros por cargar, ocultar el botón "Ver más"
            if (numTarjetasCargadas + 4 >= response.items.length) {
                $(".ver-mas-btn[data-categoria='" + categoria + "']").hide();
            } else {
                // Si quedan más libros, agregar el botón "Ver más" al final
                $("#" + categoria.toLowerCase() + "-container").append(`<button class="btn btn-primary ver-mas-btn" data-categoria="${categoria}">Ver más</button>`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar más libros:", error);
        }
    });
}

// Función para cargar libros desde la API por título
function cargarLibrosPorTitulo(titulo) {
    // Verificar si el título está definido
    if (!titulo) {
        console.error("El título no está definido.");
        return;
    }

    // URL base de la API de Google Books
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + titulo;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            // Limpiar el contenedor de libros
            $("#reseñas-container").empty();

            // Verificar si se encontraron resultados
            if (response.totalItems === 0) {
                $("#reseñas-container").html("<p>No se encontraron libros con ese título.</p>");
                return;
            }

            // Iterar sobre los datos de la API y agregar cada libro al contenedor
            for (let i = 0; i < Math.min(4, response.items.length); i++) {
                agregarLibro(response.items[i].volumeInfo, "reseñas"); // Pasar "reseñas" como la categoría
            }

            // Agregar botón "Ver más" si hay más de 4 libros
            if (response.items.length > 4) {
                $("#reseñas-container").append(`<button class="btn btn-primary ver-mas-btn" data-titulo="${titulo}" onclick="cargarMasLibrosPorTitulo('${titulo}')">Ver más</button>`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los libros:", error);
        }
    });
}

// Función para cargar más libros basados en el título de búsqueda
function cargarMasLibrosPorTitulo(titulo) {
    // URL base de la API de Google Books para buscar por título
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + titulo;

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
            // Obtener el número de libros ya cargados
            let numLibrosCargados = $("#reseñas-container").children(".producto").length;

            // Eliminar el botón "Ver más" antes de agregar más libros
            $(".ver-mas-btn[data-titulo='" + titulo + "']").remove();

            // Iterar sobre los siguientes 4 datos de la API y agregar cada libro al contenedor
            for (let i = numLibrosCargados; i < Math.min(numLibrosCargados + 4, response.items.length); i++) {
                agregarLibro(response.items[i].volumeInfo, "reseñas");
            }

            // Si no quedan más libros por cargar, ocultar el botón "Ver más"
            if (numLibrosCargados + 4 >= response.items.length) {
                $(".ver-mas-btn[data-titulo='" + titulo + "']").hide();
            } else {
                // Si quedan más libros, agregar el botón "Ver más" al final y centrarlo
                let buttonHtml = `<button class="btn btn-primary d-flex justify-content-center ver-mas-btn" data-titulo="${titulo}" onclick="cargarMasLibrosPorTitulo('${titulo}')">Ver más</button>`;
                $("#reseñas-container").append(buttonHtml);
            }

        },
        error: function (xhr, status, error) {
            console.error("Error al cargar más libros por título:", error);
        }
    });
}



function agregarLibro(libro, categoria) {
    // Verificar si thumbnailUrl está definido y no está vacío
    let thumbnailUrl = libro.imageLinks && libro.imageLinks.thumbnail ? libro.imageLinks.thumbnail : '';

    // Si thumbnailUrl está vacío, asignar la ruta de tu imagen local
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


// Cuando el documento esté listo, cargar libros para todas las categorías
$(document).ready(function () {
    cargarLibrosPorCategoria("suspense");
    cargarLibrosPorCategoria("fear");
    cargarLibrosPorCategoria("history");
    cargarLibrosPorCategoria("anime");
});

// Manejar el evento de cambio en el campo de entrada de título
$("#input-titulo").on("input", function () {
    let titulo = $(this).val().trim();
    if (titulo !== "") {
        cargarLibrosPorTitulo(titulo);
    } else {
        // Si el campo de entrada está vacío, limpiar el contenedor de libros
        $("#reseñas-container").empty();
    }
});
