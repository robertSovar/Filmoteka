import { fetchMovies } from './js/fetchMovies.js';
import { modal, btn, span } from './js/footerModal.js';
import { openFilmModal } from './js/openFilmModal.js';
import footerGetFullYear from './js/footerGetFullYear.js';
import { setupMyLibraryLink } from './js/myLibrary.js';
import { darkmode } from './js/darkTheme.js';
import { scrollFunction, backToTop } from './js/scrollToTopBtn.js';
import { searchForm } from './js/searchForm.js';
import { createFilmCard } from './js/createFilmCard.js';
import { options } from './js/options-pagination.js';
import { createPagination } from './js/createPagination.js';

window.addEventListener('load', async () => {
  try {
    footerGetFullYear();
    setupMyLibraryLink();
    scrollFunction();
    backToTop();
    const popularMovies = await fetchMovies();
    createFilmCard(popularMovies);
    createPagination(popularMovies);
  } catch (error) {
    console.alert('Eroare la încărcarea filmelor populare:', error);
  }
});
