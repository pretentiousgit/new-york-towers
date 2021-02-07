import { airConditioner as drawAirConditioner } from './drawAirConditioner';
import { getRandomIntInclusive, isEven } from './utils';

/*
    numberOfWindows: numberOfWindows,
    drawWindowFn: windowStyle,
    buildingOrigin: buildingX,
    buildingWidth: buildingWidth
*/
function getPairSets(numberOfWindows) {
  return (!isEven(numberOfWindows))
    ? (numberOfWindows - 1) / 2
    : numberOfWindows / 2;
}

function symmetricWindowSeries(config) {
  const {
    p5Sketch, numberOfWindows, buildingWidth, drawWindowFn, windowWidth, y, buildingX, lowerBoundWindowWidth
  } = config;

  const ac = getRandomIntInclusive(0, numberOfWindows);
  const acCount = 0;

  const pairs = getPairSets(numberOfWindows);

  const centerLine = buildingX + buildingWidth / 2;
  const centeredX = (buildingX + buildingWidth / 2) - windowWidth / 2;

  console.log('airConditioners', drawAirConditioner);
  const windowConfig = {
    p5Sketch, drawWindowFn, x: centeredX, y, w: windowWidth, ac, lowerBoundWindowWidth
  };

  if (!isEven(numberOfWindows)) {
    drawWindowFn(windowConfig);
  }

  for (let i = 0; i < pairs; i += 1) {
    /* debug */
    // p5Sketch.rect(centerLine, 0, 4, config.buildingHeight);
    // p5Sketch.text(currentStory, buildingX, y);
    /* / debug */

    const halfBuilding = (buildingWidth / 2);

    const interval = buildingWidth / numberOfWindows;
    const howManyIntervals = (interval * i) + 1;
    const windowWidthTweak = (interval - windowWidth) / 2;

    // Math to draw the left half of the building
    const farLeftEdge = centerLine - halfBuilding;

    // Math to draw the mirrored right half the building
    const farRightEdge = (centerLine + halfBuilding) - windowWidth;

    const xL = farLeftEdge + howManyIntervals + windowWidthTweak;
    const xR = farRightEdge - howManyIntervals - windowWidthTweak;

    drawWindowFn({ ...windowConfig, x: xL });
    drawWindowFn({ ...windowConfig, x: xR });
    // debugger;
  }
}

export { symmetricWindowSeries };
