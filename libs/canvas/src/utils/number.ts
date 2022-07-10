/**
 * random between min and max
 * @param min
 * @param max
 * @returns
 */
export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
