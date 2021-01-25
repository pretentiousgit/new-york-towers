
function airConditioner(x, y, windowHeight) {

    // air conditioners should draw themselves around a midpoint
    // air conditioners need a height not a width.
    // basically a window's height, width, and panelling 
    // plus whether it has an ac or not
    // needs to be internal to that window.

  const w = lowerBoundWindowWidth;
  const xCorrect = x - lowerBoundWindowWidth / 2;
  const baseHeight = w * 0.618;
  const yCorrect = getBool() ? windowHeight + y - baseHeight : y;


  stroke(0, 0, 0);
  fill(255, 255, 255);
  // an a/c is always the same width.x
  rect(xCorrect, yCorrect, w, baseHeight);
  rect(xCorrect + 3, yCorrect + 3, w - 6, (baseHeight) - 6);

  rect(xCorrect + 3, yCorrect + 5, w - 6, (baseHeight) - 10);
  rect(xCorrect + 3, yCorrect + 7, w - 6, (baseHeight) - 14);
  rect(xCorrect + 3, yCorrect + 9, w - 6, (baseHeight) - 18);

  rect(xCorrect + (w / 2) - 4, yCorrect + (baseHeight) - 2, 8, (baseHeight) - 24);
  stroke(0, 0, 0);
  noFill();
}
