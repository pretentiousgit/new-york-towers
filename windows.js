
let img; // Declare variable 'img'.
let acCount = 0;

function genVerticalWindowWidths() {
  return getRandomIntInclusive(buildingWidth / 8, buildingWidth / 3);
}



function airConditioner(x, y, windowHeight) {
  // probably air conditioners need to calculate their own position
  // based on the height of the window they find themselves in;

  const w = lowerBoundWindowWidth;
  const xCorrect = x - lowerBoundWindowWidth/2;
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

function symmetricWindowSeries(
  quantity,
  windowType = panelPane,
  windowWidth,
  x,
  y
) {
  // const quantity = 5;
  let internalX = x;
  const ac = getRandomIntInclusive(0, quantity);
  acCount = 0;

  console.log('windowType', windowType.name);

  // const panelsInWindows = getRandomIntInclusive(1, 3);
  const panelsInWindows = 1;
  const pairs = (!isEven(quantity)) ?
    (quantity - 1) / 2 :
    quantity / 2;

  if (!isEven(quantity)) {
    const centerLine = x + buildingWidth/2;
    //   const interval = buildingWidth/quantity;
    //   const centerPane = ((interval - windowWidth)/2);

    //   const arrangementOptions = [
    //     {
    //       name: 'symmetric',
    //       x1: (centerLine - buildingWidth/2 + (interval*i+1)) + ((interval - windowWidth)/2),
    //       x2: (centerLine + (interval*i) + centerPane)
    //     }
    //   ];

    internalX = centerLine - windowWidth / 2;
    verticalPaneDef(panelsInWindows, windowType, internalX, y, windowWidth, ac);


    for (let i = 0; i < pairs; i += 1) {
      const originDistance = (buildingWidth / quantity);

      const xL = x - windowWidth / 2 - originDistance * (i + 1);
      const xR = x + (originDistance * (i + 1) - windowWidth / 2);

      verticalPaneDef(panelsInWindows, windowType, xL, y, windowWidth, ac);
      verticalPaneDef(panelsInWindows, windowType, xR, y, windowWidth, ac);

      const randoConditioner = getRandomIntInclusive(0, 1);
      const windowX = randoConditioner === 0 ? xR : xL;

    }
  } else {
    for (let i = 0; i < pairs; i += 1) {
      // in non-centered symmetric pairs, elements should
      // elements should space themselves evenly across the width of the building
      const centerLine = x + buildingWidth/2;
      const interval = buildingWidth / quantity;
      const centerPane = ((interval - windowWidth) / 2);

      const arrangementOptions = [
        {
          name: 'symmetric',
          x1: (centerLine - buildingWidth / 2 + (interval * i + 1)) + ((interval - windowWidth) / 2),
          x2: (centerLine + (interval * i) + centerPane)
        }
      ]

      if (DEBUG) {
        // /* DEBUGGING */
        stroke(255, 128, 0);
        rect(centerLine, y, 1, 100); // debug line

        stroke(255, 128, 128);
        rect(xL, y, interval, 40); // window mock outline
        rect(xL + interval / 2, y, 1, 100); // debug line
        stroke(128, 255, 255);
        rect(xR, y, interval, 40); // window mock outline

        stroke(128, 255, 0);
        rect(xL + ((interval - windowWidth) / 2), y, windowWidth, 40); // window mock outline

        stroke(255, 255, 0);
        rect(xR, y, windowWidth, 40); // window mock outline
        stroke(0, 0, 0);
        /* END DEBUGGING */
      }

      const arO = arrangementOptions;
      const { x1, x2 } = arO[getRandomIntInclusive(0, arO.length - 1)];

      verticalPaneDef(panelsInWindows, windowType, x1, y, windowWidth, ac);
      verticalPaneDef(panelsInWindows, windowType, x2, y, windowWidth, ac);
    }
  }
}
function verticalPaneDef(number, element, ...etc) {
  /* width is defined per window panel in the group */
  /* currently, this defines all windows in a symmetric set as being the same width */

  const x = etc[0];
  const y = etc[1];
  const w = etc[2];
  const ac = etc[3];

  const isThereAC = getRandomIntInclusive(0, 1) == 1 ?
    Boolean(ac > 0 && acCount < ac) :
    false;

  if (isThereAC) {
    // air conditioners should draw themselves around a midpoint
    // air conditioners need a height not a width.
    // basically a window's height, width, and panelling 
    // plus whether it has an ac or not
    // needs to be internal to that window.
    acCount += 1;
  }

  // this is whether we have even or odd panel numbers in one window
  // not whether we have even or odd panels at all.
  if (isEven(number)) {
    // if we have an even number of panels, 
    // panels should emerge left and right around the center of X
    // for (let i = 0; i < number; i += 1) {
    //   if (!isEven(i)) {
    //     element(w, x - ((w * i) - w), y);
    //   } else {
    //     element(w, x + ((w * i) - w), y);
    //   }
    // }
  } else {
    // else the first panel should be centered
    // and subsequent panels should be to the left and right of the first one
    for (let i = 1; i <= number; i += 1) {
      if (i == 1) {
        // center first element of an odd series over x
        element(w, x, y, isThereAC);
        if (DEBUG) {
          stroke(255, 255, 0);
          rect(x, y, 1, 40);
          stroke(0, 0, 0);
        }
        // nb here
      } else if (isEven(i)) { // alternate left and right even/odd remainder
        element(w, x - (w + w / 2), y, isThereAC);
      } else {
        element(w, x + (w + w / 2) - w, y, isThereAC);
      }
    }
  }
}

function panelPane(w, x = 10, y = 10, ac = Boolean(false), cols = 3, rows = 3) {
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

  if (ac) {
    airConditioner(x2 + (w2/2), y2, h2);
  }

  // return information about pane?
  return {
    topL: [pane[0][0].outer.x, pane[0][0].outer.y],
    bottomR: [pane[2][2].outer.x, pane[2][2].outer.y],
    h: h1,
    w: w1,
  }
}

function twoPane(fn, w, x, y) {
  const openAmount = getRandomIntInclusive(1, 100) / 100;
  fn(w, x, y);
  fn(w, x, y + h);
}

function squarePaneWindow(w, x = 10, y = 10, ac = Boolean(false)) {
  
  const width = ((w * 2) >= storyHeight - 10) ? 48 : w;
  const numbers = framedPanel(width, x, y, width * 2);

  const { outer, inner } = numbers;
  rect(outer.x, outer.y, outer.w, outer.h); //outer 
  rect(inner.x, inner.y, inner.w, inner.h); //outer 
  rect(inner.x, inner.y + inner.h / 2, inner.w, 2)
  
  if (ac) {
    airConditioner(inner.x + (inner.w/2), inner.y, inner.h);
  }
}

function twoPaneWindow(w, x = 10, y = 10, ac = Boolean(false)) {
  const numbers = basicGoldenRectangle(w, x, y);
  const { outer, inner } = numbers;

  rect(outer.x, outer.y, outer.w, outer.h); //outer 
  rect(inner.x, inner.y, inner.w, inner.h); //outer 
  rect(inner.x, inner.y + (inner.h / 2), inner.w, 2);

  if (ac) {
    airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
  }
}

function onePaneWindow(w, x, y, ac = Boolean(false)) {
  const numbers = basicGoldenRectangle(w, x, y);
  const { outer, inner } = numbers;

  rect(outer.x, outer.y, outer.w, outer.h); //outer 
  rect(inner.x, inner.y, inner.w, inner.h); //outer
  if (ac) {
    airConditioner(inner.x + (inner.w / 2), inner.y, inner.h);
  }
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