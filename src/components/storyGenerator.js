import { getRandomIntInclusive } from './utils';

function storyGenerator(buildingNumbers, sk) {
  const {
    windowStyle,
    stories,
    storyHeight,
    ...rest
  } = buildingNumbers;

  const storyArray = stories.map((m, i) => {
    // ground floors are different than normal building stories
    // they do not have fire escapes
    // and have wildly unique windows
    // this is supposed to set if we're at the BOTTOM of the building, which is ironically the _largest_ number;
    const groundFloor = Boolean(i === stories.length);
    const height = (groundFloor) ? storyHeight * 1.5 : storyHeight;
    const numberOfWindows = (!groundFloor) ? getRandomIntInclusive(2, 5) : null;
    const windows = (groundFloor) ? windowStyle : null;
    const lineY = height * i;

    console.log('height check 1', storyHeight);
    console.log('height check', height);
    return {
      ...rest,
      groundFloor,
      height,
      numberOfWindows,
      windows,
      lineY
    };
  });

  return storyArray;
}

export default storyGenerator;
