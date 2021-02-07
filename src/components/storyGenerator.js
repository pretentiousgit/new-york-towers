import { getRandomIntInclusive } from './utils';

function storyGenerator(buildingNumbers, sk) {
  const {
    windowStyle,
    stories,
    storyHeight,
    ...rest
  } = buildingNumbers;

  const storyArray = stories.map((m, i) => {
    // Ground floors have different rules
    // they do not have fire escapes
    // and have wildly unique windows
    // this is supposed to set if we're at the BOTTOM of the building, which is ironically the _largest_ number;
    const groundFloor = Boolean(i === stories.length - 1);
    const height = (!groundFloor) ? storyHeight : storyHeight * 1.5;
    const numberOfWindows = (!groundFloor) ? getRandomIntInclusive(2, 5) : null;
    const drawWindowFn = (!groundFloor) ? windowStyle : null;

    const lineY = height * i;
    const storyY = height * i;

    return {
      ...rest,
      groundFloor,
      height,
      numberOfWindows,
      drawWindowFn,
      lineY,
      storyY
    };
  });

  return storyArray;
}

export default storyGenerator;
