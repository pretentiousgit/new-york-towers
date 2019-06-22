/* 
  todo:
  -- we're working on window repetition

*/

let y = 100; // animated line

const canvas = [960, 940]
const stories = 8;

const buildingWidth = canvas[0] / 2;
const storyHeight = (canvas[1] - 40) / stories;
// const colWidth = 
const storyBlock = [buildingWidth, storyHeight];

const margin = (canvas[0] - buildingWidth) / 2; // center the building

const buildingOrigin = [margin, canvas[1] - (storyHeight - 20)];

const panelStyles = [panelPane, onePaneWindow, squarePaneWindow];

function setup() {
  createCanvas(...canvas);   // createCanvas must be the first statement

  stroke(0); // Set line drawing color to white

  frameRate(2);
  // noLoop();
  // TODO: Implement a pause button in the drawing function
}

function draw() {
  background(255); // Set the background to black

  for (let i = 0; i < stories; i += 1) {
    const y = i > 0 ?
      buildingOrigin[1] - (storyHeight * i + 2) :
      buildingOrigin[1];

    basicStory([margin, y], storyBlock, i + 1);
  }
  // basicStory([margin, y], storyBlock, 1);
}

function basicStory(o = buildingOrigin, size = storyBlock, scaleWeight) {
  stroke(0, 0, 0);
  noFill();
  const window = getRandomIntInclusive(0, panelStyles.length);

  // things should be symmetric
  // they can also be multiply-defined
  
  symmetricWindowSeries(
    // getRandomIntInclusive(0, 7),
    3,
    panelStyles[window],
    getRandomIntInclusive(32, 48),
    [margin + buildingWidth / 2,
    o[1] - (10 * scaleWeight)]
  );

  let c = color(255, 255, 255);
  fill(c);
  stroke(0, 0, 0);
  // baseBlock;
}

function genVerticalWindowWidths() {
  return getRandomIntInclusive(buildingWidth / 8, buildingWidth / 3);
}

function symmetricWindowSeries(
  quantity,
  windowType = panelPane,
  windowWidth,
  origin = [
    margin + buildingWidth / 2,
    buildingOrigin[1]
  ],
) {

  const panelsInWindows = 3;
  // const panelsInWindows = getRandomIntInclusive(1, 3);
  const pairs = (!isEven(quantity)) ?
    (quantity - 1) / 2 :
    quantity / 2;

  if (!isEven(quantity)) {
    verticalPaneDef(panelsInWindows, windowType, ...origin, windowWidth);
    // windowType(width, ...origin);
  }
  for (let i = 0; i < pairs; i += 1) {
    const originDistance = (buildingWidth / quantity);
    const x1 = origin[0] + originDistance * (i + 1);
    const x2 = origin[0] - originDistance * (i + 1);
    verticalPaneDef(panelsInWindows, windowType, x1, origin[1], windowWidth);
    verticalPaneDef(panelsInWindows, windowType, x2, origin[1], windowWidth);
    // windowType(width, x1, origin[1]);
    // windowType(width, x2, origin[1]);
  }
}

function verticalPaneDef(number, element, ...etc) {
  /* width is defined per window panel in the group */
  /* currently, this defines all windows in a symmetric set as being the same width */

  const x = etc[0];
  const y = etc[1];
  const w = etc[2];

  if (isEven(number)) {
    // if we have an even number of panels, 
    // panels should emerge left and right around the center of X
    for (let i = 1; i <= number; i += 1) {
      if(i === 1) {
        element(w, x - (w/2), y);
      } else if (isEven(i)){
        element(w, x + (i * w), y);
      }
    }
  } else {
    // else the first panel should be centered
    // and subsequent panels should be to the left and right of the first one
    for (let i = 1; i <= number; i += 1) {
      if (i == 1) { // center first element of an odd series
        element(w, x + w/2, y); 
      } else if (isEven(i)) { // alternate left and right even/odd remainder
        element(w, x - (i * w), y);
      } else {
        element(w, x + (i * w), y);
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