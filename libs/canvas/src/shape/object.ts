import { I2dPosition } from '../@types/object';
import { convertColorToRGBA } from '../utils/color';

export interface ICanvasObjectParam {
  opacity?: number;
  visible?: boolean;
}
export abstract class CanvasObject {
  fill: string | CanvasGradient | CanvasPattern = 'black';
  stroke: string | CanvasGradient | CanvasPattern = 'transparent';
  lineWidth = 1;
  opacity = 1;
  angle = 0;
  visible = true;
  abstract x: number;
  abstract y: number;

  abstract get boundingBox(): {
    topLeft: I2dPosition;
    topRight: I2dPosition;
    bottomLeft: I2dPosition;
    bottomRight: I2dPosition;
  };

  abstract get centerPoint(): I2dPosition;

  constructor({ visible = true, opacity = 1 }: ICanvasObjectParam) {
    this.visible = visible;
    this.opacity = opacity;
  }

  renderStrokeStyle(ctx: CanvasRenderingContext2D) {
    if (this.stroke) {
      ctx.strokeStyle =
        typeof this.stroke === 'string'
          ? convertColorToRGBA(this.stroke)
          : this.fill;
    }
  }

  renderFillStyle(ctx: CanvasRenderingContext2D) {
    if (this.fill) {
      ctx.fillStyle =
        typeof this.fill === 'string'
          ? convertColorToRGBA(this.fill)
          : this.fill;
    }
  }

  set(options: Partial<this>): void {
    for (const [key, value] of Object.entries(options)) {
      this[key as keyof this] = value;
    }
  }

  abstract render(ctx: CanvasRenderingContext2D): void;

  abstract contains(point: I2dPosition): boolean;
}
