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
    getRandomIntInclusive(1, 3),
    // 3,
    panelStyles[window],
    getRandomIntInclusive(32, 48),
    [margin + buildingWidth / 2,
    o[1] - (10 * scaleWeight)]
  );

  // center line
  line(margin + buildingWidth / 2, o[1], margin + buildingWidth / 2, storyHeight);
  let c = color(255, 255, 255);
  fill(c);
  stroke(0, 0, 0);
  // baseBlock;
}