/* eslint-disable no-param-reassign */
import * as P5 from './vendor/p5.min';

import buildingGenerator from './components/buildingGenerator';
import storyGenerator from './components/storyGenerator';
import drawStory from './components/drawStory';

function logger(str) {
  console.log(str);
}
logger('Loaded bundle.js');

const DEBUG = false;
const y = 100; // animated line

const canvas = [3200, 940];
const pageMargin = 10; // center the building

const buildingConfig = {
  canvas,
  pageMargin,
  minStories: 6,
  maxStories: 8,
  pi: 3.14159,
  buildingWidth: 470,
  lowerBoundWindowWidth: 32,
  numberOfBuildings: 1,
  buildingIndex: 0
};

const genBuilding = buildingGenerator(buildingConfig);
const storyArray = storyGenerator(genBuilding);

/*
  GIANT REMINDER TO SELF:
  Processing _is not_ for application development!!
  Processing programatically draws pretty pictures, and has a very poor repaint model!!!!
  Use it to make pretty things that are basically unhinged visualizations!!!!!
*/

const s = (sk) => {
  sk.setup = () => {
    sk.createCanvas(...canvas);
    sk.frameRate(1);
  };

  sk.draw = () => { // "Draw" updates every tick, on the java model of canvas animation
    sk.background(255); // Set the background to black
    sk.noFill();

    // no idea what this is
    // sk.rect(buildingOrigin[0], 0, 470, 960); // draw building?
    // sk.rect(margin, 0, buildingWidth, canvas[1]);

    // you can only _draw_ things inside this, but we can do number generation pre-this.
    // We need to pass in the instantiated SK context.
    storyArray.forEach((story) => {
      console.log(story);
      drawStory(story, sk);
    });
  };
};

const p5 = new P5(s);
