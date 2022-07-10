import { I2dPosition } from '../@types/object';
import { getBoundingBox } from '../math/trigometry';
import { CanvasObject, ICanvasObjectParam } from './object';

export type TrianglePoint = [I2dPosition, I2dPosition, I2dPosition];

interface ITriangleParam extends ICanvasObjectParam {
  points: TrianglePoint;
  x: number;
  y: number;
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
    return getBoundingBox({
      origin: { x: this.centerPoint.x, y: this.centerPoint.y },
      points: this.points,
      angle: this.angle,
    });
  }

  get centerPoint(): I2dPosition {
    return {
      x: (this.points[0].x + this.points[1].x + this.points[2].x) / 3,
      y: (this.points[0].y + this.points[1].y + this.points[2].y) / 3,
    };
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

    ctx.closePath();
    ctx.stroke();
  }

  get computedPoints() {
    const points: I2dPosition[] = [];

    for (const point of this.points) {
      points.push({
        x: this.x + point.x,
        y: this.y + point.y,
      });
    }

    return points;
  }

  contains(p: I2dPosition): boolean {
    const [p1, p2, p3] = this.computedPoints;

    const areaOrig = Math.abs(
      (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y)
    );

    const area1 = Math.abs(
      (p1.x - p.x) * (p2.y - p.y) - (p2.x - p.x) * (p1.y - p.y)
    );
    const area2 = Math.abs(
      (p2.x - p.x) * (p3.y - p.y) - (p3.x - p.x) * (p2.y - p.y)
    );
    const area3 = Math.abs(
      (p3.x - p.x) * (p1.y - p.y) - (p1.x - p.x) * (p3.y - p.y)
    );

    return area1 + area2 + area3 === areaOrig;
  }
}
