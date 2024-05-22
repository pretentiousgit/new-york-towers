export default function goldenRatioByWidth(number) {
  return {
    a: number,
    b: number * 0.618,
    c: number * 1.618
  };
}
