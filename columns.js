let y = 100; // animated line

const canvas = [960, 940]
const stories = 8;

const buildingWidth = canvas[0] / 2;
const storyHeight = (canvas[1] - 40) / stories;
// const colWidth = 
const storyBlock = [buildingWidth, storyHeight];

const margin = (canvas[0] - buildingWidth) / 2; // center the building

const buildingOrigin = [margin, canvas[1] - (storyHeight - 20)];


function setup() {
  createCanvas(...canvas);   // createCanvas must be the first statement

  stroke(0); // Set line drawing color to white

  frameRate(2);
  noLoop();
  // TODO: Implement a pause button in the drawing function
}

function draw() {
  background(255); // Set the background to black
  // onePaneWindow(150);
  panelPane(150);
  // for (let i = 0; i < stories; i += 1) {
  //   const y = i > 0 ?
  //     buildingOrigin[1] - (storyHeight * i + 2) :
  //     buildingOrigin[1];

  //   basicStory([margin, y], storyBlock, i + 1);
  // }
}

function basicStory(o = buildingOrigin, size = storyBlock, scaleWeight) {
  symmetricSeries(
    [
      margin + buildingWidth / 2,
      o[1] - (10 * scaleWeight)
    ],
    getRandomIntInclusive(1, 7)
  );
  // symmetricSeries(7);

  let c = color(255, 255, 255);
  fill(c);
  stroke(0, 0, 0);
  // baseBlock;
}

function panelPane(w, x = 10, y = 10, cols = 3, rows =3) {
  // let pane = [[0, 0]];
  noFill();
  // frame 
  let frame = basicGoldenRectangle(w);
  const {x: x1, y: y1, w: w1, h: h1} = frame.outer;
  const {x: x2, y: y2, w: w2, h: h2} = frame.inner;
  rect(x1, y1, w1, h1);
  rect(x2, y2, w2, h2);

  // inject panels
  let numbers = basicGoldenRectangle(w/cols);
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      let posX = x + ((numbers.outer.w) * i);
      let posY = y + ((numbers.outer.h) * j);

      numbers = basicGoldenRectangle(w / cols, posX, posY);
      const {x: x1, y: y1, w: w1, h: h1} = numbers.outer;
      const {x: x2, y: y2, w: w2, h: h2} = numbers.inner;
      rect(x1, y1, w1, h1);
      rect(x2, y2, w2, h2);
      // pane[i][j] = numbers;
    }
  }

  
  // return information about pane?
  // return {
  //   topL: [pane[0][0].outer.x, pane[0][0].outer.y],
  //   bottomR: [pane[3][2].outer.x, pane[0][0].outer.y]
  // }
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
  console.log('paneDiff', paneDiff);
  
  const outer = {x, y, w: bits.a, h: bits.c };
  const inner = {
    x: x + bits.a/2 * paneDiff,
    y: y + bits.c/2 * paneDiff,
    w: bits.a * innerPaneScale,
    h: bits.c * innerPaneScale
  };

  return {
    outer, inner
  }
}

function column(n, x, y) {
  // console.log('draw a column', n, x);

  // middle
  let c = color(241, 170, 100);
  fill(c);
  rect(x - n.middleWidth / 2, y, n.middleWidth, n.middleHeight);

  // capital
  c = color(63, 191, 191);
  fill(c);
  // rect(x - n.footWidth / 2, n.y + n.middleHeight - (n.footHeight * 2), n.footWidth, n.footHeight);
  rect(x - n.capWidth / 2, y, n.capWidth, n.capHeight);

  // foot
  c = color(191, 63, 127);
  fill(c);
  rect(x - n.footWidth / 2, y + n.middleHeight - n.footHeight, n.footWidth, n.footHeight);
}

function genColumnNumbers(width) {
  // basic would be 32 id a building is 4x, so get number of stories and multiply
  // these should be skinnier and proportionate to a building story, which is between 10 and 14 ft.
  const baseMin = 32 / stories;
  const baseMax = 24 / stories;

  const middleWidth = getRandomIntInclusive(buildingWidth / 32, buildingWidth / 24);

  const capHeight = getRandomIntInclusive(middleWidth * 0.25, middleWidth * 3.14);
  const capWidth = getRandomIntInclusive(middleWidth * 1.1, middleWidth * 2.09);

  const footHeight = getRandomIntInclusive(middleWidth * 0.25, middleWidth * 3.14);
  const footWidth = getRandomIntInclusive(capWidth * 0.78, capWidth * 1.09);


  return {
    middleWidth,
    middleHeight: storyHeight,
    capHeight,
    capWidth,
    footHeight,
    footWidth
  }
}

function symmetricSeries(
  origin = [
    margin + buildingWidth / 2,
    buildingOrigin[1]
  ],
  quantity = 5,
  element = column,
  style = genColumnNumbers(buildingWidth / 5),
  rgb = color(241, 170, 100)) {
  fill(rgb);

  // columns are symmetric in pairs
  // columns can come in odd numbers, in which case they are symmetric around the middle column

  const pairs = (!isEven(quantity)) ?
    (quantity - 1) / 2 :
    quantity / 2;

  if (!isEven(quantity)) {
    // odd number - draw symmetric from the inside out with 1 at middle
    element(style, ...origin);
  }

  for (let i = 0; i < pairs; i += 1) {
    const originDistance = (buildingWidth / quantity);
    const x1 = origin[0] + originDistance * (i + 1);
    const x2 = origin[0] - originDistance * (i + 1);
    element(style, x1, origin[1]);
    element(style, x2, origin[1]);
  }
}

function range(num) {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    arr.push(0);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function isEven(someNumber) {
  return (someNumber % 2 == 0) ? true : false;
};

function goldenRatio(number) {
  return {
    a: number,
    b: number * 0.618,
    c: number * 1.618
  }
}