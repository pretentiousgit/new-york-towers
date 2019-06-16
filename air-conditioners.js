let y = 100; // animated line

const canvas = [960, 600]
const stories = 4;

const buildingWidth = canvas[0] / 2;
const storyHeight = canvas[1] / stories;
const storyBlock = [buildingWidth, storyHeight];

const margin = (canvas[0] - buildingWidth) / 2; // center the building

const buildingOrigin = [margin, canvas[1] - (storyHeight + 10)];


function setup() {
  createCanvas(...canvas);   // createCanvas must be the first statement

  stroke(0); // Set line drawing color to white

  frameRate(3);
  noLoop();
  // TODO: Implement a pause button in the drawing function
}

function draw() {
  background(255); // Set the background to black
  y = y - 1;
  if (y < 0) {
    y = height;
  }
  line(0, y, width, y);

  basicStory();
}

function basicStory(o = buildingOrigin, size = storyBlock) {
  console.log('add a story', o, size);

  const baseBlock = rect(...o, ...size);
  // const cols = 4;

  // for (i = 0; i < cols + 1; i += 1) {
  //   const x = margin + (buildingWidth / cols * i);
  //   column(x)
  // }

  cols(getRandomIntInclusive(1, 7));

  let c = color(255, 255, 255);
  fill(c);
  baseBlock;
}

function cols(quantity = 5, origin = margin + buildingWidth / 2) {
  // columns are symmetric in pairs
  // columns can come in odd numbers, in which case they are symmetric around the middle column
  console.log('cols', quantity, origin);
  const pairs = (!isEven(quantity)) ?
    (quantity - 1) / 2 :
    quantity / 2;

  if (!isEven(quantity)) {
    // odd number - draw columns from the inside out with 1 at middle
    column(origin);
  }

  for (let i = 0; i < pairs; i += 1) {
    console.log('make pairs', buildingWidth / quantity, pairs);
    const originDistance = (buildingWidth / quantity) * (i + 1);
    pair(originDistance, origin);
  }

}

function pair(x, origin, footWidth, middleWidth, capitalWidth) {
  // Within a pair, things can't be random - things are pre-set in a pair.
  const capital = () => { };

  const foot = () => {
    // const footW = w + getRandomIntInclusive(0, 15);
    const footW = w + 6;

    rect(midline - footW / 2, y + storyHeight - h / 6, footW / 2, h / 6);
    rect(midline, y + storyHeight - h / 6, footW / 2, h / 6);
  };

  const middle = () => {
    /* MIDDLE BIT */
    let c = color(255, 204, 0);
    fill(c);

    // left
    rect(midline - w / 2, y, w / 2, h);

    //right
    rect(midline, y, w / 2, h);

    // symmetry line
    c = color(155, 0, 0);
    fill(c);
    rect(midline, y, 2, h);
  };

  column(origin + x);
  column(origin - x);
}

function column(x = buildingOrigin[0], y = buildingOrigin[1], w = buildingWidth / 12, h = storyHeight) {
  // a column starts at x and has enough blocks to fill to height
  // each story has at least one but up to three "unique" column styles
  // columns on the inside are thinner than those on the outside
  // columns may have capitals on them
  // columns may have feet on them
  // a column body can be a spiral or a set of blocks or a decoration

  // colour

  // columns are symmetric
  const midline = x;

  /* CAPITAL */




  /*
    FOOT
    - can be wider than the column
    - y = 0 to start
    - w = column width + (between 0-5 x 2) (symmetric)
    - x = x - width/2
  */


}

function range(num) {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    arr.push(0);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function isEven(someNumber) {
  return (someNumber % 2 == 0) ? true : false;
};