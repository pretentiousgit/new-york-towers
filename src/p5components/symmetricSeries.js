import { drawAirConditioner } from './drawAirConditioner';
import {
  getRandomIntInclusive, isEven, getBool, range
} from '../library/utils';

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

function airConConfig(config, totalAC) {
  let replyConfig;
  if (getBool() && totalAC.length > 0) {
    totalAC.pop(); // TODO: HERE IT IS WE DID A MUTATE
    replyConfig = { ...config, ac: true };
  } else {
    replyConfig = { ...config, ac: false };
  }
  return replyConfig;
}

function symmetricWindowSeries(config) {
  const {
    p5Sketch, numberOfWindows, buildingWidth, drawWindowFn, windowWidth, y, buildingX, totalAirConditioners
  } = config;

  const pairs = getPairSets(numberOfWindows);

  const centerLine = buildingX + buildingWidth / 2;
  const centeredX = (buildingX + buildingWidth / 2) - windowWidth / 2;

  console.log('airConditioners', drawAirConditioner);

  const windowConfig = {
    p5Sketch, drawWindowFn, x: centeredX, y, w: windowWidth, acWidth: config.acWidth
  };

  if (!isEven(numberOfWindows)) {
    const middleConfig = airConConfig(windowConfig, totalAirConditioners);
    drawWindowFn(middleConfig);
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

    // determine how many air conditioners we have to give out
    const pairConfig1 = airConConfig(windowConfig, totalAirConditioners);
    const pairConfig2 = airConConfig(windowConfig, totalAirConditioners);
    drawWindowFn({ ...pairConfig1, x: xL });
    drawWindowFn({ ...pairConfig2, x: xR });
    // debugger;
  }
}

export { symmetricWindowSeries };
