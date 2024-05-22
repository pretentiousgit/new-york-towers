import drawFireEscapeLayer from './drawFireEscapeLayer';

export default function fireEscapeGen(config) {
  const {
    fireW,
    fireX,
    fireEscapes,
    mirrored,
    curvy,
    buildingOrigin,
    buildingWidth,
    maxStories,
    height,
    lineY,
    index,
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
    maxStories,
    index,
    p5Sketch
  };
  // And here we start actually drawing the building.
  // we need: all the information about the building
  // and an array generated from that which represents each story of the building.c
  if (fireEscapes === 1) {
    drawFireEscapeLayer(fireEscapeVal);
  }

  if (fireEscapes === 2) {
    const escapeDoubleA = { ...fireEscapeVal, x: buildingOrigin[0] + 10 };
    const escapeDoubleB = { ...fireEscapeVal, x: buildingOrigin[0] + (buildingWidth - fireEscapeVal.w) };
    drawFireEscapeLayer(escapeDoubleA);
    drawFireEscapeLayer(escapeDoubleB);
  }
}
