/// This literally draws a fire escape, story by story.
import getRandomIntInclusive from '../utils/getRandomIntInclusive';
import range from '../utils/range';

function drawFireEscapeLayer(settings) {
  const {
    w,
    h: height,
    x,
    y,
    isItCurvy,
    isItMirrored,
    p5Sketch,
    buildingWidth,
    pageMargin,
    index,
    maxStories
  } = settings;

  // set sketch defaults
  p5Sketch.stroke(0, 0, 0);
  p5Sketch.noFill();

  let fireEscapeX = x;
  if (fireEscapeX + w > (buildingWidth + pageMargin) * index + 1) {
    fireEscapeX = x - w;
  } else if (fireEscapeX < (buildingWidth + pageMargin) * index + 1) {
    fireEscapeX = (buildingWidth + pageMargin) * index + 1;
  }

  const levelBottom = y + height;
  const levelTop = y;

  const rs1 = fireEscapeX + w / 4;
  const rs2 = w + fireEscapeX - w / 4;
  const railStart = isItMirrored ? rs1 : rs2;
  const railEnd = isItMirrored ? rs2 : rs1;

  /* START PLATFORM */

  // bottom level
  const platX = fireEscapeX;
  const platY = levelBottom - 5;
  const platW = w;
  p5Sketch.rect(platX, platY, platW, 5);
  p5Sketch.rect(platX, platY - 2, platW, 5);

  // handrails
  p5Sketch.rect(fireEscapeX - 2, levelBottom - height / 3, w + 4, 2);

  const numberOfSupports = 18;
  const supportRange = range(numberOfSupports);
  supportRange.forEach((support, i) => {
    const widthSplit = w / numberOfSupports;
    const stringerX = fireEscapeX + widthSplit / 2 + widthSplit * i;
    p5Sketch.line(stringerX, levelBottom, stringerX, levelBottom - height / 3);
    if (isItCurvy) {
      if (i === 1) {
        p5Sketch.bezier(
          fireEscapeX,
          levelBottom,
          fireEscapeX - 10,
          levelBottom - 6,
          fireEscapeX - 4,
          levelBottom - 12,
          fireEscapeX,
          levelBottom - height / 3
        );
      }
      if (i === numberOfSupports - 1) {
        const baseX = fireEscapeX + w;
        p5Sketch.bezier(
          baseX,
          levelBottom,
          baseX + 10,
          levelBottom - 6,
          baseX + 4,
          levelBottom - 12,
          baseX,
          levelBottom - height / 3
        );
      }
      if (i === 9) {
        const baseX = fireEscapeX + widthSplit * 9;
        p5Sketch.bezier(
          baseX,
          levelBottom,
          baseX - 10,
          levelBottom - 6,
          baseX - 4,
          levelBottom - 12,
          baseX,
          levelBottom - height / 3
        );
      }
      if (i === 10) {
        const baseX = fireEscapeX + widthSplit * 10;
        p5Sketch.bezier(
          baseX,
          levelBottom,
          baseX + 10,
          levelBottom - 6,
          baseX + 4,
          levelBottom - 12,
          baseX,
          levelBottom - height / 3
        );
      }
    }
  });

  /* END PLATFORM */

  // Ladder
  const ladderX = getRandomIntInclusive(0, 1) === 0 ? platX : platX + platW - 12;
  const ladderY = levelBottom - 15;
  const ladderExtend = getRandomIntInclusive(-45, 30);

  if (index === maxStories - 2) {
    // one removed for ground level, one for roofline
    // if on the lowest level, add a ladder
    /* Rails */
    p5Sketch.rect(ladderX - 2, ladderY - ladderExtend, 1, 55);
    p5Sketch.rect(ladderX + 10, ladderY - ladderExtend, 1, 55);

    p5Sketch.rect(ladderX, ladderY, 2, 45);
    p5Sketch.rect(ladderX + 8, ladderY, 2, 45);

    /* Rungs */
    const rungs = [...Array(8).keys()];
    rungs.forEach((rung) => {
      // console.log('rung', rung);
      // console.log('rung space', ladderY - ladderExtend + 5 * rung);
      const rungSpace = ladderY - ladderExtend + 7 * rung;
      const rungFixed = ladderY + (7 * rung - 1);
      p5Sketch.rect(ladderX, rungSpace, 12, 0.5);
      p5Sketch.rect(ladderX, rungFixed, 12, 0.5);
    });
  }

  /* Rails for stairs */
  if (index !== 1) {
    // prevent stairs to the roofline
    const handrailXY1 = [railStart, levelBottom - height / 3];
    const handrailXY2 = [railEnd, levelTop - height / 3];

    const railSupports = 8;
    const railSupportRange = range(railSupports);
    railSupportRange.forEach((support, i) => {
      // const rise = levelBottom;
      const xVar = (railEnd - railStart) / railSupports;
      const run = railStart + xVar * (i + 1);
      const rise = levelBottom - (height / railSupports) * (i + 1);
      p5Sketch.stroke(0, 0, 0);
      p5Sketch.line(run, rise, run, rise - height / 3);
      // p5Sketch.stroke(255, 0, 0);
      // p5Sketch.rect(run - 2, rise - 6, run, 3); // fun trick
      if (i < railSupports - 1) {
        p5Sketch.rect(run - xVar * 0.6, rise - 6, xVar, 3);
      }
    });

    p5Sketch.stroke(0, 0, 0);
    p5Sketch.line(railStart, levelBottom, railEnd, levelTop);

    // stroke(0, 124, 124);

    // stroke(150, 0, 150);
    p5Sketch.line(
      handrailXY1[0],
      handrailXY1[1],
      handrailXY2[0],
      handrailXY2[1]
    );
    p5Sketch.line(
      handrailXY1[0],
      handrailXY1[1] + 4,
      handrailXY2[0],
      handrailXY2[1] + 4
    );

    /* Circles at the end of rails */
    p5Sketch.fill(255, 255, 255);
    p5Sketch.circle(handrailXY1[0], handrailXY1[1] + 5, 9);
    p5Sketch.circle(handrailXY1[0], handrailXY1[1] + 5, 5);

    p5Sketch.circle(handrailXY2[0], handrailXY2[1] + 5, 9);
    p5Sketch.circle(handrailXY2[0], handrailXY2[1] + 5, 5);

    // reset sketch defaults before it gets called again
    p5Sketch.stroke(0, 0, 0);
    p5Sketch.noFill();
  }
}

export default drawFireEscapeLayer;
