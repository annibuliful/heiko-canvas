import { I2dPosition } from '../@types/object';
import { CanvasObject, ICanvasObjectParam } from './object';

export type TrianglePoint = [I2dPosition, I2dPosition, I2dPosition];

interface ITriangleParam extends ICanvasObjectParam {
  points: TrianglePoint;
  x: number;
  y: number;
}

interface IComputeAreaParam {
  p1: I2dPosition;
  p2: I2dPosition;
  p3: I2dPosition;
}
export class CanvasTriangle extends CanvasObject {
  x: number;
  y: number;
  points: TrianglePoint;

  constructor({ x, y, points, ...props }: ITriangleParam) {
    super(props);
    this.x = x;
    this.y = y;
    this.points = points;
  }

  get boundingBox(): {
    topLeft: I2dPosition;
    topRight: I2dPosition;
    bottomLeft: I2dPosition;
    bottomRight: I2dPosition;
  } {
    throw new Error('Method not implemented.');
  }
  get centerPoint(): I2dPosition {
    throw new Error('Method not implemented.');
  }
  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();

    ctx.lineWidth = this.lineWidth;

    this.renderStrokeStyle(ctx);
    this.renderFillStyle(ctx);
    const [firstPoint, secondPoint, thirdPoint] = this.points;

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.lineTo(firstPoint.x, secondPoint.y);
    ctx.lineTo(secondPoint.x, thirdPoint.y);
    if (this.fill) {
      ctx.fill();
    }

    ctx.stroke();
    ctx.closePath();
  }

  // https://en.wikipedia.org/wiki/Heron%27s_formula
  computeArea({ p1, p2, p3 }: IComputeAreaParam) {
    return Math.abs(
      (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2.0
    );
  }

  contains(point: I2dPosition): boolean {
    const [firstPoint, secondPoint, thirdPoint] = this.points;

    const originalArea = this.computeArea({
      p1: firstPoint,
      p2: secondPoint,
      p3: thirdPoint,
    });

    const areaOne = this.computeArea({
      p1: point,
      p2: firstPoint,
      p3: secondPoint,
    });

    const areaTwo = this.computeArea({
      p1: firstPoint,
      p2: point,
      p3: thirdPoint,
    });

    const areaThree = this.computeArea({
      p1: firstPoint,
      p2: secondPoint,
      p3: point,
    });

    return originalArea === areaOne + areaTwo + areaThree;
  }

  override set(options: Partial<this>): void {
    const entries = Object.entries(options);

    for (const [key, value] of entries) {
      this[key as keyof this] = value;
    }

    if (options.x) {
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].x = options.x;
      }
    }

    if (options.y) {
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].y = options.y;
      }
    }
  }
}
