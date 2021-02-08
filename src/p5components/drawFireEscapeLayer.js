/// This literally draws a fire escape, story by story.
import { getRandomIntInclusive, range } from '../library/utils';

function drawFireEscapeLayer(settings) {
  const {
    w, h, x, y, isItCurvy, isItMirrored, p5Sketch
  } = settings;

  // set sketch defaults
  p5Sketch.stroke(0, 0, 0);
  p5Sketch.noFill();

  const fireEscapeX = x;
  // if(fireEscapeX + w > ((buildingWidth + margin) * index+1)) {
  //   fireEscapeX = x - w;
  // } else if (fireEscapeX < ((buildingWidth + margin) * index+1)) {
  //   // fireEscapeX = ((buildingWidth + margin) * index+1);
  // }

  const levelBottom = y + h;
  const levelTop = y;

  const rs1 = fireEscapeX + w / 4;
  const rs2 = w + fireEscapeX - w / 4;
  const railStart = (isItMirrored) ? rs1 : rs2;
  const railEnd = (isItMirrored) ? rs2 : rs1;

  // Platform

  // bottom level
  const platX = fireEscapeX;
  const platY = levelBottom - 5;
  const platW = w;
  p5Sketch.rect(platX, platY, platW, 5);
  p5Sketch.rect(platX, platY - 2, platW, 5);

  // handrails
  p5Sketch.rect(fireEscapeX - 2, levelBottom - h / 3, w + 4, 2);

  const numberOfSupports = range(18);
  numberOfSupports.forEach((support, i) => {
    p5Sketch.line(fireEscapeX + (w / numberOfSupports * i), levelBottom, fireEscapeX + (w / numberOfSupports * i), levelBottom - h / 3);

    if (isItCurvy) {
      if (i === 1) {
        p5Sketch.bezier(fireEscapeX, levelBottom, fireEscapeX - 10, levelBottom - 6, fireEscapeX - 4, levelBottom - 12, fireEscapeX, levelBottom - h / 3);
      }
      if (i === numberOfSupports) {
        const baseX = fireEscapeX + w;
        p5Sketch.bezier(baseX, levelBottom, baseX + 10, levelBottom - 6, baseX + 4, levelBottom - 12, baseX, levelBottom - h / 3);
      }
      if (i === 9) {
        const baseX = fireEscapeX + (w / numberOfSupports * 9);
        p5Sketch.bezier(baseX, levelBottom, baseX - 10, levelBottom - 6, baseX - 4, levelBottom - 12, baseX, levelBottom - h / 3);
      }
      if (i === 10) {
        const baseX = fireEscapeX + (w / numberOfSupports * 10);
        p5Sketch.bezier(baseX, levelBottom, baseX + 10, levelBottom - 6, baseX + 4, levelBottom - 12, baseX, levelBottom - h / 3);
      }
    }
  });

  // Ladder
  const ladderX = (getRandomIntInclusive(0, 1) == 0) ? platX : platX + platW - 12;
  const ladderY = levelBottom - 15;
  const ladderExtend = getRandomIntInclusive(-65, 30);

  // if (index == 6) {
  //   /* Rails */
  //   sk.rect(ladderX - 2, ladderY + ladderExtend, 1, 55);
  //   sk.rect(ladderX + 10, ladderY + ladderExtend, 1, 55);
  //   sk.rect(ladderX, ladderY, 2, 45);
  //   sk.rect(ladderX + 8, ladderY, 2, 45);
  //   for (let i = 0; i <= 7; i += 1) {
  //     sk.rect(ladderX, ladderY + (5 * i) + 5, 12, 0.5);
  //   }

  //   /* Rungs */
  //   for (let i = 0; i <= 8; i += 1) {
  //     sk.rect(ladderX, ladderY + ladderExtend + (5 * i) + 5, 12, 0.5);
  //   }
  // }

  /* // Rails for stairs */
  const railSupports = 9;
  for (let i = 1; i <= railSupports; i += 1) {
    const rise = levelBottom + 15 - ((h + 14) / railSupports) * i;
    const run = railStart + ((railEnd - railStart) / railSupports * i);

    p5Sketch.line(run, rise, run, rise - h / 3);
    p5Sketch.rect(run - 7, rise - 12, 7, 3);
  }

  // stroke(255, 0, 0);
  p5Sketch.line(railStart, levelBottom, railEnd - 10, levelTop);

  // stroke(0, 124, 124);
  p5Sketch.line(railStart + 10, levelBottom, railEnd, levelTop);

  // stroke(150, 0, 150);
  p5Sketch.line(railStart, levelBottom - 15 - h / 14, railEnd, levelTop - h / 3);
  p5Sketch.line(railStart, levelBottom - 19 - h / 14, railEnd, levelTop - h / 3 - 4);

  // /* // Circles at the end of rails */
  p5Sketch.fill(255, 255, 255);
  p5Sketch.circle(railStart, levelBottom - 22, 9);
  p5Sketch.circle(railStart, levelBottom - 22, 5);

  p5Sketch.circle(railEnd, levelTop - 38, 9);
  p5Sketch.circle(railEnd, levelTop - 38, 5);

  // reset sketch defaults before it gets called again
  p5Sketch.stroke(0, 0, 0);
  p5Sketch.noFill();
}

export default drawFireEscapeLayer;
