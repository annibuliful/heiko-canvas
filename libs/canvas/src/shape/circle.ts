import { I2dPosition } from '../@types/object';
import { CanvasObject, ICanvasObjectParam } from './object';

interface ICanvasCircleParam extends ICanvasObjectParam {
  x: number;
  y: number;
  radius: number;
}

export class CanvasCircle extends CanvasObject {
  x: number;
  y: number;
  radius: number;

  constructor({ x, y, radius, ...props }: ICanvasCircleParam) {
    super(props);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  get boundingBox(): {
    topLeft: I2dPosition;
    topRight: I2dPosition;
    bottomLeft: I2dPosition;
    bottomRight: I2dPosition;
  } {
    return {
      topLeft: {
        x: this.x - this.radius,
        y: this.y + this.radius,
      },
      topRight: {
        x: this.x + this.radius,
        y: this.y + this.radius,
      },
      bottomLeft: {
        x: this.x - this.radius,
        y: this.y - this.radius,
      },
      bottomRight: {
        x: this.x - this.radius,
        y: this.y + this.radius,
      },
    };
  }

  get centerPoint() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  override render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;

    this.renderStrokeStyle(ctx);
    this.renderFillStyle(ctx);

    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    if (this.fill) {
      ctx.fill();
    }

    ctx.stroke();
    ctx.closePath();
  }

  contains(position: I2dPosition) {
    const distanceX = position.x - this.x;
    const distanceY = position.y - this.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    return distance <= this.radius;
  }
}
