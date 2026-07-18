/*
ESTRUCTURA GENERAL DEL DOCUMENTO

Este archivo JavaScript controla la interacción del mapa SVG de Comunidades Autónomas
presente en la Home y en la página pilar de "Por CCAA".

La funcionalidad principal es permitir que el usuario pueda acceder a la página
correspondiente de cada Comunidad Autónoma haciendo click sobre una zona del mapa.

Además, se añade soporte para navegación mediante teclado utilizando las teclas
Enter y Espacio, mejorando la accesibilidad del componente.

La estructura del archivo es la siguiente:

1. Constantes:
   - Objeto de correspondencias entre los identificadores del SVG y las rutas HTML.
   - Ruta base donde se encuentran las páginas individuales de cada comunidad.

2. Selección de elementos:
   - Selección de todos los elementos SVG interactivos del mapa.

3. Funciones:
   - Validación de rutas disponibles.
   - Gestión de navegación mediante click.
   - Gestión de navegación mediante teclado.
   - Configuración inicial de cada comunidad del mapa.

4. Asignaciones:
   - Aplicación de los eventos a cada comunidad del SVG.

*/

(function () {
 /* --- Constantes --- */

  /*
  rutaComunidades:
  Objeto que relaciona el id de cada elemento <path> del SVG con el nombre
  del archivo HTML correspondiente.

  Se utiliza esta tabla de equivalencias porque algunos identificadores del
  mapa no coinciden exactamente con el nombre de la página de destino.
  */
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

    /*
  comunidadesPath:
  Ruta relativa donde se almacenan las páginas individuales
  de cada Comunidad Autónoma.
  */
  const comunidadesPath = './por-ccaa/';

  /* --- Selección de elementos --- */
  const mapComunidades = document.querySelectorAll('.map__comunidad');

  /* --- Funciones --- */

   /*
  isRutaValida:
  Comprueba si el identificador recibido dispone de una ruta asociada
  dentro del objeto de correspondencias.
  */
  function isRutaValida(idComunidad) {
    return Object.prototype.hasOwnProperty.call(rutaComunidades, idComunidad);
  }


  /*
  comunidadNavigateHandler:
  Gestiona la navegación cuando el usuario interactúa con una Comunidad Autónoma.

  Si existe una ruta válida, redirige hacia la página HTML correspondiente.
  */
  function comunidadNavigateHandler(event) {
    const comunidad = event.currentTarget;
    const idComunidad = comunidad.id;

    if (!isRutaValida(idComunidad)) return;

    window.location.href =`${comunidadesPath}${rutaComunidades[idComunidad]}.html`;
  }

    /*
  comunidadKeydownHandler:
  Permite activar la navegación mediante teclado.

  Se utilizan las teclas Enter y Espacio para mantener el comportamiento
  equivalente al click y mejorar la accesibilidad del mapa SVG.
  */
  function comunidadKeydownHandler(event) {
    const isEnterKey = event.key === 'Enter';
    const isSpaceKey = event.key === ' ';

    if (!isEnterKey && !isSpaceKey) return;

    event.preventDefault();
    comunidadNavigateHandler(event);
  }
   /*
  comunidadSetupHandler:
  Configura cada Comunidad Autónoma del SVG.

  Añade:
  - tabindex para permitir navegación mediante teclado.
  - role link para indicar su comportamiento interactivo.
  - aria-label para lectores de pantalla.
  - title como ayuda visual.
  - Eventos click y teclado.
  */
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

  /* --- Asignaciones --- 
  Se aplica la configuración inicial a cada Comunidad Autónoma
  encontrada dentro del mapa SVG.
  */
  mapComunidades.forEach(comunidadSetupHandler);

})();