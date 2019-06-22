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

  for (let i = 0; i < 2; i += 1) {
    fireEscapeLayer(
      buildingWidth / 2,
      storyHeight
    );
  }
  // rotate(-60);
  // symmetricWindowSeries(
  //   getRandomIntInclusive(1, 3),
  //   // 3,
  //   panelStyles[window],
  //   getRandomIntInclusive(32, 48),
  //   [margin + buildingWidth / 2,
  //   o[1] - (10 * scaleWeight)]
  // );

  // center line
  line(margin + buildingWidth / 2, o[1], margin + buildingWidth / 2, storyHeight);
  let c = color(255, 255, 255);
  fill(c);
  stroke(0, 0, 0);
  // baseBlock;
}

function fireEscapeLayer(w = buildingWidth / 2, h = storyHeight, x = buildingWidth / 2, y = storyHeight * 2.5) {
  stroke(0, 0, 0);
  noFill();
  const railStart = x + w / 5;
  const railEnd = w + x - w / 5;
  line(railStart, y, railEnd, h)

  stroke(0, 124, 124);
  line(railStart + 10, y, railEnd, h + 10)

  stroke(0, 124, 0);
  line(railStart, y - 15, railEnd, h - 15) // center line
  stroke(0, 0, 0);

  line(railStart, y - 22, railEnd, h - 22)

  fill(255,255,255);
  circle(railStart, y - 20, 5)
  noFill();
  circle(railStart, y - 20, 9)
  fill(255,255,255);
  circle(railEnd, h - 18, 9)
  circle(railEnd, h - 18, 5)
  noFill();
  
  rect(x, y - h / 3, w, h / 3);

  const railSupports = 9;
  for (let i = 1; i <= railSupports; i += 1) {
    const rise = (x) => y + 15 - ((h + 56) / railSupports) * x;
    const run = railStart + ((railEnd - railStart) / railSupports * i);
    line(run, rise(i), run, rise(i) - h / 3)
    rect(run - 7, rise(i) - 12, 7, 3);
  }

  const numberOfSupports = 18;
  for (let i = 0; i < numberOfSupports; i += 1) {
    line(x + (w / numberOfSupports * i), y, x + (w / numberOfSupports * i), y - h / 3)
  }

  // bottom level
  rect(x, y, w, 5);
  rect(x, y + 2, w, 5);

  stroke(128, 0, 0);
  rect(x, y, buildingWidth, storyHeight);
}