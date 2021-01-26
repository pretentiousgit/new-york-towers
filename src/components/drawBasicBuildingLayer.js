import { getRandomIntInclusive } from './utils';
import { symmetricWindowSeries } from './symmetricSeries';
import { windowDrawFnList } from './windows';

const DEBUG = false;

function drawBasicBuildingLayer(config, sk) {
  const {
    buildingOrigin, buildingWidth, storyY, groundFloor, height, lowerBoundWindowWidth
  } = config;

  const buildingX = buildingOrigin[0];

  sk.stroke(0, 0, 0);
  sk.noFill();
  sk.rect(buildingX, storyY, buildingWidth, height);
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

  console.log("lowerBoundWindowWidth", lowerBoundWindowWidth);
  console.log("symmetricSettings", symmetricSettings.windowWidth);
  if (!groundFloor) {
    symmetricWindowSeries(symmetricSettings);
  }

  if (DEBUG) {
    // center line
    sk.stroke(0, 124, 69);
    sk.line(buildingX, storyY, buildingX, height);
    const c = sk.color(255, 255, 255);
    sk.fill(c);
    sk.stroke(0, 0, 0);
  }
}

export { drawBasicBuildingLayer };
