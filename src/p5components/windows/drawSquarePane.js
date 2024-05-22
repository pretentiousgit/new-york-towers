import genFramedPanelXYWH from '../../utils/genFramedPanelXYWH';
import { drawAirConditioner } from '../drawAirConditioner';

function drawSquarePaneWindow(config) {
  const {
    p5Sketch,
    storyHeight,
    w,
    x = 10,
    y = 10,
    ac: airConditioners
  } = config;

  const width = w * 2 >= storyHeight - 10 ? 48 : w;
  const numbers = genFramedPanelXYWH(width, x, y, width * 2);

  const { outer, inner } = numbers;

  // draw a lintel
  const lintel = {
    x: outer.x - (outer.w / 6),
    y: outer.y - 8,
    w: outer.w + (outer.w / 3),
    h: 22
  };
  p5Sketch.rect(lintel.x, lintel.y, lintel.w, lintel.h); // outer

  // Draw window
  p5Sketch.strokeWeight(2);
  p5Sketch.fill(255, 255, 255);
  p5Sketch.rect(outer.x, outer.y, outer.w, outer.h); // outer
  p5Sketch.rect(inner.x, inner.y, inner.w, inner.h); // outer
  p5Sketch.rect(inner.x, inner.y + inner.h / 2, inner.w, 2);
  p5Sketch.strokeWeight(1);
  p5Sketch.noFill();

  // draw a sill
  const sill = {
    x: outer.x - (outer.w / 8),
    y: (outer.y + outer.h),
    w: outer.w + (outer.w / 4),
    h: 5
  };
  p5Sketch.rect(sill.x, sill.y, sill.w, sill.h); // outer

  if (airConditioners) {
    drawAirConditioner({
      ...config,
      x: inner.x + inner.w / 2,
      y: inner.y,
      windowHeight: inner.h
    });
  }
}

export default drawSquarePaneWindow;
