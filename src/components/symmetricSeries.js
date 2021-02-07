import { getRandomIntInclusive, isEven } from './utils';

/*
    numberOfWindows: numberOfWindows,
    drawWindowFn: windowStyle,
    buildingOrigin: buildingX,
    buildingWidth: buildingWidth
*/

function symmetricWindowSeries(config) {
  console.log('config symmetric', config)
  const {
    p5Sketch, numberOfWindows, groundFloor, buildingWidth, drawWindowFn, windowWidth, y, buildingX, currentStory
  } = config;

  const ac = getRandomIntInclusive(0, numberOfWindows);
  const acCount = 0;

  const pairs = (!isEven(numberOfWindows))
    ? (numberOfWindows - 1) / 2
    : numberOfWindows / 2;

  const centerLine = buildingX + buildingWidth / 2;
  const centeredX = (buildingX + buildingWidth / 2) - windowWidth / 2;

  const windowConfig = {
    p5Sketch, drawWindowFn, x: centeredX, y, w:windowWidth, ac
  }
  console.log('check position', windowConfig.x, windowConfig.y)
  console.log('check width', windowConfig.w)
  // debugger;
  if(!isEven(numberOfWindows)){
    drawWindowFn(windowConfig);
  }
  // debugger;
  console.log('check pairs', pairs);
  for (let i = 0; i < pairs; i += 1) {
    const interval = buildingWidth / numberOfWindows;

    console.log('interval', interval);

    const x1 = (centerLine - buildingWidth / 2 + (interval * i + 1)) + ((interval - windowWidth) / 2);
    const x2 = (centerLine + (interval * i) + (interval - (windowWidth / 2)));
    
    const xL = x1;
    const xR = x2;

    console.log('currentStory', currentStory);
    console.log('Y', y);
    console.log('numberOfWindows', numberOfWindows);
    console.log('buildingWidth', buildingWidth);
    console.log('left X', xL);
    console.log('right X', xR);
    p5Sketch.text(currentStory, buildingX, y);
    drawWindowFn({...windowConfig, x: xR});
    drawWindowFn({...windowConfig, x: xL});
    debugger;
  }
}

export { symmetricWindowSeries };
