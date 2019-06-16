let y = 100; // animated line

const canvas = [960, 600]
const stories = 4;

const buildingWidth = canvas[0] / 2;
const storyHeight = canvas[1] / stories;
const storyBlock = [buildingWidth, storyHeight];

const margin = (canvas[0] - buildingWidth) / 2; // center the building

const buildingOrigin = [margin, canvas[1] - (storyHeight + 10)];


function setup() {
  createCanvas(...canvas);   // createCanvas must be the first statement

  stroke(0); // Set line drawing color to white

  frameRate(2);
  // noLoop();
  // TODO: Implement a pause button in the drawing function
}

function draw() {
  background(255); // Set the background to black
  y = y - 1;
  if (y < 0) {
    y = height;
  }
  line(0, y, width, y);

  basicStory();
}

function basicStory(o = buildingOrigin, size = storyBlock) {
  console.log('add a story', o, size);

  const baseBlock = rect(...o, ...size);

  symmetricSeries(getRandomIntInclusive(1, 7));

  let c = color(255, 255, 255);
  fill(c);
  baseBlock;
}

function symmetricSeries(quantity = 5, originX = margin + buildingWidth / 2, style, rgb) {
  // columns are symmetric in pairs
  // columns can come in odd numbers, in which case they are symmetric around the middle column

  const columnStyle = style || genColumnNumbers(buildingWidth / 5);

  let c = rgb || color(241, 170, 100);
  fill(c);

  const pairs = (!isEven(quantity)) ?
  (quantity - 1) / 2 :
  quantity / 2;

  if(!isEven(quantity)) {
    // odd number - draw columns from the inside out with 1 at middle
   column(columnStyle, originX);
  }

  for (let i = 0; i < quantity; i += 1) {
    const originDistance = (buildingWidth / quantity) * (i + 1);

    const x1 = originX + originDistance;
    const x2 = originX - originDistance;

    column(columnStyle, x1 * i);
    column(columnStyle, x2 * i);
  }
}

function column(n, x) {
  console.log('draw a column', n, x);
  
  // middle
  let c = color(241, 170, 100);
  fill(c);
  rect(x - n.middleWidth / 2, n.y, n.middleWidth, n.middleHeight);

  // capital
  c = color(63, 191, 191);
  fill(c);
  // rect(x - n.footWidth / 2, n.y + n.middleHeight - (n.footHeight * 2), n.footWidth, n.footHeight);
  rect(x - n.capWidth / 2, n.y, n.capWidth, n.capHeight);

  // foot
  c = color(191, 63, 127);
  fill(c);
  rect(x - n.footWidth / 2, n.y + n.middleHeight - n.footHeight, n.footWidth, n.footHeight);
}

function genColumnNumbers(width) {
  const middleWidth = getRandomIntInclusive(buildingWidth / 32, buildingWidth / 24);
  
  const capHeight = getRandomIntInclusive(middleWidth * 0.25, middleWidth * 3.14);
  const capWidth = getRandomIntInclusive(middleWidth, middleWidth * 1.55);
  
  const footHeight = getRandomIntInclusive(middleWidth * 0.25, middleWidth * 3.14);
  const footWidth = getRandomIntInclusive(middleWidth * 1.1, capWidth);


  return {
    y: buildingOrigin[1],
    middleWidth,
    middleHeight: storyHeight,
    capHeight,
    capWidth,
    footHeight,
    footWidth
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