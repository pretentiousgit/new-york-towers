import {
  matrix, getRandomIntInclusive, isEven
} from './utils';
import { genGoldenRectangleWindow } from './generators';

function drawPanelPane(config, sk) {
  const {
    w, x = 10, y = 10, ac = Boolean(false), cols, rows
  } = config;
  const pane = matrix(cols, rows);

  sk.noFill();
  // frame
  const frame = genGoldenRectangleWindow(w, x, y);
  const {
    x: x1, y: y1, w: w1, h: h1
  } = frame.outer;
  const {
    x: x2, y: y2, w: w2, h: h2
  } = frame.inner;
  sk.rect(x1, y1, w1, h1);
  sk.rect(x2, y2, w2, h2);

  // inject panels
  let numbers = genGoldenRectangleWindow(w / cols);
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const posX = x + ((numbers.outer.w) * i);
      const posY = y + ((numbers.outer.h) * j);

      numbers = genGoldenRectangleWindow(w / cols, posX, posY);
      const {
        x: x3, y: y3, w: w3, h: h3
      } = numbers.outer;
      const {
        x: x4, y: y4, w: w4, h: h4
      } = numbers.inner;
      sk.rect(x3, y3, w3, h3);
      sk.rect(x4, y4, w4, h4);
      pane[i][j] = numbers;
    }
  }

  // if (ac) {
  //   airConditioner(x2 + (w2 / 2), y2, h2);
  // }

  // return information about pane?
  return {
    topL: [pane[0][0].outer.x, pane[0][0].outer.y],
    bottomR: [pane[2][2].outer.x, pane[2][2].outer.y],
    h: h1,
    w: w1
  };
}

function drawTwoPaneWindow(config, sk) {
  const {
    w, x = 10, y = 10, ac = Boolean(false)
  } = config;
  const numbers = genGoldenRectangleWindow(w, x, y);
  const { outer, inner } = numbers;

  rect(outer.x, outer.y, outer.w, outer.h); // outer
  rect(inner.x, inner.y, inner.w, inner.h); // outer
  rect(inner.x, inner.y + (inner.h / 2), inner.w, 2);

  if (ac) {
    airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
  }
}

function drawOnePaneWindow(config, sk) {
  const {
    w, x = 10, y = 10, ac = Boolean(false)
  } = config;
  const numbers = genGoldenRectangleWindow(w, x, y);
  const { outer, inner } = numbers;

  rect(outer.x, outer.y, outer.w, outer.h); // outer
  rect(inner.x, inner.y, inner.w, inner.h); // outer
  if (ac) {
    airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
  }
}

function drawSquarePaneWindow(config, sk) {
  const {
    w, x = 10, y = 10, ac = Boolean(false)
  } = config;

  const width = ((w * 2) >= storyHeight - 10) ? 48 : w;
  const numbers = genFramedPanelVal(width, x, y, width * 2);

  const { outer, inner } = numbers;
  sk.rect(outer.x, outer.y, outer.w, outer.h); // outer
  sk.rect(inner.x, inner.y, inner.w, inner.h); // outer
  sk.rect(inner.x, inner.y + inner.h / 2, inner.w, 2);

  if (ac) {
    airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
  }
}

function genFramedPanelVal(w, x, y, h) {
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

const windowDrawFnList = [drawSquarePaneWindow, drawTwoPaneWindow, drawOnePaneWindow];

export {
  drawPanelPane,
  windowDrawFnList,
  // twoPane,
  // drawSquarePaneWindow,
  // drawTwoPaneWindow,
  // drawOnePaneWindow,
  // genFramedPanelVal,
  // genGoldenRectangleWindow
};
