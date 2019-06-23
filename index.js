/* 
  todo:
  -- we're working on window repetition

*/

let y = 100; // animated line

const canvas = [960, 940]
const stories = 8;

const buildingWidth = canvas[0] / 2;
const storyHeight = canvas[1] / stories;
const margin = (canvas[0] - buildingWidth) / 2; // center the building

const buildingOrigin = [margin, canvas[1] - (storyHeight - 20)];
// const buildingOrigin = [margin, canvas[1] - (storyHeight - 20)];

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

  /* Test rectangle for full canvas size onscreen */
  // fill(0, 124, 124);
  // rect(0, 0, canvas[0],canvas[1]);
  // noFill();

  const fireW = getRandomIntInclusive(buildingWidth/3.1415, buildingWidth/1.618);
  const fireX = getRandomIntInclusive(buildingWidth/3.1415, buildingWidth + fireW);

  for (let i = 0; i < stories; i += 1) {
    const marginLeft = margin;
    const marginTop = y * i;

    /* reference boxes 1 */
    const lineY = storyHeight * i;

    fill(0, 0, 0);
    line(0, lineY, buildingWidth * 2, lineY);
    rect(0, lineY, 30, 5);

    fill(128, 0, 0);
    rect(buildingWidth * 2, lineY + storyHeight, -30, -5);
    /* end reference boxes */

    basicStory(
      fireW,
      storyHeight,
      buildingOrigin[0],
      lineY,
      fireX
    );
  }
}

function basicStory(fireW = buildingWidth, h = storyHeight, x, y, fireX, scaleWeight) {
  stroke(0, 0, 0);
  noFill();
  const window = getRandomIntInclusive(0, panelStyles.length - 1);

  // things should be symmetric
  // they can also be multiply-defined
  fireEscapeLayer(fireW, h, fireX, y);

  symmetricWindowSeries(
    getRandomIntInclusive(2, 5), // quantity
    panelStyles[window], //   windowType = panelPane
    getRandomIntInclusive(32, 48), //   windowWidth
    margin + buildingWidth / 2, //   x
    y + 10 /* - (10 * scaleWeight) */ //   y
  );

  // center line
  stroke(0, 124, 69);
  // line(margin + buildingWidth / 2, y, margin + buildingWidth / 2, storyHeight);
  let c = color(255, 255, 255);
  fill(c);
  stroke(0, 0, 0);
}

function fireEscapeLayer(w = buildingWidth / 2, h = storyHeight, x = buildingWidth / 2, y = storyHeight) {
  stroke(0, 0, 0);
  noFill();

  const levelBottom = y + h;
  const levelTop = y;
  const railStart = x + w / 4;
  const railEnd = w + x - w / 4;

  // Platform
  rect(x - 2, levelBottom - h / 3, w + 4, 2);
  const numberOfSupports = 18;
  for (let i = 0; i <= numberOfSupports; i += 1) {
    line(x + (w / numberOfSupports * i), levelBottom, x + (w / numberOfSupports * i), levelBottom - h / 3)
  }

  // bottom level
  rect(x, levelBottom - 5, w, 5);
  rect(x, levelBottom - 7, w, 5);


  /* // Rails */
  const railSupports = 9;
  for (let i = 1; i <= railSupports; i += 1) {
    const rise = levelBottom + 15 - ((h + 14) / railSupports) * i;
    const run = railStart + ((railEnd - railStart) / railSupports * i);

    line(run, rise, run, rise - h / 3)
    rect(run - 7, rise - 12, 7, 3);
  }

  stroke(255, 0, 0);
  line(railStart, levelBottom, railEnd - 10, levelTop)
  
  stroke(0, 124, 124);
  line(railStart + 10, levelBottom, railEnd, levelTop)
  
  stroke(150, 0, 150);
  line(railStart, levelBottom - 15  - h / 14, railEnd, levelTop - h/3)
  line(railStart, levelBottom - 19  - h / 14, railEnd, levelTop - h/3 - 4)

  // /* // Circles at the end of rails */
  fill(255, 255, 255);
  circle(railStart, levelBottom - 22, 9)
  circle(railStart, levelBottom - 22, 5)
  
  circle(railEnd, levelTop - 38, 9)
  circle(railEnd, levelTop - 38, 5)
  
  stroke(0, 0, 0);
  noFill();
}