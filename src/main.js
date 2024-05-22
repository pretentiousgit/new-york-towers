/* eslint-disable no-param-reassign */
import * as P5 from './vendor/p5.min';

// P5 Dependencies
import genBuildingInfo from './p5components/genBuildingInfo';
import genBuildingLevel from './p5components/genBuildingLevel';
import fireEscapeGen from './p5components/genFireEscape';
import drawBasicBuildingLayer from './p5components/drawBasicBuildingLayer';

function logger(str) {
  console.log(str);
}
logger('Loaded bundle.js');

const DEBUG = false;
const y = 100; // animated line

// this was a cute idea but realistically these need actual measurements

const canvas = [800, 800];
const canvasW = canvas[0];
const canvasH = canvas[1];
const pageMargin = 10; // center the building

const buildingWidth = 320;

// this assumes a non-responsive display!

// TODO: how tall are buildings?
// Right now they are always the max height of the screen
// instead, each floor should have a requisite height
// of ~10-14 "feet" - 9ft interior space min
// So we should determine how many of those fit
// then put those in rather than dividing them out
// and never draw on the bottom "floor"
// the screen also maybe should be 800px high to start
// No - 650, fits on an iPhone.

const buildingConfig = {
  canvas,
  canvasH,
  canvasW,
  pageMargin,
  buildingWidth,
  minStories: 6,
  maxStories: 8,
  pi: 3.14159,
  // these are subtracted from the height of the story overall
  // so inverse relation to actual height of window
  lowerBoundWindowWidth: 64,
  upperBoundWindowWidth: 72,
  numberOfBuildings: 1,
  buildingIndex: 0
};

/*
  GIANT REMINDER TO SELF:
  Processing _is not_ for application development!!
  Processing programatically draws pretty pictures, and has a very poor repaint model!!!!
  Use it to make pretty things!!!!!
*/

const s = (p5Sketch) => {
  p5Sketch.setup = () => {
    const canvasObj = p5Sketch.createCanvas(...canvas);
    canvasObj.parent('canvasHolder');
    p5Sketch.frameRate(0.25);
  };

  p5Sketch.draw = () => {
    // "Draw" updates every tick, on the java model of canvas animation
    p5Sketch.background(255); // Set the background to black
    p5Sketch.noFill();

    // const testStory = storyArray[0];
    // logger(testStory);
    // sk.rect(testStory.buildingOrigin[0], 10, 470, 960); // draw building?
    // sk.rect(margin, 0, buildingWidth, canvas[1]);

    // you can only _draw_ things inside this, but we can do number generation pre-this.
    // We need to pass in the instantiated SK context.
    const genBuilding = genBuildingInfo(buildingConfig);
    const storyArray = genBuildingLevel(genBuilding);

    // Each story draws itself
    // then calls symmetricSeries to generate the windows within the story
    storyArray.forEach((story, i) => {
      const groundFloor = Boolean(i === storyArray.length - 1);
      const topFloor = Boolean(i === 0);
      if (!groundFloor && !topFloor) {
        drawBasicBuildingLayer({
          p5Sketch,
          ...story,
          currentStory: i,
          maxStories: storyArray.length
        });
        // debugger;
        fireEscapeGen({
          ...story, index: i, maxStories: storyArray.length, p5Sketch
        });
      }
      /*
        Here we pass the sketch object on every config
        This is annoying and might be better handled with a state manager
       */
    });
  };
};

const p5 = new P5(s);
