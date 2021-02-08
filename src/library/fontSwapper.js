import WebFont from 'webfontloader';
import { getRandomIntInclusive } from './utils';

const API_KEY = 'AIzaSyCxDDCT8nUfp2FV9y0wKL4gOoq5FE3iX3s';

const popular2020 = [
  'Alegreya',
  'B612',
  'Muli',
  'Titillium Web',
  'Varela',
  'Vollkorn',
  'IBM Plex',
  'Crimson Text',
  'Cairo',
  'BioRhyme',
  'Karla',
  'Lora',
  'Frank Ruhl Libre',
  'Playfair Display',
  'Archivo',
  'Spectral',
  'Fjalla One',
  'Roboto',
  'Montserrat',
  'Rubik',
  'Source Sans',
  'Cardo',
  'Cormorant',
  'Work Sans',
  'Rakkas',
  'Concert One',
  'Yatra One',
  'Arvo',
  'Lato',
  'Abril FatFace',
  'Ubuntu',
  'PT Serif',
  'Old Standard TT',
  'Oswald'
];

async function loadFontsList() {
  try {
    const result = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`);
    const data = await result.json();
    console.log('loaded google fonts list: ', data.items.length);
    console.log('loaded google fonts list: ', data.items[2]);
    const popular = data.items.filter((f) => popular2020.includes(f.family));
    console.log('popular', popular);
    return popular;
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
