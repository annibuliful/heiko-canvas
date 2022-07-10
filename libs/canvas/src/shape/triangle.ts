import { I2dPosition } from '../@types/object';
import { CanvasObject, ICanvasObjectParam } from './object';

export type TrianglePoint = [I2dPosition, I2dPosition, I2dPosition];

interface ITriangleParam extends ICanvasObjectParam {
  points: TrianglePoint;
  x: number;
  y: number;
}

interface IComputeAreaParam {
  p0: I2dPosition;
  p1: I2dPosition;
  p2: I2dPosition;
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

    ctx.moveTo(this.x + this.points[0].x, this.y + this.points[0].y);

    for (const point of this.points) {
      ctx.lineTo(this.x + point.x, this.y + point.y);
    }

    if (this.fill) {
      ctx.fill();
    }

    ctx.stroke();
    ctx.closePath();
  }

  //https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
  computeArea({ p1, p2, p0 }: IComputeAreaParam) {
    return (
      (1 / 2) *
      (-p1.y * p2.x +
        p0.y * (-p1.x + p2.x) +
        p0.x * (p1.y - p2.y) +
        p1.x * p2.y)
    );
  }

  contains(p: I2dPosition): boolean {
    const [p0, p1, p2] = this.points;

    const area = this.computeArea({
      p0,
      p1,
      p2,
    });

    const sign = area < 0 ? -1 : 1;

    const s =
      (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) *
      sign;

    const t =
      (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) *
      sign;

    return s > 0 && t > 0 && s + t < 2 * area * sign;
  }
}
