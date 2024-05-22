import { getRandomIntInclusive, isEven } from './utils';

function column(n, x, y) {
  // middle
  let c = color(241, 170, 100);
  fill(c);
  rect(x - n.middleWidth / 2, y, n.middleWidth, n.middleHeight);

  // capital
  c = color(63, 191, 191);
  fill(c);
  // rect(x - n.footWidth / 2, n.y + n.middleHeight - (n.footHeight * 2), n.footWidth, n.footHeight);
  rect(x - n.capWidth / 2, y, n.capWidth, n.capHeight);

  // foot
  c = color(191, 63, 127);
  fill(c);
  rect(x - n.footWidth / 2, y + n.middleHeight - n.footHeight, n.footWidth, n.footHeight);
}

function genColumnNumbers(width = buildingWidth) {
  // basic would be 32 id a building is 4x, so get number of stories and multiply
  // these should be skinnier and proportionate to a building story, which is between 10 and 14 ft.
  const baseMin = 32 / stories;
  const baseMax = 24 / stories;

  const middleWidth = getRandomIntInclusive(width / 32, width / 24);

  const capHeight = getRandomIntInclusive(middleWidth * 0.25, middleWidth * 3.14);
  const capWidth = getRandomIntInclusive(middleWidth * 1.1, middleWidth * 2.09);

  const footHeight = getRandomIntInclusive(middleWidth * 0.25, middleWidth * 3.14);
  const footWidth = getRandomIntInclusive(capWidth * 0.78, capWidth * 1.09);

  return {
    middleWidth,
    middleHeight: storyHeight,
    capHeight,
    capWidth,
    footHeight,
    footWidth
  };
}

function symmetricColumnSeries(
  origin = [
    margin + buildingWidth / 2,
    buildingOrigin[1]
  ],
  quantity = 5,
  element = column,
  sharedElementstyle = genColumnNumbers(buildingWidth / 5),
  rgb = color(241, 170, 100)
) {
  fill(rgb);

  const pairs = (!isEven(quantity))
    ? (quantity - 1) / 2
    : quantity / 2;

  if (!isEven(quantity)) {
    column(sharedElementstyle, ...origin);
  }

  for (let i = 0; i < pairs; i += 1) {
    const originDistance = (buildingWidth / quantity);
    const x1 = origin[0] + originDistance * (i + 1);
    const x2 = origin[0] - originDistance * (i + 1);
    column(sharedElementstyle, x1, origin[1]);
    column(sharedElementstyle, x2, origin[1]);
  }
}
