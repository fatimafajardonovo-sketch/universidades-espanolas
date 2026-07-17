/* Comunidades autoomas: selecciona las ccaa del mapa */

const mapComunidades = document.querySelectorAll('.map__comunidad');

/* =====================================================================
   2. MAPA - Navegación por comunidad autónoma
   Al pulsar sobre una comunidad del mapa, redirige a su página
   correspondiente usando el id del elemento como slug de la URL.
   ===================================================================== */


// isComunidadClickHandler: redirige a la página de la comunidad pulsada
function comunidadClickHandler(comunidad) {
    window.location.href = '/por-ccaa/' + comunidad.id + '.html';
}

mapComunidades.forEach((comunidad) => {
    comunidad.addEventListener('click', () => comunidadClickHandler(comunidad));
});

