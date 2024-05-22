import getBool from '../utils/getBool';
import getRandomIntInclusive from '../utils/getRandomIntInclusive';

function drawAirConditioner(config) {
  const {
    x, y, windowHeight, p5Sketch, acWidth
  } = config;

  console.log('okay give me an air conditioner');
  // console.log('ac config - x, y, windowHeight', x, y, windowHeight);
  // console.log('ac - ac width', acWidth);
  // console.log('ac - P5sketch present', p5Sketch);

  // air conditioners should draw themselves around a midpoint
  // air conditioners need a height not a width.
  // basically a window's height, width, and panelling
  // plus whether it has an ac or not
  // needs to be internal to that window.

  const xCorrect = x - acWidth / 2;
  const boxHeight = acWidth * 0.618; // clever, constrained by window width?
  const yCorrect = getBool() ? windowHeight + y - boxHeight : y;

  // Set the stroke to black and the fill to white
  p5Sketch.stroke(0, 0, 0);
  p5Sketch.fill(255, 255, 255);

  // an a/c is always the same width.x
  // TODO: make this scale by screen size?

  // outer case of a/c
  p5Sketch.rect(xCorrect, yCorrect, acWidth, boxHeight);

  // inner case of a/c
  p5Sketch.fill(150, 150, 150);
  p5Sketch.rect(xCorrect + 3, yCorrect + 3, acWidth - 6, (boxHeight) - 6);
  p5Sketch.fill(255, 255, 255);

  // draw label on approximately 1/3 of AC
  // a/c labels are usually a dot then a rectangle
  const doLabel = getRandomIntInclusive(1, 3);
  if (doLabel === 3) {
    const labelCoords = {
      topX: xCorrect + (acWidth / 4),
      topY: yCorrect + (boxHeight / 2) + 1,
      dia: 3,
      width: acWidth / 2,
      lineX: xCorrect + (acWidth - 6)
    };

    p5Sketch.circle(labelCoords.topX, labelCoords.topY, labelCoords.dia);
    p5Sketch.stroke(255, 255, 255);
    // p5Sketch.rect(labelCoords.topX, labelCoords.topY, labelCoords.width, 1);
    p5Sketch.line(labelCoords.topX, labelCoords.topY, labelCoords.lineX, labelCoords.topY);
    p5Sketch.stroke(0, 0, 0);
  }
  // inner a/c, replace with 1 rect full of dots?
  // p5Sketch.rect(xCorrect + 3, yCorrect + 5, w - 6, (boxHeight) - 10);
  // p5Sketch.rect(xCorrect + 3, yCorrect + 7, w - 6, (boxHeight) - 14);
  // p5Sketch.rect(xCorrect + 3, yCorrect + 9, w - 6, (boxHeight) - 18);

  // little weird dip in a-c line, which should just be white

  const indent = {
    // vertPosition: yCorrect + (boxHeight) - 2,
    horzPosition: xCorrect + (acWidth / 2) - 4,
    vertPosition: yCorrect + 1,
    width: acWidth / 4, // not acWidth, apparently!
    height: 3 // this is a position?
    // height: (boxHeight) - 24 // this is a position?
  };
  p5Sketch.stroke(255, 255, 255);
  p5Sketch.rect(indent.horzPosition, indent.vertPosition, indent.width, indent.height);
  p5Sketch.stroke(0, 0, 0);
  p5Sketch.noFill();
}

export { drawAirConditioner };
