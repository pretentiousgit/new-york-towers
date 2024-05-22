import genGoldenRectangleWindow from '../../utils/genGoldenRectangle';
import { drawAirConditioner } from '../drawAirConditioner';

function drawOnePaneWindow(config) {
  const {
    p5Sketch, w, x = 10, y = 10, ac: airConditioners
  } = config;
  const numbers = genGoldenRectangleWindow(w, x, y);
  const { outer, inner } = numbers;

  p5Sketch.rect(outer.x, outer.y, outer.w, outer.h); // outer
  p5Sketch.rect(inner.x, inner.y, inner.w, inner.h); // outer
  // if (airConditioners) {
  //   drawAirConditioner({
  //     ...config,
  //     x: inner.x + inner.w / 2,
  //     y: inner.y,
  //     windowHeight: inner.h
  //   });
  // }
}

export default drawOnePaneWindow;
