const DEBUG = false;
let y = 100; // animated line

const canvas = [3200, 940]
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
  createCanvas(...canvas, SVG);   // createCanvas must be the first statement

  stroke(0); // Set line drawing color to white

  img = loadImage('images/airConditioner2.svg'); // Load the image

  frameRate(2);
  noLoop();
  // TODO: Implement a pause button in the drawing function
}

function draw() {
  background(255); // Set the background to black

  if (DEBUG) {
    /* Test rectangle for full canvas size onscreen */
    fill(0, 124, 124);
    rect(0, 0, canvas[0], canvas[1]);
    noFill();
  }

  if (DEBUG) {
    /* Test rectangle for building size onscreen */
    fill(255, 255, 255);
  }
  rect(margin, 0, buildingWidth, canvas[1]);



  console.log('check number of buildings', numberOfBuildings);
  for (let i = 0; i < 3; i += 1) {
    const buildingOrigin = [margin + ((margin + buildingWidth) * i), canvas[1] - (storyHeight - 20)];
    fill(127 * i, 125, 48);
    rect(buildingOrigin[0], 0, 470, 960);

    const windowStyle = panelStyles[getRandomIntInclusive(0, panelStyles.length - 1)];
    const fireW = getRandomIntInclusive(buildingWidth / 3.1415, buildingWidth / 1.618);
    const fireX = getRandomIntInclusive(buildingOrigin[0], buildingOrigin[0] + (buildingWidth - fireW));


    for (let i = 0; i < stories; i += 1) {
      const height = (i == 7) ? storyHeight * 1.5 : storyHeight;
      const windows = (i == 6) ? undefined : windowStyle;
      const numberOfWindows = getRandomIntInclusive(2, 5);
      const lineY = height * i;
      
      fireEscapeLayer(fireW, height, fireX, lineY, i);
      console.log(i);
      basicStory(
        fireW,
        height,
        buildingOrigin[0],
        lineY,
        fireX,
        windows,
        numberOfWindows,
        i
      );
    }
  }
  // for (let i = 0; i < stories; i += 1) {
  //   const marginLeft = margin;
  //   const marginTop = y * i;

  //   // nb: this is weird, those numbers should be the same. implies a story is drawing off-screen
  //   const height = (i == 7) ? storyHeight * 1.5 : storyHeight;
  //   const windows = (i == 6) ? undefined : windowStyle;
  //   const numberOfWindows = getRandomIntInclusive(2, 5);
  //   const lineY = height * i;

  //   if (DEBUG) {
  //     /* reference boxes 1 */
  //     fill(0, 0, 0);
  //     line(0, lineY, buildingWidth * 2, lineY);
  //     rect(0, lineY, 30, 5);

  //     fill(128, 0, 0);
  //     rect(buildingWidth * 2, lineY + height, -30, -5);
  //     /* end reference boxes */
  //   }

  //   basicStory(
  //     fireW,
  //     height,
  //     buildingOrigin[0],
  //     lineY,
  //     fireX,
  //     windows,
  //     numberOfWindows,
  //     i
  //   );
  // }
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

function basicStory(fireW = buildingWidth, h = storyHeight, buildingX, y, fireX, windowStyle, numberOfWindows, index, scaleWeight) {
  console.log('basicStoryX', buildingX);
  stroke(0, 0, 0);
  noFill();

  // things should be symmetric
  // they can also be multiply-defined
  // fireEscapeLayer(fireW, h, fireX, y, index);

  if (windowStyle) {
    symmetricWindowSeries(
      numberOfWindows,
      windowStyle, //   windowType = panelPane
      getRandomIntInclusive(lowerBoundWindowWidth, 64), //   windowWidth
      buildingX, //   x
      y + 10, /* - (10 * scaleWeight) */ //   y
    );
  }

  if (DEBUG) {
    // center line
    stroke(0, 124, 69);
    line(buildingX, y, buildingX, storyHeight);
    let c = color(255, 255, 255);
    fill(c);
    stroke(0, 0, 0);
  }
}

function fireEscapeLayer(w = buildingWidth / 2, h = storyHeight, x = buildingWidth / 2, y = storyHeight, index) {
  stroke(0, 0, 0);
  noFill();

  let fireEscapeX = x;
  // if(fireEscapeX + w > ((buildingWidth + margin) * index+1)) {
  //   fireEscapeX = x - w;
  // } else if (fireEscapeX < ((buildingWidth + margin) * index+1)) {
  //   // fireEscapeX = ((buildingWidth + margin) * index+1);
  // }

  const levelBottom = y + h;
  const levelTop = y;
  const railStart = fireEscapeX + w / 4;
  const railEnd = w + fireEscapeX - w / 4;
  
  // Platform

  // bottom level
  const platX = fireEscapeX;
  const platY = levelBottom - 5;
  const platW = w;
  rect(platX, platY, platW, 5);
  rect(platX, platY - 2, platW, 5);

  // handrails
  rect(fireEscapeX - 2, levelBottom - h / 3, w + 4, 2);

  const numberOfSupports = 18;
  const isItCurvy = Boolean(getRandomIntInclusive(0, 1) == 0);
  for (let i = 0; i <= numberOfSupports; i += 1) {
    line(fireEscapeX + (w / numberOfSupports * i), levelBottom, fireEscapeX + (w / numberOfSupports * i), levelBottom - h / 3)

    if (isItCurvy) {
      if (i == 1) {
        bezier(fireEscapeX, levelBottom, fireEscapeX - 10, levelBottom - 6, fireEscapeX - 4, levelBottom - 12, fireEscapeX, levelBottom - h / 3);
      }
      if (i == numberOfSupports) {
        const baseX = fireEscapeX + w;
        bezier(baseX, levelBottom, baseX + 10, levelBottom - 6, baseX + 4, levelBottom - 12, baseX, levelBottom - h / 3);
      }
      if (i == 9) {
        const baseX = fireEscapeX + (w / numberOfSupports * 9);
        bezier(baseX, levelBottom, baseX - 10, levelBottom - 6, baseX - 4, levelBottom - 12, baseX, levelBottom - h / 3);
      }
      if (i == 10) {
        const baseX = fireEscapeX + (w / numberOfSupports * 10);
        bezier(baseX, levelBottom, baseX + 10, levelBottom - 6, baseX + 4, levelBottom - 12, baseX, levelBottom - h / 3);
      }
    }
  }

  // Ladder
  let ladderX = (getRandomIntInclusive(0, 1) == 0) ? platX : platX + platW - 12;
  let ladderY = levelBottom - 15;
  let ladderExtend = getRandomIntInclusive(-65, 30);

  if (index == 6) {
    /* Rails */
    rect(ladderX - 2, ladderY + ladderExtend, 1, 55);
    rect(ladderX + 10, ladderY + ladderExtend, 1, 55);
    rect(ladderX, ladderY, 2, 45);
    rect(ladderX + 8, ladderY, 2, 45);
    for (let i = 0; i <= 7; i += 1) {
      rect(ladderX, ladderY + (5 * i) + 5, 12, 0.5)
    }

    /* Rungs */
    for (let i = 0; i <= 8; i += 1) {
      rect(ladderX, ladderY + ladderExtend + (5 * i) + 5, 12, 0.5)
    }
  }

  /* // Rails for stairs */
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
  line(railStart, levelBottom - 15 - h / 14, railEnd, levelTop - h / 3)
  line(railStart, levelBottom - 19 - h / 14, railEnd, levelTop - h / 3 - 4)

  // /* // Circles at the end of rails */
  fill(255, 255, 255);
  circle(railStart, levelBottom - 22, 9)
  circle(railStart, levelBottom - 22, 5)

  circle(railEnd, levelTop - 38, 9)
  circle(railEnd, levelTop - 38, 5)

  stroke(0, 0, 0);
  noFill();
}