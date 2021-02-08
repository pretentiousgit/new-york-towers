import {
  getBool, getRandomIntInclusive, range, goldenRatioTallRectangle
} from './utils';
import { windowDrawFnList } from './windows';

function buildingGenerator(config) {
  const {
    pageMargin, buildingWidth, minStories, maxStories, pi, canvas, buildingIndex, lowerBoundWindowWidth, upperBoundWindowWidth
  } = config;

  const windowStyle = windowDrawFnList[0]; // debug: drawSquarePaneWindow

  /* TODO: fix golden ratio window generator/it can't have AC */
  // const windowStyle = windowDrawFnList[getRandomIntInclusive(0, windowDrawFnList.length - 1)]; // debug: drawSquarePaneWindow
  const stories = range(getRandomIntInclusive(minStories, maxStories));
  const storyHeight = Math.round(canvas[1] / stories.length);

  const windowProportions = goldenRatioTallRectangle(storyHeight - getRandomIntInclusive(lowerBoundWindowWidth, upperBoundWindowWidth)); // TODO: why are these random? they aren't random in person? Are they??
  const windowWidth = windowProportions.width;
  const acWidth = (lowerBoundWindowWidth + 6) * 0.618;

  // this is like this because canvas draws rectangles on a strict x-y graph from origin, ie: height is sometimes backwards.
  const buildingX = pageMargin + ((pageMargin + buildingWidth) * buildingIndex);
  const buildingY = canvas[1] - Math.round((storyHeight - 20));

  const fireW = getRandomIntInclusive(buildingWidth / pi, buildingWidth / (pi / 2));
  const fireX = getRandomIntInclusive(buildingX, buildingX + (buildingWidth - fireW));

  const fireEscapes = 0;// TODO: ADD FIRE ESCAPES // getRandomIntInclusive(0, 2);
  const mirrored = true; // getBool();
  const curvy = true; // getBool();

  // we are going to mutate this because why not be a bad cat.
  const totalAirConditioners = range(stories.reduce((level) => level + getRandomIntInclusive(0, 3), '0'));

  return {
    ...config,
    windowStyle,
    windowWidth,
    totalAirConditioners,
    acWidth,
    buildingOrigin: [buildingX, buildingY],
    buildingHeight: storyHeight * stories.length,
    fireX,
    fireW,
    fireEscapes,
    mirrored,
    curvy,
    stories,
    storyHeight
  };
}

export default buildingGenerator;
