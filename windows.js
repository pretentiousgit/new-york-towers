
function genVerticalWindowWidths() {
  return getRandomIntInclusive(buildingWidth / 8, buildingWidth / 3);
}

function symmetricWindowSeries(
  quantity,
  windowType = panelPane,
  windowWidth,
  x,
  y
) {
  // const panelsInWindows = 3;
  const panelsInWindows = getRandomIntInclusive(1, 3);
  const pairs = (!isEven(quantity)) ?
    (quantity - 1) / 2 :
    quantity / 2;

  if (!isEven(quantity)) {
    verticalPaneDef(panelsInWindows, windowType, x, y, windowWidth);
  }
  for (let i = 0; i < pairs; i += 1) {
    const originDistance = (buildingWidth / quantity);
    const x1 = x + originDistance * (i + 1);
    const x2 = x - originDistance * (i + 1);
    verticalPaneDef(panelsInWindows, windowType, x1, y, windowWidth);
    verticalPaneDef(panelsInWindows, windowType, x2, y, windowWidth);
  }
}

function verticalPaneDef(number, element, ...etc) {
  /* width is defined per window panel in the group */
  /* currently, this defines all windows in a symmetric set as being the same width */

  console.log('check etc', etc)
  const x = etc[0];
  const y = etc[1];
  const w = etc[2];

  if (isEven(number)) {
    // if we have an even number of panels, 
    // panels should emerge left and right around the center of X
    for (let i = 0; i < number; i += 1) {
      if (!isEven(i)) {
        element(w, x - ((w * i) - w), y);
        console.log('check x1', x, w, w * i, i)
      } else {
        element(w, x + ((w * i) - w), y);
        console.log('check x2', x, w, w * i, i)
      }
    }
  } else {
    // else the first panel should be centered
    // and subsequent panels should be to the left and right of the first one
    for (let i = 1; i <= number; i += 1) {
      if (i == 1) { // center first element of an odd series
        element(w, x - (w / 2), y);
      } else if (isEven(i)) { // alternate left and right even/odd remainder
        element(w, x - (w + w / 2), y);
      } else {
        element(w, x + (w + w / 2) - w, y);
      }
    }
  }
}

function panelPane(w, x = 10, y = 10, cols = 3, rows = 3) {
  let pane = matrix(cols, rows);

  noFill();
  // frame 
  let frame = basicGoldenRectangle(w, x, y);
  const { x: x1, y: y1, w: w1, h: h1 } = frame.outer;
  const { x: x2, y: y2, w: w2, h: h2 } = frame.inner;
  rect(x1, y1, w1, h1);
  rect(x2, y2, w2, h2);

  // inject panels
  let numbers = basicGoldenRectangle(w / cols);
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      let posX = x + ((numbers.outer.w) * i);
      let posY = y + ((numbers.outer.h) * j);

      numbers = basicGoldenRectangle(w / cols, posX, posY);
      const { x: x1, y: y1, w: w1, h: h1 } = numbers.outer;
      const { x: x2, y: y2, w: w2, h: h2 } = numbers.inner;
      rect(x1, y1, w1, h1);
      rect(x2, y2, w2, h2);
      pane[i][j] = numbers;
    }
  }

  // return information about pane?
  return {
    topL: [pane[0][0].outer.x, pane[0][0].outer.y],
    bottomR: [pane[2][2].outer.x, pane[2][2].outer.y]
  }
}

function twoPane(fn, w, x, y) {
  const openAmount = getRandomIntInclusive(1, 100) / 100;
  fn(w, x, y);
  console.log('bottom y', openAmount);
  fn(w, x, y + h);
}

function squarePaneWindow(w, x = 10, y = 10) {
  const numbers = framedPanel(w, x, y, w);
  const { outer, inner } = numbers;

  const lower = framedPanel(w, x, outer.h + y, w);
  const { outer: l_outer, inner: l_inner } = lower;

  rect(outer.x, outer.y, outer.w, outer.h); //outer 
  rect(inner.x, inner.y, inner.w, inner.h); //outer 
  rect(l_outer.x, l_outer.y, l_outer.w, l_outer.h); //outer 
  rect(l_inner.x, l_inner.y, l_inner.w, l_inner.h); //outer 
}

function onePaneWindow(w, x, y) {
  const numbers = basicGoldenRectangle(w, x, y);
  const { outer, inner } = numbers;

  rect(outer.x, outer.y, outer.w, outer.h); //outer 
  rect(inner.x, inner.y, inner.w, inner.h); //outer 
}

function framedPanel(w, x, y, h) {
  const innerPaneScale = 0.98;
  const paneDiff = (1 - innerPaneScale) / 2;

  const outer = { x, y, w, h };
  const inner = {
    x: x + w / 2 * 0.02,
    y: y + h / 2 * 0.02,
    w: w * innerPaneScale,
    h: h * innerPaneScale
  };

  return {
    outer, inner
  }
}

function basicGoldenRectangle(w, x = 10, y = 10) {
  const bits = goldenRatio(w);
  const innerPaneScale = 0.95;
  const paneDiff = (1 - innerPaneScale) / 2;

  const outer = { x, y, w: bits.a, h: bits.c };
  const inner = {
    x: x + bits.a / 2 * paneDiff,
    y: y + bits.c / 2 * paneDiff,
    w: bits.a * innerPaneScale,
    h: bits.c * innerPaneScale
  };

  return {
    outer, inner
  }
}