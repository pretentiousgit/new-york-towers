/*
  Building Generator sets up the size, shape, and number of stories
  of the building we want to put fire escapes on to

  I am not actually sure the building itself is important
  Maybe I just want to generate the windows?

  This is also really tricky to work with and would benefit perhaps
  from a node-based approach - like, set controls on a config key visibly

  This would be a good project for writing a generator engine?
*/

import getRandomIntInclusive from '../utils/getRandomIntInclusive';
import range from '../utils/range';
import goldenRatioTallRectangle from '../utils/goldenRatioTallRectangle';
import windowOpts from './windows/index';

function buildingGenerator(config) {
  const {
    pageMargin,
    buildingWidth,
    minStories,
    maxStories,
    pi,
    canvasW,
    canvasH,
    buildingIndex,
    lowerBoundWindowWidth,
    upperBoundWindowWidth
  } = config;

  // const windowStyle = windowOpts.drawSquarePane;
  const availableWindows = [...Object.keys(windowOpts)];
  const randomWindowStyle = getRandomIntInclusive(0, availableWindows.length - 1);
  const selectedWindowStyle = availableWindows[randomWindowStyle];
  // const selectedWindowStyle = windowOpts["drawPanelPane"];
  console.log('randomWindowStyle', randomWindowStyle);
  console.log('selectedWindowStyle', selectedWindowStyle);
  const windowStyle = windowOpts[selectedWindowStyle];

  /* TODO: fix golden ratio window generator/it can't have AC */
  // TODO: MORE WINDOW STYLES
  // const windowStyle = windowDrawFnList[getRandomIntInclusive(0, windowDrawFnList.length - 1)]; // debug: drawSquarePaneWindow
  const stories = range(getRandomIntInclusive(minStories, maxStories));
  const storyHeight = Math.round(canvasH / stories.length);

  // TODO: why are these random? they aren't random in person? Are they??
  const windowBaseWidth = storyHeight - getRandomIntInclusive(lowerBoundWindowWidth, upperBoundWindowWidth);
  const windowProp = goldenRatioTallRectangle(windowBaseWidth);
  const windowWidth = windowProp.width;

  const acWidth = windowWidth * 0.618;

  // Canvas draws rectangles on a strict x-y graph from origin, ie: height is sometimes backwards.
  const buildingX = pageMargin + ((pageMargin + buildingWidth) * buildingIndex);
  const buildingY = canvasH - Math.round((storyHeight - 20));

  const fireW = getRandomIntInclusive(buildingWidth / pi, buildingWidth / (pi / 2));
  const fireX = getRandomIntInclusive(buildingX, buildingX + (buildingWidth - fireW));

  const fireEscapes = 1; // getRandomIntInclusive(0, 2);
  const mirrored = true; // getBool();
  const curvy = true;

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
