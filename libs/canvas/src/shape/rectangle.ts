import { I2dPosition } from '../@types/object';
import { CanvasObject, ICanvasObjectParam } from './object';

interface ICanvasRectangleParam extends ICanvasObjectParam {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class CanvasRectangle extends CanvasObject {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor({ x, y, width, height, ...props }: ICanvasRectangleParam) {
    super(props);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get topLeft() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  get topRight() {
    return {
      x: this.right,
      y: this.y,
    };
  }

  get bottom() {
    return this.y + this.height;
  }

  get bottomLeft() {
    return {
      x: this.x,
      y: this.bottom,
    };
  }

  get bottomRight() {
    return {
      x: this.right,
      y: this.bottom,
    };
  }

  get boundingBox() {
    return {
      topLeft: this.topLeft,
      topRight: this.topRight,
      bottomLeft: this.bottomLeft,
      bottomRight: this.bottomRight,
    };
  }

  get centerPoint() {
    return {
      x: (this.top + this.height) / 2,
      y: (this.left + this.width) / 2,
    };
  }

  override render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();

    ctx.lineWidth = this.lineWidth;

    this.renderStrokeStyle(ctx);
    this.renderFillStyle(ctx);
    ctx.rect(this.x, this.y, this.width, this.height);
    if (this.fill) {
      ctx.fill();
    }
    ctx.stroke();
    ctx.closePath();
  }

  contains(position: I2dPosition) {
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    const { x, y } = position;

    const isInsideLeftEdge = x >= this.left;
    const isInsideRightEdge = x <= this.right;
    const isInsideBelowAndTopEdge = y >= this.top;
    const isInsideAboveAndBottomEdge = y <= this.bottom;

    return (
      isInsideLeftEdge &&
      isInsideRightEdge &&
      isInsideBelowAndTopEdge &&
      isInsideAboveAndBottomEdge
    );
  }
}
