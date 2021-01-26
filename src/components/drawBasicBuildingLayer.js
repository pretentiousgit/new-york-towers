import { getRandomIntInclusive } from './utils';
import { symmetricWindowSeries } from './symmetricSeries';
import { windowDrawFnList } from './windows';

const DEBUG = false;

function drawBasicBuildingLayer(config, sk) {
  const {
    buildingOrigin, buildingWidth, y, groundFloor, height, lowerBoundWindowWidth
  } = config;

  const buildingX = buildingOrigin[0];
  const buildingY = buildingOrigin[1];

  sk.stroke(0, 0, 0);
  sk.noFill();
  console.log(buildingWidth, height);
  sk.rect(buildingX, buildingY, buildingWidth, height);
  // sk.rect(10, 10, 480, 140);
  // things should be symmetric
  // they can also be multiply-defined
  // fireEscapeLayer(fireW, h, fireX, y, index);

  /* TODO:
    -- Pass the building layer config directly to building subfunctions
  */
  const symmetricSettings = {
    ...config,
    windowWidth: getRandomIntInclusive(lowerBoundWindowWidth, 64),
    windowDrawFnList,
    x: buildingX,
    y: y + 10 /* - (10 * scaleWeight) */ //   y
  };

  // if (!groundFloor) {
  //   symmetricWindowSeries(symmetricSettings);
  // }

  if (DEBUG) {
    // center line
    sk.stroke(0, 124, 69);
    sk.line(buildingX, y, buildingX, height);
    const c = sk.color(255, 255, 255);
    sk.fill(c);
    sk.stroke(0, 0, 0);
  }
}

export { drawBasicBuildingLayer };
