/*
ESTRUCTURA GENERAL DEL DOCUMENTO

Este archivo controla los filtros de universidades mediante tabs.
Su estructura se compone de:
- Definición de constantes.
- Definición de variables.
- Funciones.
- Asignaciones de eventos.
*/


/* INICIO: CONSTANTES */
const tabsContainer = document.querySelector('.university__tabs');
const universityContainer = document.querySelector('.university__list');
const hiddenClass = 'is-hidden';

/* FIN: CONSTANTES */

/* INICIO: VARIABLES */
let tabs = [];
let universityCards = [];

/* FIN: VARIABLES */

/* INICIO: FUNCIONES */

/*
 Controla el cambio de categoría de universidades.
 @param {Event} event Evento generado al pulsar un tab.
 */
function filterUniversitiesHandler(event) {

    const selectedTab = event.currentTarget;
    const selectedFilter = selectedTab.dataset.filter;

    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    selectedTab.classList.add('active');

    universityCards.forEach(card => {

        const category = card.dataset.category;

        const shouldShow = selectedFilter === 'all' || category === selectedFilter;

        card.classList.toggle(hiddenClass, !shouldShow);

    });

}

/* FIN: FUNCIONES */

/* INICIO: ASIGNACIONES */

if (tabsContainer && universityContainer) {

    tabs = tabsContainer.querySelectorAll('.university__tab');
    universityCards = universityContainer.querySelectorAll('.university__card');


    tabs.forEach(tab => {

        tab.addEventListener('click', filterUniversitiesHandler);

    });

}
/* FIN: ASIGNACIONES */

