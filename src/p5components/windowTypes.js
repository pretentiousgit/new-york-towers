import { getRandomIntInclusive } from './utils';

/*
    window config:
    {
       w,
       x,
       y,
       h,
       ac
    }

*/

function twoPaneWindow(config) {
  const openAmount = getRandomIntInclusive(1, 100) / 100;
  fn(w, x, y);
  fn(w, x, y + h);
}


export {
  twoPaneWindow,
  drawSquarePaneWindow
};
