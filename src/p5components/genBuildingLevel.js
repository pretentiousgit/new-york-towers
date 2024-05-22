import getRandomIntInclusive from '../utils/getRandomIntInclusive';

function storyGenerator(buildingNumbers) {
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
    // We have to test for ground floor because it's drawn last but it's needed for spacing
    // const groundFloor = Boolean(i === stories.length - 1);
    const height = storyHeight;
    const numberOfWindows = getRandomIntInclusive(2, 5);
    const drawWindowFn = windowStyle;

    const lineY = height * i;
    const storyY = height * i;

    return {
      ...rest,
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
