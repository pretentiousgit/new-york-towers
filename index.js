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

  for (let i = 0; i < stories; i += 1) {
    const marginLeft = margin;
    const marginTop = y * i;
    
    /* reference boxes 1 */
    const lineY =  storyHeight * i;

    fill(0, 0, 0);
    line(0, lineY, buildingWidth * 2, lineY);
    rect(0, lineY, 30, 5);
    
    fill(128, 0, 0);
    rect(buildingWidth * 2, lineY + storyHeight, -30, -5);
    /* end reference boxes */

    basicStory(
      buildingWidth/2,
      storyHeight,
      buildingOrigin[0],
      lineY
    );
  }
}

function basicStory(w=buildingWidth, h=storyHeight, x, y,  scaleWeight) {
  stroke(0, 0, 0);
  noFill();
  const window = getRandomIntInclusive(0, panelStyles.length);

  // things should be symmetric
  // they can also be multiply-defined

  
  fireEscapeLayer( w, h, x, y );
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
  stroke(0, 124, 69);
  // line(margin + buildingWidth / 2, y, margin + buildingWidth / 2, storyHeight);
  let c = color(255, 255, 255);
  fill(c);
  stroke(0, 0, 0);
  // baseBlock;
}

function fireEscapeLayer(w = buildingWidth / 2, h = storyHeight, x = buildingWidth / 2, y = storyHeight) {
  stroke(0, 0, 0);
  noFill();
  const levelBottom = y+h;
  const railStart = x + w / 5;
  const railEnd = w + x - w / 5;
  
  // Platform
  
  rect(x-2, levelBottom - h/3, w +4, 2);
  const numberOfSupports = 18;
  for (let i = 0; i <= numberOfSupports; i += 1) {
    line(x + (w / numberOfSupports * i), levelBottom, x + (w / numberOfSupports * i), levelBottom - h / 3)
  }

  // bottom level
  rect(x, levelBottom-5, w, 5);
  rect(x, levelBottom -7, w, 5);

  
  /* // Rails */
  // const railSupports = 9;
  // for (let i = 1; i <= railSupports; i += 1) {
  //   const rise = (x) => y + 15 - ((h + 56) / railSupports) * x;
  //   const run = railStart + ((railEnd - railStart) / railSupports * i);
  //   // line(run, rise(i), run, rise(i) - h / 3)
  //   // rect(run - 7, rise(i) - 12, 7, 3);
  // }
  // line(railStart, y, railEnd, h)

  // stroke(0, 124, 124);
  // line(railStart + 10, y, railEnd, h + 10)

  // stroke(0, 124, 0);
  // line(railStart, y - 15, railEnd, h - 15) // center line
  // stroke(0, 0, 0);

  // line(railStart, y - 22, railEnd, h - 22)

  // /* // Circles at the end of rails */
  // fill(255, 255, 255);
  // circle(railStart, y - 20, 5)
  // noFill();
  // circle(railStart, y - 20, 9)
  // fill(255, 255, 255);
  // circle(railEnd, h - 18, 9)
  // circle(railEnd, h - 18, 5)
  
}