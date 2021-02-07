function matrix(c, r) {
  const arr = [];
  for (let i = 0; i < c; i += 1) {
    arr.push([]);
    for (let j = 0; j < r; j += 1) {
      // eslint-disable-next-line no-unused-expressions
      arr[i].push[0];
    }
  }
  return arr;
}

function range(num) {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    arr.push(0);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  // eslint-disable-next-line max-len
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin; // The maximum is inclusive and the minimum is inclusive
}

function getBool() {
  return Boolean(getRandomIntInclusive(0, 1));
}

function isEven(someNumber) {
  return (someNumber % 2 === 0);
}

function goldenRatioTallRectangle(number){
  return {
    width: number/1.618,
    height: number
  }
}

function goldenRatioByWidth(number) {
  return {
    a: number,
    b: number * 0.618,
    c: number * 1.618
  };
}


export {
  matrix,
  range,
  getBool,
  getRandomIntInclusive,
  isEven,
  goldenRatioTallRectangle,
  goldenRatioByWidth
};
