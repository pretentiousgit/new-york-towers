import { getRandomIntInclusive } from './utils';

function drawBasicBuildingLayer(config, sk) {
  const {
    buildingX, y, windowStyle, numberOfWindows, groundFloor
  } = config;

  sk.stroke(0, 0, 0);
  sk.noFill();

  // things should be symmetric
  // they can also be multiply-defined
  // fireEscapeLayer(fireW, h, fireX, y, index);

  if (!groundFloor) {
    symmetricWindowSeries(
      numberOfWindows,
      windowStyle, //   windowType = panelPane
      getRandomIntInclusive(lowerBoundWindowWidth, 64), //   windowWidth
      buildingX, //   x
      y + 10, /* - (10 * scaleWeight) */ //   y
      buildingX
    );
  }

  if (DEBUG) {
    // center line
    sk.stroke(0, 124, 69);
    sk.line(buildingX, y, buildingX, storyHeight);
    const c = sk.color(255, 255, 255);
    sk.fill(c);
    sk.stroke(0, 0, 0);
  }
}

export default drawBasicBuildingLayer;
