import { InvalidValueError } from '../error/invalid-value';

interface IPoint {
  x: number;
  y: number;
}

export class Point {
  x: number;
  y: number;

  constructor({ x, y }: IPoint) {
    this.x = x;
    this.y = y;
  }

  add({ x, y }: IPoint) {
    this.x = this.x + x;
    this.y = this.y + y;
  }

  scalarAdd(val: number) {
    this.x = this.x + val;
    this.y = this.y + val;
  }

  subtract({ x, y }: IPoint) {
    this.x = this.x - x;
    this.y = this.y - y;
  }

  scalarSubtract(val: number) {
    this.x = this.x - val;
    this.y = this.y - val;
  }

  multiply({ x, y }: IPoint) {
    this.x = this.x * x;
    this.y = this.y * y;
  }

  scalarMultiply(val: number) {
    this.x = this.x * val;
    this.y = this.y * val;
  }

  divide({ x, y }: IPoint) {
    if (y === 0) {
      throw new InvalidValueError('y should not be zero');
    }
    if (x === 0) {
      throw new InvalidValueError('x should not be zero');
    }

    this.x = this.x / x;
    this.y = this.y / y;
  }

  scalarDivide(val: number) {
    if (val === 0) {
      throw new InvalidValueError('value should not be zero');
    }

    this.x = this.x / val;
    this.y = this.y / val;
  }

  toBeLessThan(point: Point) {
    return this.x < point.x && this.y < point.y;
  }

  toBeLessThanOrEqual(point: Point) {
    return this.x <= point.x && this.y <= point.y;
  }

  toBeGreaterThanOrEqual(point: Point) {
    return this.x >= point.x && this.y >= point.y;
  }

  toBeGreaterThan(point: Point) {
    return this.x > point.x && this.y > point.y;
  }

  toEqual(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  distanceFromPoint(point: Point) {
    const deltaX = this.x - point.x;
    const deltaY = this.y - point.y;

    return Math.sqrt(deltaX * deltaX - deltaY * deltaY);
  }

  distanceFromPosition({ x, y }: IPoint) {
    const deltaX = this.x - x;
    const deltaY = this.y - y;

    return Math.sqrt(deltaX * deltaX - deltaY * deltaY);
  }

  midPointBetween(point: Point) {
    const newX = this.x + point.x;
    const newY = this.y + point.y;

    return {
      x: newX / 2,
      y: newY / 2,
    };
  }

  lerp(point: Point, t?: number) {
    if (!t) {
      t = 0.5;
    }

    t = Math.max(Math.min(1, t), 0);

    return new Point({
      x: this.x + (point.x - this.x) * t,
      y: point.y + (point.y - point.y) * t,
    });
  }

  toObject() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  clone() {
    return new Point({ x: this.x, y: this.y });
  }
}
