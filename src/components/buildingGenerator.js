import { getBool, getRandomIntInclusive, range } from './utils';
import { panelStyles } from './windows';

function buildingNumbers(config) {
  const {
    pageMargin, buildingWidth, minStories, maxStories, pi, canvas, buildingIndex
  } = config;

  const windowStyle = panelStyles[getRandomIntInclusive(0, panelStyles.length - 1)];
  const stories = range(getRandomIntInclusive(minStories, maxStories));
  const storyHeight = canvas[1] / stories;

  // this is like this because canvas draws rectangles on a strict x-y graph from origin, ie: height is sometimes backwards.
  const buildingX = pageMargin + ((pageMargin + buildingWidth) * buildingIndex);
  const buildingY = canvas[1] - (storyHeight - 20);

  const fireW = getRandomIntInclusive(buildingWidth / pi, buildingWidth / (pi / 2));
  const fireX = getRandomIntInclusive(buildingX, buildingX + (buildingWidth - fireW));

  const fireEscapes = getRandomIntInclusive(0, 2);
  const mirrored = getBool();
  const curvy = getBool();

  return {
    windowStyle,
    stories,
    fireW,
    fireX,
    fireEscapes,
    mirrored,
    curvy,
    buildingOrigin: [buildingX, buildingY],
    buildingWidth,
    lowerBoundWindowWidth: config
  };
}

export default buildingNumbers;
