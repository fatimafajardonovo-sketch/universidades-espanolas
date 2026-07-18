
/*  ESTRUCTURA GENERAL DEL DOCUMENTO

Este archivo JavaScript controla las funcionalidades interactivas relacionadascon el buscador de Comunidades Autónomas presente en la página principal.

La estructura general es la siguiente:

1. Datos iniciales:
   - Array de comunidades autónomas con:
        - Nombre visible.
        - Identificador interno.
        - Ruta de navegación.

2. Selección de elementos del DOM:
   - Input de búsqueda.
   - Botón para limpiar la consulta.
   - Contenedor de resultados.

3. Funciones auxiliares:
   - Normalización de texto para eliminar diferencias entre mayúsculas, minúsculas y acentos.
   - Filtrado de comunidades según la búsqueda.

4. Renderizado de resultados:
   - Generación dinámica de elementos HTML.
   - Control del estado visual del listado.

5. Gestión de eventos:
   - Escritura en el buscador.
   - Limpieza de la búsqueda.
   - Cierre mediante tecla Escape.
   - Cierre al hacer click fuera del componente.

La interacción se realiza mediante clases CSS y atributos ARIA para mantener la accesibilidad del componente.

*/

/* INICIO: Datos de Comunidades Autónomas

Se crea un array de objetos con la información necesaria para construir los resultados del buscador.

Cada elemento contiene:
- nombre: texto que se muestra al usuario.
- ccaa: identificador interno de la comunidad autónoma.
- url: ruta hacia la página específica de la comunidad.

Este array funciona como fuente de datos para el filtrado dinámico.

*/
const universidades = [
  { nombre: 'Universidades de Andalucía', ccaa: 'andalucia', url: './por-ccaa/andalucia.html' },
  { nombre: 'Universidades de Aragón', ccaa: 'aragon', url: './por-ccaa/aragon.html' },
  { nombre: 'Universidades de Asturias', ccaa: 'asturias', url: './por-ccaa/asturias.html' },
  { nombre: 'Universidades de Baleares', ccaa: 'baleares', url: './por-ccaa/baleares.html' },
  { nombre: 'Universidades de Canarias', ccaa: 'canarias', url: './por-ccaa/canarias.html' },
  { nombre: 'Universidades de Cantabria', ccaa: 'cantabria', url: './por-ccaa/cantabria.html' },
  { nombre: 'Universidades de Castilla-La Mancha', ccaa: 'castilla-la-mancha', url: './por-ccaa/castilla-la-mancha.html' },
  { nombre: 'Universidades de Castilla y León', ccaa: 'castilla-y-leon', url: './por-ccaa/castilla-y-leon.html' },
  { nombre: 'Universidades de Cataluña', ccaa: 'cataluna', url: './por-ccaa/cataluna.html' },
  { nombre: 'Universidades de Ceuta y Melilla', ccaa: 'ceuta-melilla', url: './por-ccaa/ceuta-y-melilla.html' },
  { nombre: 'Universidades de Comunidad de Madrid', ccaa: 'madrid', url: './por-ccaa/madrid.html' },
  { nombre: 'Universidades de Comunidad Valenciana', ccaa: 'comunidad-valenciana', url: './por-ccaa/valencia.html' },
  { nombre: 'Universidades de Extremadura', ccaa: 'extremadura', url: './por-ccaa/extremadura.html' },
  { nombre: 'Universidades de Galicia', ccaa: 'galicia', url: './por-ccaa/galicia.html' },
  { nombre: 'Universidades de La Rioja', ccaa: 'la-rioja', url: './por-ccaa/la-rioja.html' },
  { nombre: 'Universidades de Murcia', ccaa: 'murcia', url: './por-ccaa/murcia.html' },
  { nombre: 'Universidades de Navarra', ccaa: 'navarra', url: './por-ccaa/navarra.html' },
  { nombre: 'Universidades del País Vasco', ccaa: 'pais-vasco', url: './por-ccaa/pais-vasco.html' }
];

/* FIN: Datos de Comunidades Autónomas */


/* INICIO: Selección de elementos del DOM

Se almacenan las referencias a los elementos HTML necesarios para controlar
el funcionamiento del buscador:

- searchInput: Campo donde el usuario introduce la búsqueda.

- searchClearBtn:Botón encargado de limpiar la consulta actual.

- searchResults:Contenedor donde se generan los resultados dinámicamente.

*/
const searchInput = document.getElementById('searchInput');
const searchClearBtn = document.getElementById('searchClearBtn');
const searchResults = document.getElementById('searchResults');
 
/* FIN: Selección de elementos del DOM */


/* INICIO: Funciones del buscador

Este bloque contiene toda la lógica necesaria para:
- Normalizar textos.
- Filtrar comunidades.
- Pintar resultados.
- Controlar estados visuales.

El filtrado se realiza sin distinguir entre mayúsculas, minúsculas o acentos para mejorar la experiencia del usuario.

*/


function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
 
/* filtrarUniversidades: devuelve las universidades que coinciden con el texto */
function filtrarUniversidades(texto) {
  const textoNormalizado = normalizarTexto(texto);
  return universidades.filter((universidad) =>
    normalizarTexto(universidad.nombre).includes(textoNormalizado)
  );
}
 
function pintarResultados(lista) {
  const hayResultados = lista.length > 0;
 
  searchResults.innerHTML = '';
  searchResults.classList.add('activo');
  searchInput.setAttribute('aria-expanded', 'true');
 
  if (!hayResultados) {
    const empty = document.createElement('li');
    empty.className = 'search__empty';
    empty.textContent = 'No se han encontrado comunidades autónomas';
    searchResults.appendChild(empty);
    return;
  }
 
  lista.forEach((universidad) => {
    const item = document.createElement('li');
    item.className = 'search__result';
    item.setAttribute('role', 'option');
 
    const link = document.createElement('a');
    link.className = 'search__result-link';
    link.href = universidad.url;
    link.title = `Ver ${universidad.nombre}`;
    link.textContent = universidad.nombre;
 
    item.appendChild(link);
    searchResults.appendChild(item);
  });
}
 
function cerrarResultados() {
  searchResults.innerHTML = '';
  searchResults.classList.remove('activo');
  searchInput.setAttribute('aria-expanded', 'false');
}
 
function actualizarBotonLimpiar(hayTexto) {
  searchClearBtn.classList.toggle('activo', hayTexto);
}
 
function searchInputHandler() {
  const texto = searchInput.value.trim();
  const hayTexto = texto.length > 0;
 
  actualizarBotonLimpiar(hayTexto);
  hayTexto ? pintarResultados(filtrarUniversidades(texto)) : cerrarResultados();
}
 
function searchClearHandler() {
  searchInput.value = '';
  actualizarBotonLimpiar(false);
  cerrarResultados();
  searchInput.focus();
}
 
function searchKeydownHandler(event) {
  if (event.key === 'Escape') searchClearHandler();
}
 
function searchOutsideClickHandler(event) {
  const isClickDentro = event.target.closest('.search__field, .search__results');
  if (!isClickDentro) cerrarResultados();
}
 
searchInput.addEventListener('input', searchInputHandler);
searchInput.addEventListener('keydown', searchKeydownHandler);
searchClearBtn.addEventListener('click', searchClearHandler);
document.addEventListener('click', searchOutsideClickHandler);
 