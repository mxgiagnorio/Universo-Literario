// Función para cargar libros desde la API por categoría
function cargarLibrosPorCategoria(categoria) {
    // URL base de la API de Google Books
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

// Función para agregar un libro al contenedor
function agregarLibro(libro, categoria) {
    let cardHtml = `
    <div class="producto col-12 col-md-6 col-lg-3">
    <div class="card mb-4">
        <img src="${libro.imageLinks.thumbnail}" class="card-img-top" alt="${libro.title}" />
        <div class="card-body">
            <h5 class="card-title">${libro.title}</h5>
            <p class="card-text typeM bold">$XX</p> <!-- Falta el precio, ya que no está disponible en la API -->
            <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#btncomprar">
                Agregar al carrito
            </button>
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



