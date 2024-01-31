import { getFromStorage } from './setGetLocalStorage';

export function addToQueue(filmData) {
  const filmObject = {
    html: filmData.cardHtml,
    data: filmData,
    isInQueue: true,
  };
  localStorage.setItem(filmData.id.toString(), JSON.stringify(filmObject));
}

export function addToWatched(filmData) {
  const filmObject = {
    html: filmData.cardHtml,
    data: filmData,
    isWatched: true,
  };
  localStorage.setItem(filmData.id.toString(), JSON.stringify(filmObject));
}

export function updateFilmInStorage(filmId, isInQueue, isWatched) {
  const filmObject = getFromStorage(filmId);
  if (filmObject) {
    filmObject.isInQueue = isInQueue;
    filmObject.isWatched = isWatched;
    localStorage.setItem(filmId.toString(), JSON.stringify(filmObject));
  }
}
