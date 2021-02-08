import WebFont from 'webfontloader';

const API_KEY = 'AIzaSyCxDDCT8nUfp2FV9y0wKL4gOoq5FE3iX3s';

async function loadFontsList() {
  try {
    const result = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`);
    const data = await result.json();
    console.log('loaded google fonts list: ', data.items.length);
    return data.items;
  } catch (error) {
    console.log('loadFontsList', error, error.message);
    return error;
  }
}

function loadRandomFont(fontsList) {
  const randomIndex = Math.floor(Math.random() * fontsList.length);
  const selectedFont = fontsList[randomIndex].family;
  WebFont.load({
    google: {
      families: [selectedFont]
    }
  });
  console.log('Selected', selectedFont);
  return selectedFont;
}

function updateFont(selectedFont) {
  const el = document.querySelector('#cv'); // TODO: this binds to HTML. Maybe generate from JSON instead?
  el.style.fontFamily = selectedFont;
  el.setAttribute('title', selectedFont);
}

async function fontSwapper() {
  const fontsList = await loadFontsList();
  const selectedFont = loadRandomFont(fontsList);
  updateFont(selectedFont);
}

export { fontSwapper };
