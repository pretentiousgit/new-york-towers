import getRandomIntInclusive from './getRandomIntInclusive';

export default function getBool() {
  return Boolean(getRandomIntInclusive(0, 1));
}
