import {getRandomIntInclusive, isEven} from './utils';

const DEBUG = false;

function verticalPaneDef(config, sk) {
  const {
    panelsInWindows, drawWindowFn, x, y, w, ac
  } = config;
  /* width is defined per window panel in the group */
  /* currently, this defines all windows in a symmetric set as being the same width */

  const isThereAC = Boolean(getRandomIntInclusive(0, 1) === 1); // TODO: later we will do something about the air conditioner count.

  // this is whether we have even or odd panel numbers in one window
  // not whether we have even or odd panels at all.
  if (isEven(panelsInWindows)) {
    // if we have an even number of panels,
    // panels should emerge left and right around the center of X
    // for (let i = 0; i < number; i += 1) {
    //   if (!isEven(i)) {
    //     element(w, x - ((w * i) - w), y);
    //   } else {
    //     element(w, x + ((w * i) - w), y);
    //   }
    // }
  } else {
    // else the first panel should be centered
    // and subsequent panels should be to the left and right of the first one
    for (let i = 1; i <= panelsInWindows; i += 1) {
      if (i === 1) {
        // center first element of an odd series over x
        drawWindowFn(w, x, y, isThereAC);
        if (DEBUG) {
          sk.stroke(255, 255, 0);
          sk.rect(x, y, 1, 40);
          sk.stroke(0, 0, 0);
        }
        // nb here
      } else if (isEven(i)) { // alternate left and right even/odd remainder
        drawWindowFn(w, x - (w + w / 2), y, isThereAC);
      } else {
        drawWindowFn(w, x + (w + w / 2) - w, y, isThereAC);
      }
    }
  }
}

export {verticalPaneDef}