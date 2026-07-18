
/* ESTRUCTURA GENERAL DEL DOCUMENTO
  Este archivo JavaScript controla la funcionalidad de filtrado mediante tabs en las páginas de Guías y Tipos de universidades.

  La estructura general es la siguiente:

  1. Filtrado de guías:
    - Controla el cambio de pestaña activa.
    - Actualiza el atributo data-filtro del contenedor de tarjetas.
    - El CSS utiliza este atributo para mostrar u ocultar las tarjetas
      correspondientes según la categoría seleccionada.

  2. Filtrado de universidades:
    - Controla el cambio de pestaña activa.
    - Actualiza el atributo data-filtro del listado de universidades.
    - El CSS aplica el filtrado según el tipo seleccionado:
          - Total.
          - Universidades públicas.
          - Universidades privadas.

  Ambos módulos utilizan el mismo patrón de funcionamiento: contenedor de tabs + evento click delegado + atributo data-filtro
  para separar la lógica JavaScript de la presentación visual gestionada por CSS.
*/

/* INICIO: FILTRADO EN LA PÁGINA DE GUÍAS

  Este módulo gestiona el filtrado de las tarjetas de guías según la categoría seleccionada por el usuario.

  El estado activo de cada pestaña se controla mediante la clase: .guias__tab--activo

  El filtrado de contenido se delega al CSS mediante el atributo: data-filtro

*/
(() => {
    /* CONSTANTES

    Se seleccionan los elementos principales del DOM:
    - Contenedor de pestañas.
    - Contenedor donde se encuentran las tarjetas de guías.

    Si alguno de estos elementos no existe, la ejecución del módulo finaliza
    para evitar errores en páginas donde esta funcionalidad no está presente.

  */
  const tabsContainer = document.querySelector('.guias__tabs');
  const guiasGrid = document.querySelector('.guias__grid');

  if (!tabsContainer || !guiasGrid) return;

  const tabs = tabsContainer.querySelectorAll('.guias__tab');

  const categorias = {
    Todas: 'todas',
    Orientación: 'orientacion',
    Comparativa: 'comparativa',
    Financiación: 'financiacion',
  };

  /* FUNCIONES */

    /* Comprueba si una pestaña ya tiene aplicado el estado activo.
    Devuelve true cuando la pestaña contiene la clase encargada de indicar visualmente la selección actual.
    */
  const isTabActive = (tab) => tab.classList.contains('guias__tab--activo');

  /* Quita el estado activo de todos los tabs */
  const resetTabsHandler = () => {
    tabs.forEach((tab) => tab.classList.remove('guias__tab--activo'));
  };

  /* Gestiona la interacción al hacer click sobre una pestaña.
    Flujo:
    1. Obtiene la pestaña pulsada.
    2. Comprueba si existe y si ya está activa.
    3. Actualiza la clase activa.
    4. Modifica el atributo data-filtro para que CSS aplique el filtrado.
  */
  const tabClickHandler = ({ target }) => {
    const tab = target.closest('.guias__tab');
    if (!tab || isTabActive(tab)) return;

    resetTabsHandler();
    tab.classList.add('guias__tab--activo');

    const category = categorias[tab.textContent.trim()] ?? 'todas';
    guiasGrid.setAttribute('data-filtro', category);
  };

  /* ASIGNACIONES */
  tabsContainer.addEventListener('click', tabClickHandler);
})();

/* FIN: FILTRADO EN LA PÁGINA DE GUÍAS */

/*
INICIO: FILTRADO EN LA PÁGINA DE TIPOS DE UNIVERSIDADES

Este módulo controla el filtrado de universidades mediante pestañas.

El funcionamiento es similar al módulo anterior:
- Se controla la pestaña activa mediante clases CSS.
- Se actualiza el atributo data-filtro del contenedor.
- CSS decide qué tarjetas permanecen visibles.

Los filtros disponibles son:
- Total.
- Pública.
- Privada.

*/


(() => {
    /* CONSTANTES
    Se seleccionan los elementos necesarios del DOM:
    - Contenedor de pestañas.
    - Listado de universidades que será filtrado.

  */
  const tabsContainer = document.querySelector('.university__tabs');
  const listContainer = document.querySelector('.university__list');

  if (!tabsContainer || !listContainer) return;
  
  /* Lista de pestañas disponibles */
  const tabs = tabsContainer.querySelectorAll('.university__tab');
  const TYPES = ['total', 'publica', 'privada'];

  /* FUNCIONES */

  /*
  Comprueba si una pestaña se encuentra actualmente seleccionada.
  */

  const isTabActive = (tab) => tab.classList.contains('university__tab--activo');

  /*
  Restablece todas las pestañas eliminando el estado activo.

  Permite aplicar posteriormente el estado únicamente a la pestaña seleccionada.
  */
  const resetTabsHandler = () => {
    tabs.forEach((tab) => tab.classList.remove('university__tab--activo'));
  };
/*
  Gestiona el cambio de filtro al pulsar una pestaña.

  Flujo:
  1. Identifica la pestaña seleccionada.
  2. Actualiza la clase activa.
  3. Obtiene la posición del tab dentro del listado.
  4. Actualiza data-filtro con el tipo correspondiente.

  El filtrado visual de tarjetas se realiza mediante CSS.
  */
  const tabClickHandler = ({ target }) => {
    const tab = target.closest('.university__tab');
    if (!tab || isTabActive(tab)) return;

    resetTabsHandler();
    tab.classList.add('university__tab--activo');

    const index = [...tabs].indexOf(tab);
    listContainer.setAttribute('data-filtro', TYPES[index]);
  };

  /* ASIGNACIONES 
    Se añade el evento click al contenedor de tabs
*/
  tabsContainer.addEventListener('click', tabClickHandler);
})();