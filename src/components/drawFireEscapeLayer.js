
/// This literally draws a fire escape, story by story.
function drawFireEscapeLayer(w = buildingWidth / 2, h = storyHeight, x = buildingWidth / 2, y = storyHeight, isItCurvy, isItMirrored) {
  stroke(0, 0, 0);
  noFill();

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
  rect(platX, platY, platW, 5);
  rect(platX, platY - 2, platW, 5);

  // handrails
  rect(fireEscapeX - 2, levelBottom - h / 3, w + 4, 2);

  const numberOfSupports = 18;
  for (let i = 0; i <= numberOfSupports; i += 1) {
    line(fireEscapeX + (w / numberOfSupports * i), levelBottom, fireEscapeX + (w / numberOfSupports * i), levelBottom - h / 3);

    if (isItCurvy) {
      if (i == 1) {
        bezier(fireEscapeX, levelBottom, fireEscapeX - 10, levelBottom - 6, fireEscapeX - 4, levelBottom - 12, fireEscapeX, levelBottom - h / 3);
      }
      if (i == numberOfSupports) {
        const baseX = fireEscapeX + w;
        bezier(baseX, levelBottom, baseX + 10, levelBottom - 6, baseX + 4, levelBottom - 12, baseX, levelBottom - h / 3);
      }
      if (i == 9) {
        const baseX = fireEscapeX + (w / numberOfSupports * 9);
        bezier(baseX, levelBottom, baseX - 10, levelBottom - 6, baseX - 4, levelBottom - 12, baseX, levelBottom - h / 3);
      }
      if (i == 10) {
        const baseX = fireEscapeX + (w / numberOfSupports * 10);
        bezier(baseX, levelBottom, baseX + 10, levelBottom - 6, baseX + 4, levelBottom - 12, baseX, levelBottom - h / 3);
      }
    }
  }

  // Ladder
  const ladderX = (getRandomIntInclusive(0, 1) == 0) ? platX : platX + platW - 12;
  const ladderY = levelBottom - 15;
  const ladderExtend = getRandomIntInclusive(-65, 30);

  // if (index == 6) {
  //   /* Rails */
  //   rect(ladderX - 2, ladderY + ladderExtend, 1, 55);
  //   rect(ladderX + 10, ladderY + ladderExtend, 1, 55);
  //   rect(ladderX, ladderY, 2, 45);
  //   rect(ladderX + 8, ladderY, 2, 45);
  //   for (let i = 0; i <= 7; i += 1) {
  //     rect(ladderX, ladderY + (5 * i) + 5, 12, 0.5);
  //   }

  //   /* Rungs */
  //   for (let i = 0; i <= 8; i += 1) {
  //     rect(ladderX, ladderY + ladderExtend + (5 * i) + 5, 12, 0.5);
  //   }
  // }

  /* // Rails for stairs */
  const railSupports = 9;
  for (let i = 1; i <= railSupports; i += 1) {
    const rise = levelBottom + 15 - ((h + 14) / railSupports) * i;
    const run = railStart + ((railEnd - railStart) / railSupports * i);

    line(run, rise, run, rise - h / 3);
    rect(run - 7, rise - 12, 7, 3);
  }

  // stroke(255, 0, 0);
  line(railStart, levelBottom, railEnd - 10, levelTop);

  // stroke(0, 124, 124);
  line(railStart + 10, levelBottom, railEnd, levelTop);

  // stroke(150, 0, 150);
  line(railStart, levelBottom - 15 - h / 14, railEnd, levelTop - h / 3);
  line(railStart, levelBottom - 19 - h / 14, railEnd, levelTop - h / 3 - 4);

  // /* // Circles at the end of rails */
  fill(255, 255, 255);
  circle(railStart, levelBottom - 22, 9);
  circle(railStart, levelBottom - 22, 5);

  circle(railEnd, levelTop - 38, 9);
  circle(railEnd, levelTop - 38, 5);

  stroke(0, 0, 0);
  noFill();
}

export default drawFireEscapeLayer;
