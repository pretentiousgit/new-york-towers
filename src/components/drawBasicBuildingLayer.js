import { getRandomIntInclusive } from './utils';
import { symmetricWindowSeries } from './symmetricSeries';

const DEBUG = false;

function drawBasicBuildingLayer(config) {
  const {
    p5Sketch, buildingOrigin, buildingWidth, storyY, groundFloor, height, lowerBoundWindowWidth
  } = config;

  const buildingX = buildingOrigin[0];

  // Draw a box for a story
  p5Sketch.stroke(0, 0, 0);
  p5Sketch.noFill();
  p5Sketch.rect(buildingX, storyY, buildingWidth, height);

  /*
    What should happen:
    ==> Generate a building with a window style and a blank ground floor
    ==> Fire escapes are a yes or no by building

  */

  // things should be symmetric
  // they can also be multiply-defined
  // fireEscapeLayer(fireW, h, fireX, y, index);

  /* TODO:
    -- Pass the building layer config directly to building subfunctions
  */

  //  Window type is set per building by buildingGenerator
  console.log('height?', config.buildingHeight);
  const symmetricSettings = {
    ...config,
    buildingX,
    y: storyY + 10 /* - (10 * scaleWeight) */ //   y
  };

  if (!groundFloor) {
    symmetricWindowSeries(symmetricSettings);
  }

  if (DEBUG) {
    // center line
    p5Sketch.stroke(0, 124, 69);
    p5Sketch.line(buildingX, storyY, buildingX, height);
    const c = p5Sketch.color(255, 255, 255);
    p5Sketch.fill(c);
    p5Sketch.stroke(0, 0, 0);
  }
}

export { drawBasicBuildingLayer };
