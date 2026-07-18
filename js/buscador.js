
/*  buscador
  Se hace un array reopilando toda la informacion de las comunidades autonomas: nombre, url y ccaa
  se selecciona por ID cada uno de los elementos que componen el buscador:
   searchInput
searchClearBtn
searchResults

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

const searchInput = document.getElementById('searchInput');
const searchClearBtn = document.getElementById('searchClearBtn');
const searchResults = document.getElementById('searchResults');
 
 
 
/* =====================================================================
   3. BUSCADOR - Filtrado en vivo de universidades
   Filtra un listado de universidades según el texto introducido por
   el usuario, ignorando mayúsculas y acentos. Pinta los resultados en
   un listbox accesible y permite limpiar la búsqueda.
   ===================================================================== */
 
// normalizarTexto: quita acentos y pasa a minúsculas para comparar sin errores
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
 
// filtrarUniversidades: devuelve las universidades que coinciden con el texto
function filtrarUniversidades(texto) {
  const textoNormalizado = normalizarTexto(texto);
  return universidades.filter((universidad) =>
    normalizarTexto(universidad.nombre).includes(textoNormalizado)
  );
}
 
// pintarResultados: renderiza el listado de coincidencias en el DOM
// (si no hay coincidencias, muestra un mensaje en vez de cerrar la caja)
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
 
// cerrarResultados: oculta el listbox y limpia su contenido
function cerrarResultados() {
  searchResults.innerHTML = '';
  searchResults.classList.remove('activo');
  searchInput.setAttribute('aria-expanded', 'false');
}
 
// actualizarBotonLimpiar: muestra el botón de limpiar solo si hay texto escrito
function actualizarBotonLimpiar(hayTexto) {
  searchClearBtn.classList.toggle('activo', hayTexto);
}
 
// searchInputHandler: se dispara al escribir en el buscador
function searchInputHandler() {
  const texto = searchInput.value.trim();
  const hayTexto = texto.length > 0;
 
  actualizarBotonLimpiar(hayTexto);
  hayTexto ? pintarResultados(filtrarUniversidades(texto)) : cerrarResultados();
}
 
// searchClearHandler: vacía el input, oculta el botón y cierra los resultados
function searchClearHandler() {
  searchInput.value = '';
  actualizarBotonLimpiar(false);
  cerrarResultados();
  searchInput.focus();
}
 
// searchKeydownHandler: permite cerrar y limpiar la búsqueda con Escape
function searchKeydownHandler(event) {
  if (event.key === 'Escape') searchClearHandler();
}
 
// searchOutsideClickHandler: cierra el listbox si se hace click fuera
function searchOutsideClickHandler(event) {
  const isClickDentro = event.target.closest('.search__field, .search__results');
  if (!isClickDentro) cerrarResultados();
}
 
searchInput.addEventListener('input', searchInputHandler);
searchInput.addEventListener('keydown', searchKeydownHandler);
searchClearBtn.addEventListener('click', searchClearHandler);
document.addEventListener('click', searchOutsideClickHandler);
 