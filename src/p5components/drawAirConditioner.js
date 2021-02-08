import { getBool } from '../library/utils';

function drawAirConditioner(config) {
  const {
    x, y, windowHeight, p5Sketch, acWidth
  } = config;

  console.log('okay give me an air conditioner');
  console.log('config in ac', x, y, windowHeight);
  console.log('config in ac', acWidth);
  console.log('config in ac', p5Sketch);
  // air conditioners should draw themselves around a midpoint
  // air conditioners need a height not a width.
  // basically a window's height, width, and panelling
  // plus whether it has an ac or not
  // needs to be internal to that window.

  const w = acWidth;
  const xCorrect = x - acWidth / 2;
  const baseHeight = w * 0.618;
  const yCorrect = getBool() ? windowHeight + y - baseHeight : y;

  p5Sketch.stroke(0, 0, 0);
  p5Sketch.fill(255, 255, 255);
  // an a/c is always the same width.x
  p5Sketch.rect(xCorrect, yCorrect, w, baseHeight);
  p5Sketch.rect(xCorrect + 3, yCorrect + 3, w - 6, (baseHeight) - 6);

  p5Sketch.rect(xCorrect + 3, yCorrect + 5, w - 6, (baseHeight) - 10);
  p5Sketch.rect(xCorrect + 3, yCorrect + 7, w - 6, (baseHeight) - 14);
  p5Sketch.rect(xCorrect + 3, yCorrect + 9, w - 6, (baseHeight) - 18);

  p5Sketch.rect(xCorrect + (w / 2) - 4, yCorrect + (baseHeight) - 2, 8, (baseHeight) - 24);
  p5Sketch.stroke(0, 0, 0);
  p5Sketch.noFill();
}

export { drawAirConditioner };
