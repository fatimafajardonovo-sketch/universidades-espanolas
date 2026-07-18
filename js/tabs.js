
/*
ESTRUCTURA GENERAL DEL DOCUMENTO
Esta página recopila la impletación de filtrado por tabs en la páginas de Tipos de universidades 
y la de Guías. 
La funcionalidad es la siguiente; 
En la página de guías: Filtra las guías por categoría
Controla la pestaña activa y delega en el CSS el mostrado u ocultado de tarjetas mediante el atributo data-filtro.

En la página de tipos, filtra las universidades por tipo (tipos.html)
/* Misma lógica que el módulo anterior, reutilizando el patrón
/* de contenedor + data-filtro.
*/

/* FILTRADO EN LA PÁGINA DE GUÍAS */
(() => {
  /* CONSTANTES */
  const tabsContainer = document.querySelector('.guias__tabs');
  const cardsGrid = document.querySelector('.guias__grid');

  if (!tabsContainer || !cardsGrid) return;

  const tabs = tabsContainer.querySelectorAll('.guias__tab');

  const CATEGORIES = {
    Todas: 'todas',
    Orientación: 'orientacion',
    Comparativa: 'comparativa',
    Financiación: 'financiacion',
  };

  /* FUNCIONES */

  /* Comprueba si el tab recibido ya está activo */
  const isTabActive = (tab) => tab.classList.contains('guias__tab--activo');

  /* Quita el estado activo de todos los tabs */
  const resetTabsHandler = () => {
    tabs.forEach((tab) => tab.classList.remove('guias__tab--activo'));
  };

  /* Gestiona el clic sobre el contenedor de tabs (event delegation) */
  const tabClickHandler = ({ target }) => {
    const tab = target.closest('.guias__tab');
    if (!tab || isTabActive(tab)) return;

    resetTabsHandler();
    tab.classList.add('guias__tab--activo');

    const category = CATEGORIES[tab.textContent.trim()] ?? 'todas';
    cardsGrid.setAttribute('data-filtro', category);
  };

  /* ASIGNACIONES */
  tabsContainer.addEventListener('click', tabClickHandler);
})();


/* FILTRADO EN LA PÁGINA DE TIPOS */

(() => {
  /* CONSTANTES */
  const tabsContainer = document.querySelector('.university__tabs');
  const listContainer = document.querySelector('.university__list');

  if (!tabsContainer || !listContainer) return;

  const tabs = tabsContainer.querySelectorAll('.university__tab');
  const TYPES = ['total', 'publica', 'privada'];

  /* FUNCIONES */

  const isTabActive = (tab) => tab.classList.contains('university__tab--activo');

  const resetTabsHandler = () => {
    tabs.forEach((tab) => tab.classList.remove('university__tab--activo'));
  };

  const tabClickHandler = ({ target }) => {
    const tab = target.closest('.university__tab');
    if (!tab || isTabActive(tab)) return;

    resetTabsHandler();
    tab.classList.add('university__tab--activo');

    const index = [...tabs].indexOf(tab);
    listContainer.setAttribute('data-filtro', TYPES[index]);
  };

  /* ASIGNACIONES */
  tabsContainer.addEventListener('click', tabClickHandler);
})();