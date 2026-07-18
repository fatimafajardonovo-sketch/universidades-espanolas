/*
ESTRUCTURA GENERAL DEL DOCUMENTO

Este archivo JavaScript controla el comportamiento del menú de navegación responsive
del sitio web.

La funcionalidad principal es la gestión del menú hamburguesa en dispositivos móviles:

1. Selección de elementos del DOM:
   - Header principal.
   - Botón de apertura/cierre del menú.
   - Icono del botón hamburguesa.

2. Estado del menú:
   - Variable booleana que controla si el menú se encuentra abierto o cerrado.

3. Funciones principales:
   - Apertura del menú:
        - Añade la clase de estado al contenedor principal (.header).
        - Actualiza los atributos ARIA para accesibilidad.
        - Cambia el icono de menú por el icono de cierre.

   - Cierre del menú:
        - Elimina la clase de estado del contenedor principal.
        - Restaura los atributos ARIA iniciales.
        - Devuelve el icono al estado inicial.

   - Alternancia del menú:
        - Decide si abrir o cerrar el menú según su estado actual.

4. Eventos asociados:
   - Click en el botón hamburguesa.
   - Pulsación de la tecla Escape.
   - Cambio de tamaño de ventana.

La lógica se aplica sobre el contenedor principal (.header) siguiendo la metodología
BEM utilizada en el proyecto, evitando añadir clases individuales a los elementos hijos.
*/


(function () {

  /* Constantes*/
  const elementoHeader = document.querySelector(".header");
  const headerToggleButton = document.querySelector(".header__button");
  const headerToggleIcon = document.querySelector(".header__toggle-icon");

  /*  Estado booleano que indica si el menú está abierto o cerrado. */
  let menuAbierto = false;

  /* Funciones */

  /**
     Abre el menú de navegación.

     Añade la clase de estado al contenedor principal (.header),
     permitiendo que CSS controle la visualización del menú.

     También actualiza:
     - Estado aria-expanded del botón.
     - Texto descriptivo aria-label.
     - Iconografía del botón.
   */
  const openMenu = () => {
    menuAbierto = true;
    elementoHeader.classList.add("header--open");
    headerToggleButton.setAttribute("aria-expanded", "true");
    headerToggleButton.setAttribute("aria-label", "Cerrar menú de navegación");
    headerToggleIcon.classList.remove("ri-menu-line");
    headerToggleIcon.classList.add("ri-close-line");
  };

  /*Cierra el menú de navegación.*/
  const closeMenu = () => {
    menuAbierto = false;
    elementoHeader.classList.remove("header--open");
    headerToggleButton.setAttribute("aria-expanded", "false");
    headerToggleButton.setAttribute("aria-label", "Abrir menú de navegación");
    headerToggleIcon.classList.remove("ri-close-line");
    headerToggleIcon.classList.add("ri-menu-line");
  };

  /* Alterna el estado del menú. */
  const toggleMenu = () => (menuAbierto ? closeMenu() : openMenu());

  /*
     Mantiene la función del evento separada de la lógica principal,
     siguiendo la estructura de handlers utilizada en el proyecto.
   */
  const toggleButtonClickHandler = () => toggleMenu();

  const keydownHandler = (event) => {
    const isEscapeKey = event.key === "Escape";
    if (isEscapeKey && menuAbierto) {
      closeMenu();
    }
  };

  /*
     Handler asociado al cambio de tamaño de pantalla.
   */
  const resizeHandler = () => {
    const isDesktopWidth = window.innerWidth > 1024;
    if (isDesktopWidth && menuAbierto) {
      closeMenu();
    }
  };

  /* 
     Asignaciones (Handlers)
   */
  headerToggleButton.addEventListener("click", toggleButtonClickHandler);
  document.addEventListener("keydown", keydownHandler);
  window.addEventListener("resize", resizeHandler);

})();