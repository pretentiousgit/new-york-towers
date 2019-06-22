function symmetricWindowSeries(
  quantity,
  window = panelPane,
  width,
  origin = [
    margin + buildingWidth / 2,
    buildingOrigin[1]
  ],
) {
  const pairs = (!isEven(quantity)) ?
    (quantity - 1) / 2 :
    quantity / 2;

  if (!isEven(quantity)) {
    window(width, ...origin);
  } 
  for (let i = 0; i < pairs; i += 1) {
    const originDistance = (buildingWidth / quantity);
    const x1 = origin[0] + originDistance * (i + 1);
    const x2 = origin[0] - originDistance * (i + 1);
    window(width, x1, origin[1]);
    window(width, x2, origin[1]);
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

function onePaneWindow(w, x, y) {
  const numbers = basicGoldenRectangle(w, x, y);

  rect(...numbers.outer);
  rect(...numbers.inner);
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