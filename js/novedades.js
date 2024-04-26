// Función para cargar las reseñas de los libros más nuevos al cargar la página
$(document).ready(function () {
    cargarReseñasDeLibrosNuevos();
});

function mostrarReseñaDeLibro(libro) {
    let reseñaHtml = `
    <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12 mt-5">
        <img class="custom-img img-fluid" src="${libro.imageLinks.thumbnail}" alt="" />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 mt-5">
        <h3 class="">${libro.title}</h3>
        <p class="mt-4">
            ${libro.description ? libro.description : "No hay descripción disponible para este libro."}
        </p>
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
