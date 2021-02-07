import {
  matrix, getRandomIntInclusive, isEven
} from './utils';
import { genGoldenRectangleWindow } from './generators';

function drawPanelPane(config) {
  const {
    p5Sketch, w, x = 10, y = 10, ac = Boolean(false), cols, rows
  } = config;
  const pane = matrix(cols, rows);

  p5Sketch.noFill();
  // frame
  const frame = genGoldenRectangleWindow(w, x, y);
  const {
    x: x1, y: y1, w: w1, h: h1
  } = frame.outer;
  const {
    x: x2, y: y2, w: w2, h: h2
  } = frame.inner;
  p5Sketch.rect(x1, y1, w1, h1);
  p5Sketch.rect(x2, y2, w2, h2);

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
      p5Sketch.rect(x3, y3, w3, h3);
      p5Sketch.rect(x4, y4, w4, h4);
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

function drawTwoPaneWindow(config) {
  const {
    p5Sketch, w, x = 10, y = 10, ac = Boolean(false)
  } = config;
  const numbers = genGoldenRectangleWindow(w, x, y);
  const { outer, inner } = numbers;

  p5Sketch.rect(outer.x, outer.y, outer.w, outer.h); // outer
  p5Sketch.rect(inner.x, inner.y, inner.w, inner.h); // outer
  p5Sketch.rect(inner.x, inner.y + (inner.h / 2), inner.w, 2);

  if (ac) {
    console.log('missing air conditioner');
    // airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
  }
}

function drawOnePaneWindow(config) {
  const {
    p5Sketch, w, x = 10, y = 10, ac = Boolean(false)
  } = config;
  const numbers = genGoldenRectangleWindow(w, x, y);
  const { outer, inner } = numbers;

  p5Sketch.rect(outer.x, outer.y, outer.w, outer.h); // outer
  p5Sketch.rect(inner.x, inner.y, inner.w, inner.h); // outer
  if (ac) {
    console.log('missing air conditioner');
    // airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
  }
}

function drawSquarePaneWindow(config) {
  const {
    p5Sketch, storyHeight, w, x = 10, y = 10, ac = Boolean(false)
  } = config;

  const width = ((w * 2) >= storyHeight - 10) ? 48 : w;
  const numbers = genFramedPanelVal(width, x, y, width * 2);

  const { outer, inner } = numbers;
  p5Sketch.rect(outer.x, outer.y, outer.w, outer.h); // outer
  p5Sketch.rect(inner.x, inner.y, inner.w, inner.h); // outer
  p5Sketch.rect(inner.x, inner.y + inner.h / 2, inner.w, 2);

  if (ac) {
    console.log('missing air conditioner');
    // airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
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
  windowDrawFnList
  // twoPane,
  // drawSquarePaneWindow,
  // drawTwoPaneWindow,
  // drawOnePaneWindow,
  // genFramedPanelVal,
  // genGoldenRectangleWindow
};
