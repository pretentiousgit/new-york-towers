let y = 100; // animated line

const canvas = [960, 600];
const stories = 4;

const buildingWidth = canvas[0] / 2;
const storyHeight = canvasH / stories;
const storyBlock = [buildingWidth, storyHeight];

const margin = (canvasW - buildingWidth) / 2; // center the building

const buildingOrigin = [margin, canvasH - (storyHeight + 10)];

function setup() {
  createCanvas(...canvas); // createCanvas must be the first statement

  stroke(0); // Set line drawing color to white

  frameRate(2);
  // noLoop();
  // TODO: Implement a pause button in the drawing function
}

function draw() {
  background(255); // Set the background to black
  y -= 1;
  if (y < 0) {
    y = height;
  }
  line(0, y, width, y);

  basicStory();
}

function basicStory(o = buildingOrigin, size = storyBlock) {
  const baseBlock = rect(...o, ...size);

  // symmetricSeries(getRandomIntInclusive(1, 7), airConditioner, airConditionerNumbers );
  // symmetricSeries(7);

  windowArch();

  const c = color(255, 255, 255);
  fill(c);
  baseBlock;
}

function windowArch() {
  // draw an arch with equivalent start and end x/y
  const initialWidth = 120;
  const initialHeight = 80;

  noFill();
  stroke(0, 0, 5);
  const startEndY = 5;
  const height = startEndY * 2;

  const x1 = 5;
  const x2 = x1 + height / 2;

  curve(x1, startEndY, x1, height, x2, height, x2, startEndY);
}

function symmetricSeries(
  quantity = 5,
  element,
  style,
  rgb = color(241, 170, 100)
) {
  originX = margin + buildingWidth / 2,
  // columns are symmetric in pairs
  // columns can come in odd numbers, in which case they are symmetric around the middle column

  fill(rgb);

  const pairs = (!isEven(quantity))
    ? (quantity - 1) / 2
    : quantity / 2;

  if (!isEven(quantity)) {
    // odd number - draw symmetric from the inside out with 1 at middle
    element(style, originX);
  }

  for (let i = 0; i < pairs; i += 1) {
    const originDistance = (buildingWidth / quantity);
    const x1 = originX + originDistance * (i + 1);
    const x2 = originX - originDistance * (i + 1);
    element(style, x1);
    element(style, x2);
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
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

function isEven(someNumber) {
  return (someNumber % 2 == 0);
}
