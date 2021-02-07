import { getRandomIntInclusive } from './utils';
import { symmetricWindowSeries } from './symmetricSeries';
import { windowDrawFnList } from './windows';

const DEBUG = false;

function drawBasicBuildingLayer(config, p5Sketch) {
  const {
    buildingOrigin, buildingWidth, storyY, groundFloor, height, lowerBoundWindowWidth
  } = config;

  const buildingX = buildingOrigin[0];

  // Draw a box for a story
  p5Sketch.stroke(0, 0, 0);
  p5Sketch.noFill();
  p5Sketch.rect(buildingX, storyY, buildingWidth, height);
  // sk.rect(10, 10, 480, 140);
  // things should be symmetric
  // they can also be multiply-defined
  // fireEscapeLayer(fireW, h, fireX, y, index);

  /* TODO:
    -- Pass the building layer config directly to building subfunctions
  */
  //  numberOfWindows, buildingWidth,  windowWidth, 
  const symmetricSettings = {
    ...config,
    windowWidth: getRandomIntInclusive(lowerBoundWindowWidth, 64),
    windowDrawFnList,
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
