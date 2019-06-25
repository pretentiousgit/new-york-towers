
function matrix(c, r) {
  const arr = [];
  for (let i = 0; i < c; i += 1) {
    arr.push([]);
    for (let j = 0; j < r; j += 1) {
      arr[i].push[0]
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

function getBool() {
  return Boolean(getRandomIntInclusive(0, 1));
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function isEven(someNumber) {
  return (someNumber % 2 == 0) ? true : false;
};

function goldenRatio(number) {
  return {
    a: number,
    b: number * 0.618,
    c: number * 1.618
  }
}