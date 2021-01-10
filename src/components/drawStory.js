function drawBuilding(sk) {
  // And here we start actually drawing the building.
  // we need: all the information about the building
  // and an array generated from that which represents each story of the building.

  if (fireEscapes === 1) {
    fireEscapeLayer(fireW, height, fireX, lineY, j, curvy, mirrored);
  }

  if (fireEscapes === 2) {
    const w = fireW / 1.5;
    fireEscapeLayer(w, height, buildingOrigin[0] + 10, lineY, j, curvy, false);
    fireEscapeLayer(w, height, buildingOrigin[0] + (buildingWidth - w), lineY, j, curvy, true);
  }

  basicStory(
    buildingOrigin[0],
    lineY,
    windows,
    numberOfWindows
  );
}

function basicStory(buildingX, y, windowStyle, numberOfWindows) {
  stroke(0, 0, 0);
  noFill();

  // things should be symmetric
  // they can also be multiply-defined
  // fireEscapeLayer(fireW, h, fireX, y, index);

  if (windowStyle) {
    symmetricWindowSeries(
      numberOfWindows,
      windowStyle, //   windowType = panelPane
      getRandomIntInclusive(lowerBoundWindowWidth, 64), //   windowWidth
      buildingX, //   x
      y + 10, /* - (10 * scaleWeight) */ //   y
      buildingX
    );
  }

  if (DEBUG) {
    // center line
    stroke(0, 124, 69);
    line(buildingX, y, buildingX, storyHeight);
    const c = color(255, 255, 255);
    fill(c);
    stroke(0, 0, 0);
  }
}
