import drawFireEscapeLayer from './drawFireEscapeLayer';
import drawBasicBuildingLayer from './drawBasicBuildingLayer';

function drawStory(storyData, sk) {
  const {
    fireW,
    fireX,
    fireEscapes,
    mirrored,
    curvy,
    buildingOrigin,
    buildingWidth,
    height,
    numberOfWindows,
    windows,
    lineY
  } = storyData;

  const fireEscapeVal = {
    w: fireW,
    h: height,
    x: fireX,
    y: lineY,
    isItCurvy: curvy,
    isItMirrored: mirrored
  };
  // And here we start actually drawing the building.
  // we need: all the information about the building
  // and an array generated from that which represents each story of the building.
  if (fireEscapes === 1) {
    drawFireEscapeLayer(fireEscapeVal, sk);
  }

  console.log(buildingOrigin);
  if (fireEscapes === 2) {
    const escapeDoubleA = { ...fireEscapeVal, x: buildingOrigin[0] + 10 };
    const escapeDoubleB = { ...fireEscapeVal, x: buildingOrigin[0] + (buildingWidth - fireEscapeVal.w) };
    drawFireEscapeLayer(escapeDoubleA, sk);
    drawFireEscapeLayer(escapeDoubleB, sk);
  }

  drawBasicBuildingLayer({
    buildingX: buildingOrigin[0],
    lineY,
    windows,
    numberOfWindows
  }, sk);
}

export default drawStory;
