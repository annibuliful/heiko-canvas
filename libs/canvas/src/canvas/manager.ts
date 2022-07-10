import { I2dDimension, I2dPosition } from '../@types/object';
import { CanvasObject } from '../shape/object';

export class CanvasManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private _objects: CanvasObject[] = [];
  private isDragging = false;
  private activeObject: CanvasObject | null = null;
  private dragHoldX = 0;
  private dragHoldY = 0;
  currentX = -1;
  currentY = -1;

  constructor(canvas: HTMLCanvasElement | string) {
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    } else {
      const canvasElement = document.getElementById(
        canvas
      ) as HTMLCanvasElement;
      this.canvas = canvasElement;
      this.context = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    }

    this.context.imageSmoothingEnabled = true;
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  dispose() {
    this.canvas.removeEventListener(
      'mousemove',
      this.handleMouseMove.bind(this)
    );
    this.canvas.removeEventListener(
      'mousedown',
      this.handleMouseDown.bind(this)
    );
    this.canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  add<T extends CanvasObject>(object: T) {
    this._objects.push(object);
  }

  renderAll() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const item of this._objects) {
      if (!item.visible) continue;

      item.render(this.context);
    }
  }

  private getMousePoint({ x, y }: I2dPosition) {
    const bbox = this.canvas.getBoundingClientRect();

    return {
      x: x - bbox.left * (this.canvas.width / bbox.width),
      y: y - bbox.top * (this.canvas.height / bbox.height),
    };
  }

  handleMouseUp(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging = false;
  }

  private handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const point = this.getMousePoint({ x: e.clientX, y: e.clientY });

    const activeObject = this._objects.find((item) => item.contains(point));

    if (activeObject) {
      this.isDragging = true;
      this.activeObject = activeObject;
      this.dragHoldX = point.x - activeObject.x;
      this.dragHoldY = point.y - activeObject.y;
    } else {
      this.activeObject = null;
    }
  }

  private handleMouseMove(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const point = this.getMousePoint({ x: e.clientX, y: e.clientY });
    this.currentX = point.x - this.dragHoldX;
    this.currentY = point.y - this.dragHoldY;
    this.canvas.style.cursor = 'default';

    if (this.isDragging && this.activeObject) {
      this.activeObject.set({
        x: point.x - this.dragHoldX,
        y: point.y - this.dragHoldY,
      });
      this.renderAll();
    }

    const hoveredObject = this._objects.find((item) => item.contains(point));
    if (hoveredObject && this.canvas) {
      this.canvas.style.cursor = 'pointer';

      this.renderAll();
    }
  }

  getObjects() {
    return this._objects;
  }

  getCanvas() {
    return this.canvas;
  }

  getActiveObject() {
    return this.activeObject;
  }

  setDimension({ width, height }: I2dDimension) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
