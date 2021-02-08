import drawFireEscapeLayer from './drawFireEscapeLayer';
import drawBasicBuildingLayer from './drawBasicBuildingLayer';

function fireEscapeGen(config) {
  const {
    fireW,
    fireX,
    fireEscapes,
    mirrored,
    curvy,
    buildingOrigin,
    buildingWidth,
    height,
    lineY,
    p5Sketch
  } = config;

  // w = buildingWidth / 2, h = storyHeight, x = buildingWidth / 2, y = storyHeight, isItCurvy, isItMirrored
  const fireEscapeVal = {
    w: fireW,
    h: height,
    x: fireX,
    y: lineY,
    isItCurvy: curvy,
    isItMirrored: mirrored,
    p5Sketch
  };
  // And here we start actually drawing the building.
  // we need: all the information about the building
  // and an array generated from that which represents each story of the building.
  console.log('fire escape settings', fireEscapeVal);
  if (fireEscapes === 1) {
    drawFireEscapeLayer(fireEscapeVal);
  }

  console.log(buildingOrigin);
  if (fireEscapes === 2) {
    const escapeDoubleA = { ...fireEscapeVal, x: buildingOrigin[0] + 10 };
    const escapeDoubleB = { ...fireEscapeVal, x: buildingOrigin[0] + (buildingWidth - fireEscapeVal.w) };
    drawFireEscapeLayer(escapeDoubleA);
    drawFireEscapeLayer(escapeDoubleB);
  }
}

export { fireEscapeGen };
