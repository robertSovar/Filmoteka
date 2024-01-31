const footerGetFullYear = () => {
  const yearSpan = document.getElementById('current-year');
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
};

export default footerGetFullYear;
