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
                        <div class="card">
                            <img src="${portada}" class="card-img-top img-fluid" alt="${titulo}">
                            <div class="card-body">
                                <h5 class="card-title">${titulo}</h5>
                                <p class="card-text">Precio: ${precio}</p>
                                <a href="#" class="btn btn-primary">Ver Detalles</a>
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
