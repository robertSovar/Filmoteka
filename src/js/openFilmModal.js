import { genres } from './fetchGenres';
import {
  addToStorage,
  getFromStorage,
  removeFromStorage,
} from './setGetLocalStorage';
import {
  addToQueue,
  addToWatched,
  updateFilmInStorage,
} from './queueWatchedManager';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const openFilmModal = (filmData, cardHtml) => {
  if (
    !filmData ||
    typeof filmData !== 'object' ||
    !filmData.hasOwnProperty('genre_ids')
  ) {
    console.error(
      'Datele filmului nu sunt complete sau sunt într-un format incorect.'
    );
    return;
  }

  // Determina numele genurilor
  const genreNames = Array.isArray(filmData.genre_ids)
    ? filmData.genre_ids
        .map(id => {
          const genre = genres.find(genre => genre.id === id);
          return genre ? genre.name : 'Unknown';
        })
        .filter(name => name !== 'Unknown')
        .join(', ')
    : 'Unknown';

  let originalTitle = filmData.title || 'Unknown Title';

  if (filmData.hasOwnProperty('media_type')) {
    if (filmData.media_type === 'movie') {
      originalTitle = filmData.original_title || filmData.title;
    } else if (filmData.media_type === 'tv') {
      originalTitle = filmData.original_name || filmData.name;
    }
  }

  // Determina titlul filmului și ID-ul
  const filmTitle = filmData.title || filmData.name;
  const filmId = filmData.id;

  // Verifica dacă filmul este deja în localStorage
  const isFilmInQueue = getFromStorage(filmData.id) !== null;

  // Construiți HTML-ul pentru fereastra modală
  const modalHtml = `
    <div class="film-modal">
        <div class="film-modal-content">
         <span class="close-modal">&times;</span>
         <h2 class="film-modal-title">${filmData.title || filmData.name}</h2>
        ${
          filmData.trailerUrl
            ? `<div class="film-modal-trailer">
                   <iframe src="${filmData.trailerUrl}" frameborder="0" allowfullscreen ></iframe>
                    </div>`
            : `<div class="film-modal-poster">
                   <img src="https://image.tmdb.org/t/p/w500${
                     filmData.poster_path
                   }" alt="${filmData.title || filmData.name}">
                </div>`
        }
       
        <h3>Original title: ${originalTitle}</h3>
        <p class="film-modal-score"><span>Score: ${
          typeof filmData.vote_average === 'number'
            ? filmData.vote_average.toFixed(2)
            : 'N/A'
        }</span></p>
        <p class="modal-genre-paragraph"><b>Genre:</b> ${genreNames}</p>
        <h4 class="film-modal-about">ABOUT</h4>
        <p>${filmData.overview}</p>
        <div class="film-modal-actions">
          <button id="addToWatchedBtn">ADD TO WATCHED</button>
           <button id="addToQueueBtn">${
             isFilmInQueue ? 'REMOVE FROM QUEUE' : 'ADD TO QUEUE'
           }</button>
        </div>
      </div>
    </div>`;

  // adauga fereastra modală în DOM
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.querySelector('.film-modal');

  // selecteaza butonul addToQueueBtn după ce modalul este adăugat în DOM
  const addToQueueBtn = document.querySelector('#addToQueueBtn');
  const addToWatchedBtn = document.querySelector('#addToWatchedBtn');
  //------------------------------------------------------------------------------------
  const setButtonStates = () => {
    const filmObject = getFromStorage(filmData.id);
    if (filmObject) {
      addToQueueBtn.textContent = filmObject.isInQueue
        ? 'REMOVE FROM QUEUE'
        : 'ADD TO QUEUE';
      addToWatchedBtn.textContent = filmObject.isWatched
        ? 'REMOVE FROM WATCHED'
        : 'ADD TO WATCHED';
    }
  };
  setButtonStates();

  addToQueueBtn.addEventListener('click', () => {
    const filmObject = getFromStorage(filmData.id);
    if (filmObject) {
      // Toggle starea isInQueue și păstrează starea isWatched
      updateFilmInStorage(
        filmData.id,
        !filmObject.isInQueue,
        filmObject.isWatched
      );
      if (filmObject.isInQueue) {
        removeFilmCardFromDOM(filmData.id);
      }
    } else {
      // Dacă filmul nu este în local storage, îl adăugăm
      addToQueue({
        id: filmData.id,
        cardHtml: cardHtml,
        data: filmData,
      });
    }
    setButtonStates(); // Actualizează starea butonului
  });

  addToWatchedBtn.addEventListener('click', () => {
    const filmObject = getFromStorage(filmData.id);
    if (filmObject) {
      // Toggle starea isWatched și păstrează starea isInQueue
      updateFilmInStorage(
        filmData.id,
        filmObject.isInQueue,
        !filmObject.isWatched
      );
      if (filmObject.isWatched) {
        removeFilmCardFromDOM(filmData.id);
      }
    } else {
      // Dacă filmul nu este în local storage, îl adăugăm
      addToWatched({
        id: filmData.id,
        cardHtml: cardHtml,
        data: filmData,
      });
    }
    setButtonStates(); // Actualizează starea butonului
  });

  //-------------------------------------------------------------------------------------

  new SimpleLightbox('.film-modal-content a', {
    overlay: true,
    close: true,
    showCounter: true,
  });
  // Adăugați funcționalitatea pentru închiderea ferestrei modale

  function handleModalClick(event) {
    if (
      event.target === modal ||
      event.target.classList.contains('close-modal')
    ) {
      modal.remove();
      document.removeEventListener('click', handleModalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }

  // Funcție pentru a gestiona apăsarea tastei Escape
  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleModalClick);
    }
  }

  modal.addEventListener('click', handleModalClick);
  document.addEventListener('keydown', handleEscapeKey);
};

function removeFilmCardFromDOM(filmId) {
  console.log(`Încercăm să eliminăm cardul cu ID-ul: ${filmId}`);
  const filmCard = document.querySelector(
    `.movie-wrapper__card[data-filmid="${filmId}"]`
  );
  if (filmCard) {
    filmCard.remove();
    console.log(`Cardul cu ID-ul: ${filmId} a fost eliminat.`);
  } else {
    console.log(`Cardul cu ID-ul: ${filmId} nu a fost găsit.`);
  }
}

