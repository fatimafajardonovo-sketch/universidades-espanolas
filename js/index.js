/* ==========================================================================
   JS - General
   Módulo encargado de gestionar el menú de navegación responsive (mobile).
   Controla la apertura/cierre del menú mediante una clase en el header
   y sincroniza los atributos de accesibilidad (aria-expanded).
   ========================================================================== */
(function () {

  /* ----------------------------
     Constantes
     Referencias a los elementos del DOM necesarios para el módulo.
  ---------------------------- */
  const headerElement = document.querySelector(".header");
  const headerToggleButton = document.querySelector(".header__button");
  const headerToggleIcon = document.querySelector(".header__toggle-icon");

  /* ----------------------------
     Variables
     Estado booleano que indica si el menú está abierto o cerrado.
  ---------------------------- */
  let isMenuOpen = false;

  /* ----------------------------
     Funciones
  ---------------------------- */

  /**
   * Abre el menú de navegación.
   * Añade la clase de estado al contenedor (header), no a los hijos,
   * y actualiza los atributos de accesibilidad correspondientes.
   */
  const openMenu = () => {
    isMenuOpen = true;
    headerElement.classList.add("header--open");
    headerToggleButton.setAttribute("aria-expanded", "true");
    headerToggleButton.setAttribute("aria-label", "Cerrar menú de navegación");
    headerToggleIcon.classList.remove("ri-menu-line");
    headerToggleIcon.classList.add("ri-close-line");
  };

  /**
   * Cierra el menú de navegación.
   * Elimina la clase de estado del contenedor (header)
   * y restaura los atributos de accesibilidad iniciales.
   */
  const closeMenu = () => {
    isMenuOpen = false;
    headerElement.classList.remove("header--open");
    headerToggleButton.setAttribute("aria-expanded", "false");
    headerToggleButton.setAttribute("aria-label", "Abrir menú de navegación");
    headerToggleIcon.classList.remove("ri-close-line");
    headerToggleIcon.classList.add("ri-menu-line");
  };

  /**
   * Alterna el estado del menú (abierto/cerrado) en función
   * del valor actual de isMenuOpen.
   */
  const toggleMenu = () => (isMenuOpen ? closeMenu() : openMenu());

  /**
   * Handler asociado al click del botón hamburguesa.
   * Delegamos la lógica en toggleMenu para mantener la función
   * del handler únicamente centrada en el evento.
   */
  const toggleButtonClickHandler = () => toggleMenu();

  /**
   * Handler que cierra el menú al pulsar la tecla Escape.
   * Solo actúa si el menú está abierto para evitar trabajo innecesario.
   */
  const keydownHandler = (event) => {
    const isEscapeKey = event.key === "Escape";
    if (isEscapeKey && isMenuOpen) {
      closeMenu();
    }
  };

  /**
   * Handler que cierra el menú automáticamente si el usuario
   * amplía la ventana hasta un tamaño de escritorio, evitando
   * que el menú quede abierto de forma incoherente al hacer resize.
   */
  const resizeHandler = () => {
    const isDesktopWidth = window.innerWidth > 1024;
    if (isDesktopWidth && isMenuOpen) {
      closeMenu();
    }
  };

  /* ----------------------------
     Asignaciones (Handlers)
  ---------------------------- */
  headerToggleButton.addEventListener("click", toggleButtonClickHandler);
  document.addEventListener("keydown", keydownHandler);
  window.addEventListener("resize", resizeHandler);

})();