// Obține elementele necesare
const modal = document.getElementById('myFooterModal');
const btn = document.getElementById('openFooterModal');
const closeBtn = document.querySelector('.close-button-member');

// Funcție pentru a deschide fereastra modală
function openModal() {
  modal.style.display = 'block';
  window.addEventListener('keydown', handleEscapeKeyPress);
}

// Funcție pentru a închide fereastra modală
function closeModal() {
  modal.style.display = 'none';
  window.removeEventListener('keydown', handleEscapeKeyPress);
}

// Funcție pentru a gestiona apăsarea tastei Escape
function handleEscapeKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

btn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Închide fereastra modală dacă utilizatorul dă click în afara acesteia
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});
