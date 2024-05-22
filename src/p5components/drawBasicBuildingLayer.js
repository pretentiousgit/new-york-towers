import drawWindowSeries from './drawWindowSeries';

const DEBUG = false;

export default function drawBasicBuildingLayer(config) {
  const {
    p5Sketch,
    buildingOrigin,
    buildingWidth,
    storyY,
    height,
    groundFloor,
    topFloor
  } = config;

  const buildingX = buildingOrigin[0];
  const storyVisible = false; // let's make drawing the box for the data optional
  // const groundFloor = Boolean(currentStory === maxStories - 1);
  // Draw a box for a story
  if (storyVisible) {
    p5Sketch.stroke(0, 0, 0);
    p5Sketch.noFill();
    p5Sketch.rect(buildingX, storyY, buildingWidth, height);
  }
  /*
    What should happen:
    ==> Generate a building with a window style and a blank ground floor
    ==> Fire escapes are a yes or no by building

  */

  // things should be symmetric
  // they can also be multiply-defined
  // fireEscapeLayer(fireW, h, fireX, y, index);

  //  Window type is set per building by buildingGenerator
  const drawWindowSettings = {
    ...config,
    buildingX,
    // y: storyY + 20 /* This is the vertical position of the window */
    y: storyY + (height / 4) /* This is the vertical position of the window */
  };

  if (!groundFloor && !topFloor) {
    drawWindowSeries(drawWindowSettings);
  } else {
    // TODO: it's extremely EXTREMELY confusing to draw down from the top left corner!
    // draw a ground floor
    // this will necessitate hiking everything else up half a story
    console.log('ground floor settings', buildingX, storyY, buildingWidth, height);
    // p5Sketch.fill(223, 24, 24);
    // p5Sketch.rect(10, config.buildingHeight - height, 50, 50);
  }

  if (DEBUG) {
    // center line
    p5Sketch.stroke(0, 124, 69);
    p5Sketch.line(buildingX, storyY, buildingX, height);
    const c = p5Sketch.color(255, 255, 255);
    p5Sketch.fill(c);
    p5Sketch.stroke(0, 0, 0);
  }
}
