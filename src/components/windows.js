import {
  matrix, getRandomIntInclusive, isEven
} from './utils';
import { genGoldenRectangleWindow } from './generators';

// zpanelsInWindows, windowType, x1, y, windowWidth, ac
function verticalPaneDef(panelsInWindows, windowType, ...etc) {
  /* width is defined per window panel in the group */
  /* currently, this defines all windows in a symmetric set as being the same width */

  const x = etc[0];
  const y = etc[1];
  const w = etc[2];
  const ac = etc[3];

  const isThereAC = getRandomIntInclusive(0, 1) === 1
    ? Boolean(ac > 0 && acCount < ac)
    : false;

  if (isThereAC) { acCount += 1; }

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
        windowType(w, x, y, isThereAC);
        if (DEBUG) {
          stroke(255, 255, 0);
          rect(x, y, 1, 40);
          stroke(0, 0, 0);
        }
        // nb here
      } else if (isEven(i)) { // alternate left and right even/odd remainder
        windowType(w, x - (w + w / 2), y, isThereAC);
      } else {
        windowType(w, x + (w + w / 2) - w, y, isThereAC);
      }
    }
  }
}

function drawPanelPane(w, x = 10, y = 10, ac = Boolean(false), cols = 3, rows = 3) {
  const pane = matrix(cols, rows);

  noFill();
  // frame
  const frame = genGoldenRectangleWindow(w, x, y);
  const {
    x: x1, y: y1, w: w1, h: h1
  } = frame.outer;
  const {
    x: x2, y: y2, w: w2, h: h2
  } = frame.inner;
  rect(x1, y1, w1, h1);
  rect(x2, y2, w2, h2);

  // inject panels
  let numbers = genGoldenRectangleWindow(w / cols);
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const posX = x + ((numbers.outer.w) * i);
      const posY = y + ((numbers.outer.h) * j);

      numbers = genGoldenRectangleWindow(w / cols, posX, posY);
      const {
        x: x1, y: y1, w: w1, h: h1
      } = numbers.outer;
      const {
        x: x2, y: y2, w: w2, h: h2
      } = numbers.inner;
      rect(x1, y1, w1, h1);
      rect(x2, y2, w2, h2);
      pane[i][j] = numbers;
    }
  }

  if (ac) {
    airConditioner(x2 + (w2 / 2), y2, h2);
  }

  // return information about pane?
  return {
    topL: [pane[0][0].outer.x, pane[0][0].outer.y],
    bottomR: [pane[2][2].outer.x, pane[2][2].outer.y],
    h: h1,
    w: w1
  };
}

function twoPane(fn, w, x, y) {
  const openAmount = getRandomIntInclusive(1, 100) / 100;
  fn(w, x, y);
  fn(w, x, y + h);
}

function squarePaneWindow(w, x = 10, y = 10, ac = Boolean(false)) {
  const width = ((w * 2) >= storyHeight - 10) ? 48 : w;
  const numbers = framedPanel(width, x, y, width * 2);

  const { outer, inner } = numbers;
  rect(outer.x, outer.y, outer.w, outer.h); // outer
  rect(inner.x, inner.y, inner.w, inner.h); // outer
  rect(inner.x, inner.y + inner.h / 2, inner.w, 2);

  if (ac) {
    airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
  }
}

function drawTwoPaneWindow(w, x = 10, y = 10, ac = Boolean(false)) {
  const numbers = genGoldenRectangleWindow(w, x, y);
  const { outer, inner } = numbers;

  rect(outer.x, outer.y, outer.w, outer.h); // outer
  rect(inner.x, inner.y, inner.w, inner.h); // outer
  rect(inner.x, inner.y + (inner.h / 2), inner.w, 2);

  if (ac) {
    airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
  }
}

function onePaneWindow(w, x, y, ac = Boolean(false)) {
  const numbers = genGoldenRectangleWindow(w, x, y);
  const { outer, inner } = numbers;

  rect(outer.x, outer.y, outer.w, outer.h); // outer
  rect(inner.x, inner.y, inner.w, inner.h); // outer
  if (ac) {
    airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
  }
}

function framedPanel(w, x, y, h) {
  const innerPaneScale = 0.98;
  const paneDiff = (1 - innerPaneScale) / 2;

  const outer = {
    x, y, w, h
  };
  const inner = {
    x: x + w / 2 * 0.02,
    y: y + h / 2 * 0.02,
    w: w * innerPaneScale,
    h: h * innerPaneScale
  };

  return {
    outer, inner
  };
}

const panelStyles = [drawPanelPane, onePaneWindow, drawTwoPaneWindow, squarePaneWindow];

export {
  panelStyles,
  verticalPaneDef,
  drawPanelPane,
  twoPane,
  squarePaneWindow,
  drawTwoPaneWindow,
  onePaneWindow,
  framedPanel,
  genGoldenRectangleWindow
};
