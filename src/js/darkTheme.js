
export let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#checkbox');

const enableDarkMode = () => {
  document.body.classList.add('darkmode'); // Adaugă clasa darkmode pe body
  localStorage.setItem('darkMode', 'enabled'); // Actualizează darkMode în localStorage
};

const disableDarkMode = () => {
  document.body.classList.remove('darkmode'); // Elimină clasa darkmode de pe body
  localStorage.setItem('darkMode', null); // Actualizează darkMode în localStorage
};

// Setează tema în funcție de preferința salvată în localStorage
if (darkMode === 'enabled') {
  darkModeToggle.checked = true;
  enableDarkMode();
}

// Ascultător pentru schimbarea stării butonului de comutare
darkModeToggle.addEventListener('change', () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkModeToggle.checked) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
