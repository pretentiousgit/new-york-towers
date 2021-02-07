import { getRandomIntInclusive, isEven } from './utils';
import { verticalPaneDef } from './verticalPane';

/*
    numberOfWindows: numberOfWindows,
    drawWindowFn: windowStyle,
    buildingOrigin: buildingX,
    buildingWidth: buildingWidth
*/

function symmetricWindowSeries(config) {
  console.log('config symmetric', config)
  const {
    p5Sketch, numberOfWindows, groundFloor, buildingWidth, drawWindowFn, windowWidth, y, buildingX
  } = config;

  const ac = getRandomIntInclusive(0, numberOfWindows);
  const acCount = 0;

  // const panelsInWindows = getRandomIntInclusive(1, 3);
  const panelsInWindows = 1;
  const pairs = (!isEven(numberOfWindows))
    ? (numberOfWindows - 1) / 2
    : numberOfWindows / 2;

  const centerLine = buildingX + buildingWidth / 2;
  const centeredX = (buildingX + buildingWidth / 2) - windowWidth / 2;

  const verticalPaneConfig = {
    p5Sketch, panelsInWindows, drawWindowFn, x: centeredX, y, w:windowWidth, ac
  }
  console.log('check position', verticalPaneConfig.x, verticalPaneConfig.y)
  console.log('check width', verticalPaneConfig.w)
  // debugger;
  drawWindowFn(verticalPaneConfig);
  // debugger;
  // for (let i = 0; i < pairs; i += 1) {
  //   const interval = buildingWidth / numberOfWindows;

  //   const x1 = (centerLine - buildingWidth / 2 + (interval * i + 1)) + ((interval - windowWidth) / 2);
  //   const x2 = (centerLine + (interval * i) + (interval - (windowWidth / 2)));
  //   const xL = x1;
  //   const xR = x2;

  //   verticalPaneDef(panelsInWindows, drawWindowFn, xL, y, windowWidth, ac);
  //   verticalPaneDef(panelsInWindows, drawWindowFn, xR, y, windowWidth, ac);
  // }
}

export { symmetricWindowSeries };
