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
  
  // And here we start actually drawing the building.
  // we need: all the information about the building
  // and an array generated from that which represents each story of the building.
  if (fireEscapes === 1) {
    drawFireEscapeLayer(fireW, height, fireX, lineY, curvy, mirrored);
  }

  if (fireEscapes === 2) {
    const w = fireW / 1.5;
    drawFireEscapeLayer(w, height, buildingOrigin[0] + 10, lineY, curvy, false);
    drawFireEscapeLayer(w, height, buildingOrigin[0] + (buildingWidth - w), lineY, curvy, true);
  }

  drawBasicBuildingLayer({
    buildingX: buildingOrigin[0],
    lineY,
    windows,
    numberOfWindows
  }, sk);
}

export default drawStory;
