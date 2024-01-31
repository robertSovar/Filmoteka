export const addToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

// addToStorage('myKey', 'some value');
// console.log(localStorage.getItem('myKey'));

// ---------------------------------------------------------------------------
export const getFromStorage = key => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    // Verifică dacă item-ul poate fi un obiect JSON
    if (item.startsWith('{') || item.startsWith('[')) {
      return JSON.parse(item);
    } else {
      // Pentru datele care nu sunt JSON (cum ar fi darkMode), doar returnează valoarea
      return item;
    }
  } catch (error) {
    console.error('Eroare la parsarea datelor din localStorage:', error);
    return null;
  }
};


// ------------------------------------------------------------------
export const removeFromStorage = key => {
  try {
    localStorage.removeItem(key);
    console.log(`Elementul cu cheia "${key}" a fost șters din localStorage.`);
  } catch (error) {
    console.error(error);
  }
};
// Șterge elementul cu cheia ('cheieSpecifică')
// removeFromStorage();
