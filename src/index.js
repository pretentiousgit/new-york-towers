import {
  panelPane, onePaneWindow, twoPaneWindow, squarePaneWindow
} from './components/windows';

// import panelPane from './components/windows.js';

const DEBUG = false;
const y = 100; // animated line

const canvas = [3200, 940];
const stories = 8;
const buildingWidth = 470;
const storyHeight = canvas[1] / stories;
const margin = 10; // center the building
const lowerBoundWindowWidth = 32;

const numberOfBuildings = Math.floor(canvas[0] / buildingWidth);
// const buildingOrigin = [margin, canvas[1] - (storyHeight - 20)];

const panelStyles = [panelPane, onePaneWindow, twoPaneWindow, squarePaneWindow];
// const panelStyles = [onePaneWindow];

function setup() {
  createCanvas(...canvas); // createCanvas must be the first statement

  stroke(0); // Set line drawing color to white

  img = loadImage('images/airConditioner2.svg'); // Load the image

  frameRate(1);
  // noLoop();
  // TODO: Implement a pause button in the drawing function
}

function draw() {
  background(255); // Set the background to black
  noFill();

  rect(margin, 0, buildingWidth, canvas[1]);

  for (let i = 0; i < numberOfBuildings; i += 1) {
    const buildingOrigin = [margin + ((margin + buildingWidth) * i), canvas[1] - (storyHeight - 20)];
    rect(buildingOrigin[0], 0, 470, 960);

    const windowStyle = panelStyles[getRandomIntInclusive(0, panelStyles.length - 1)];
    const fireW = getRandomIntInclusive(buildingWidth / 3.1415, buildingWidth / 1.618);
    const fireX = getRandomIntInclusive(buildingOrigin[0], buildingOrigin[0] + (buildingWidth - fireW));
    const fireEscapes = getRandomIntInclusive(0, 2);
    const mirrored = getBool();
    const curvy = getBool();

    for (let i = 0; i < stories; i += 1) {
      const height = (i == 7) ? storyHeight * 1.5 : storyHeight;
      const windows = (i == 7) ? undefined : windowStyle;
      const numberOfWindows = getRandomIntInclusive(2, 5);
      const lineY = height * i;

      if (fireEscapes == 1) {
        fireEscapeLayer(fireW, height, fireX, lineY, i, curvy, mirrored);
      }

      if (fireEscapes == 2) {
        const w = fireW / 1.5;
        fireEscapeLayer(w, height, buildingOrigin[0] + 10, lineY, i, curvy, false);
        fireEscapeLayer(w, height, buildingOrigin[0] + (buildingWidth - w), lineY, i, curvy, true);
      }

      basicStory(
        buildingOrigin[0],
        lineY,
        windows,
        numberOfWindows
      );
    }
  }
  // saveAs();
  // stroke(0, 0, 0);
  // for (x = 0; x < 10; x++) {
  //   for (y = 0; y < 10; y++) {
  //     rect(x * 10, y * 10, x, y);
  //   }
  // }
  // save("images/generated/towers.svg");      // give file name
  // print("saved svg");
}
