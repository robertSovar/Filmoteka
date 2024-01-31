import Pagination from 'tui-pagination';
import { fetchMovies } from './fetchMovies';
import { options } from './options-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createFilmCard } from './createFilmCard';
import { currentSearchQuery } from './searchForm';
import '../sass/pagination.scss';

export async function createPagination() {
  const pagination = new Pagination('pagination', options);

  pagination.on('afterMove', onPaginationClick);

  async function onPaginationClick(e) {
    const lastPageNumber = Number(
      document.querySelector('.tui-ico-last').textContent
    );
    const selectedPage = e.page;
    if ((selectedPage > 1) & (selectedPage <= lastPageNumber)) {
      hideBtn(selectedPage);
    }

    const dataResponse = await fetchMovies(currentSearchQuery, selectedPage);
    console.log(dataResponse);

    createFilmCard(dataResponse);

    scrollToTop();
  }
  function hideBtn(selectedPage) {
    const firstPageBtnRef = document.querySelector('.custom-class-first');
    const lastPageBtnRef = document.querySelector('.custom-class-last');

    const lastPageNumber = Number(
      document.querySelector('.tui-ico-last').textContent
    );

    if (selectedPage < 4) {
      firstPageBtnRef.classList.add('btn-hidden');
      return;
    }
    if (lastPageNumber - selectedPage < 3) {
      lastPageBtnRef.classList.add('btn-hidden');
      return;
    }

    lastPageBtnRef.classList.remove('btn-hidden');
    firstPageBtnRef.classList.remove('btn-hidden');
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
