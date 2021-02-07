import { goldenRatioTallRectangle, getRandomIntInclusive } from './utils';

function genGoldenRectangleWindow(w, x = 10, y = 10) {
  const bits = goldenRatio(w);
  const innerPaneScale = 0.95;
  const paneDiff = (1 - innerPaneScale) / 2;

  const outer = {
    x, y, w: bits.a, h: bits.c
  };
  const inner = {
    x: (x + bits.a) / (2 * paneDiff),
    y: (y + bits.c) / (2 * paneDiff),
    w: bits.a * innerPaneScale,
    h: bits.c * innerPaneScale
  };

  return {
    outer, inner
  };
}

function genVerticalWindowWidths(width) {
  return getRandomIntInclusive(width / 8, width / 3);
}

export {
  genGoldenRectangleWindow,
  genVerticalWindowWidths
};
