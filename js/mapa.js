
/*
ESTRUCTURA GENERAL DEL DOCUMENTO
Esta página recopila la impletación del mapa clicable por Comunidad Autónoma, que se encuentra en la home y en la página pilar de Por CCAA.
La funcionalidad es la siguiente; al hacer click (o Enter/Espacio con teclado) sobre una 
comunidad del mapa SVG, estaredirige a la página de esa comunidad. Se usa una tabla de 
correspondencias porque el id de cada <path> no siempre coincide con el nombre del archivo HTML de destino.
*/

(function () {

  /* --- Constantes --- */

  // rutaComunidades: mapa id del SVG -> slug del archivo HTML correspondiente
  const rutaComunidades = {
    'andalucia': 'andalucia',
    'aragon': 'aragon',
    'asturias': 'asturias',
    'baleares': 'baleares',
    'canarias': 'canarias',
    'cantabria': 'cantabria',
    'castilla-la-mancha': 'castilla-la-mancha',
    'castilla-y-leon': 'castilla-y-leon',
    'cataluna': 'cataluna',
    'comunidad-valenciana': 'valencia',
    'extremadura': 'extremadura',
    'galicia': 'galicia',
    'la-rioja': 'la-rioja',
    'murcia': 'murcia',
    'navarra': 'navarra',
    'pais-vasco': 'pais-vasco',
    'ceuta-melilla': 'ceuta-y-melilla',
    'madrid': 'madrid'
  };

  // comunidadesPath: carpeta relativa donde viven las páginas de cada comunidad
  const comunidadesPath = './por-ccaa/';

  /* --- Selección de elementos --- */
  const mapComunidades = document.querySelectorAll('.map__comunidad');

  /* --- Funciones --- */

  // isRutaValida: comprueba que el id tiene una ruta asociada en el mapeo
  function isRutaValida(idComunidad) {
    return Object.prototype.hasOwnProperty.call(rutaComunidades, idComunidad);
  }

  // comunidadNavigateHandler: navega a la página de la comunidad 
  function comunidadNavigateHandler(event) {
    const comunidad = event.currentTarget;
    const idComunidad = comunidad.id;

    if (!isRutaValida(idComunidad)) return;

    window.location.href =`${comunidadesPath}${rutaComunidades[idComunidad]}.html`;
  }

  // comunidadKeydownHandler: permite activar la navegación con teclado
  function comunidadKeydownHandler(event) {
    const isEnterKey = event.key === 'Enter';
    const isSpaceKey = event.key === ' ';

    if (!isEnterKey && !isSpaceKey) return;

    event.preventDefault();
    comunidadNavigateHandler(event);
  }
  function comunidadSetupHandler(comunidad) {
    if (!isRutaValida(comunidad.id)) return;

    const nombreComunidad = rutaComunidades[comunidad.id].replace(/-/g, ' ');

    comunidad.setAttribute('tabindex', '0');
    comunidad.setAttribute('role', 'link');
    comunidad.setAttribute('aria-label', 'Ver universidades de ' + nombreComunidad);
    comunidad.setAttribute('title', 'Universidades de ' + nombreComunidad);
    comunidad.addEventListener('click', comunidadNavigateHandler);
    comunidad.addEventListener('keydown', comunidadKeydownHandler);
  }

  /* --- Asignaciones --- */
  mapComunidades.forEach(comunidadSetupHandler);

})();