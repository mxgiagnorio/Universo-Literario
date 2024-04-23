let myFooter = `
<div class="footer">
    <div class="col-lg-4">
        <p class="mt-2">Acceso rápido</p>
        <ul>
        <li class="mt-2"><a href="categorias.html">Categorias</a></li>
        <li class="mt-2"><a href="bestsellers.html">Bestsellers</a></li>
        <li class="mt-2"><a href="novedades.html">Novedades</a></li>
        <li class="mt-2"><a href="contacto.html">Contacto</a></li>
        </ul>
    </div>
    <div class="col-lg-4">
        <p class="mt-2">Universo Literario</p>
        <ul>
        <li class="mt-2"><a href="#googlemaps">Av.Corrientes 345. Capital Federal.</a></li>
        <li class="mt-2"><a href="#gmail">universo.literario@gmail.com</a></li>
    </div>

    <!-- - - - - RRSS - - - - - -!-->

    <div class="col-lg-4">
        <p class="mt-2">Nuestras redes</p>
        <div class="icon d-flex flex-column">
            <a href="https://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook-f mt-2"></i></a>
            <a href="https://twitter.com/" target="_blank"><i class="fab fa-twitter mt-2"></i></a>
        </div>
    </div>
    <div class=copyright>
        <p>Copyright 2024 - Universo Literario. Todos los derechos reservados</p>
    </div>
</div>

`;
document.querySelector("footer").innerHTML = myFooter;