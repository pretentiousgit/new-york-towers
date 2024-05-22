import matrix from '../../utils/matrix';
import genGoldenRectangleWindow from '../../utils/genGoldenRectangle';
import getRandomIntInclusive from '../../utils/getRandomIntInclusive';
import { drawAirConditioner } from '../drawAirConditioner';

function drawPanelPane(config) {
  const {
    p5Sketch, w, x = 10, y = 10, airConditioners, cols = 3, rows = 3
  } = config;
  const pane = matrix(cols, rows);
  p5Sketch.noFill();

  // frame
  const frame = genGoldenRectangleWindow(w, x, y);
  const {
    x: x1, y: y1, w: w1, h: h1
  } = frame.outer;
  const {
    x: x2, y: y2, w: w2, h: h2
  } = frame.inner;

  p5Sketch.strokeWeight(2);
  p5Sketch.rect(x1, y1, w1, h1);
  p5Sketch.rect(x2, y2, w2, h2);
  p5Sketch.strokeWeight(1);
  // inject panels
  let numbers = genGoldenRectangleWindow(w / cols);
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const posX = x + numbers.outer.w * i;
      const posY = y + numbers.outer.h * j;

      numbers = genGoldenRectangleWindow(w / cols, posX, posY);
      const {
        x: x3, y: y3, w: w3, h: h3
      } = numbers.outer;
      const {
        x: x4, y: y4, w: w4, h: h4
      } = numbers.inner;
      p5Sketch.rect(x3, y3, w3, h3);
      p5Sketch.rect(x4, y4, w4, h4);
      pane[i][j] = numbers;
    }
  }

  if (airConditioners) {
    drawAirConditioner({
      ...config,
      x: x2 + w2 / 2,
      y: y2,
      windowHeight: h2
    });
  }
}

export default drawPanelPane;
