/* eslint-disable no-param-reassign */
import * as P5 from './vendor/p5.min';
import {
  panelPane, onePaneWindow, twoPaneWindow, squarePaneWindow
} from './components/windows';
import { getRandomIntInclusive, getBool } from './components/utils';
import {buildingNumbers} from './components/building';
import 

const DEBUG = false;
const y = 100; // animated line

const canvas = [3200, 940];
const minStories = 6;
const maxStories = 8;
const pi = 3.14159;
const buildingWidth = 470;
const storyHeight = canvas[1] / stories; // this sets all stories to a consistent height, which isn't true
const pageMargin = 10; // center the building
const lowerBoundWindowWidth = 32;
const numberOfBuildings = 1;

const genBuilding = buildingNumbers({
  pageMargin,
  buildingWidth,
  minStories,
  maxStories,
  pi,
  canvas,
  buildingIndex = 0
})

// const genStories = {...buildingNumbers, storyHeight};


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


    // sk.rect(buildingOrigin[0], 0, 470, 960); // draw building?

    // no idea what this is
    sk.rect(margin, 0, buildingWidth, canvas[1]);
     // you can only _draw_ things inside this, but we can do number generation pre-this.
     // We need to pass in the instantiated SK context.
     
  };
};

const p5 = new P5(s);
