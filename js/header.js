let myHeader = `
<nav class="navbar navbar-expand-lg bg-secondary">
        <a class="navbar-brand" href="index.html"><img class="logo" src="resources/img/logo.png" alt="Universo Literario" width="50%"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse ml-5" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link " href="categorias.html">Categorías</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="novedades.html">Novedades</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="bestsellers.html">bestsellers</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contacto.html">Contacto</a>
            </li>
        </ul>
    </div>
    <div class="mx-auto"> <!-- Centrar contenido -->

    </div>
    <div class="ml-auto">
        <a class="btn btn-primary ml-2" href="#">Ingresar / Registrarse</a>
        <a class="btn btn-link" href="#"><i class="fas fa-shopping-cart"></i></a>
    </div>
  </nav >
`
document.querySelector("header").innerHTML = myHeader;