import {
  CanvasCircle,
  CanvasManager,
  CanvasRectangle,
  CanvasTriangle,
  randomBetween,
} from '@heiko-canvas/canvas';
import { ChangeEvent, useEffect, useRef } from 'react';

export function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasManager = useRef<CanvasManager>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasManager.current = new CanvasManager(canvasRef.current);
    canvasManager.current.setDimension({ width: 1024, height: 1024 });

    const rect1 = new CanvasRectangle({
      x: 10,
      y: 10,
      height: 100,
      width: 100,
    });

    const rect2 = new CanvasRectangle({
      x: 10,
      y: 10,
      height: 10,
      width: 10,
    });

    rect2.set({
      fill: 'red',
    });
    const circle = new CanvasCircle({ x: 100, y: 100, radius: 100 });

    canvasManager.current.add(circle);
    canvasManager.current.add(rect1);
    canvasManager.current.add(rect2);
    canvasManager.current.renderAll();

    return () => {
      canvasManager.current.dispose();
      canvasManager.current = null;
    };
  }, []);

  const handleAddRect = () => {
    const dimension = randomBetween(50, 500);

    const rect = new CanvasRectangle({
      x: randomBetween(50, 500),
      y: randomBetween(50, 500),
      height: dimension,
      width: dimension,
    });
    rect.set({
      fill: `rgba(${randomBetween(0, 255)},${randomBetween(
        0,
        255
      )},${randomBetween(0, 255)},${Math.random()})`,
    });
    canvasManager.current.add(rect);
    canvasManager.current.renderAll();
  };

  const handleAddMultipleRects = () => {
    for (let i = 0; i < 100; i++) {
      handleAddRect();
    }
  };

  const handleChangeStrokeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const activeObject = canvasManager.current.getActiveObject();
    if (!activeObject) return;
    activeObject.set({ stroke: e.target.value });
    canvasManager.current.renderAll();
  };

  const handleChangeLineWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const activeObject = canvasManager.current.getActiveObject();
    if (!activeObject) return;
    activeObject.set({ lineWidth: Number(e.target.value) });
    canvasManager.current.renderAll();
  };

  const handleVisible = (e: ChangeEvent<HTMLInputElement>) => {
    const activeObject = canvasManager.current.getActiveObject();
    if (!activeObject) return;
    activeObject.set({ visible: e.target.checked });
    canvasManager.current.renderAll();
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const activeObject = canvasManager.current.getActiveObject();
    if (!activeObject) return;
    activeObject.set({ fill: e.target.value });
    canvasManager.current.renderAll();
  };

  const handleChangeOpacity = (e: ChangeEvent<HTMLInputElement>) => {
    const activeObject = canvasManager.current.getActiveObject();
    if (!activeObject) return;
    activeObject.set({ opacity: Number(e.target.value) });
    canvasManager.current.renderAll();
  };

  const handleAddTri = () => {
    const tri = new CanvasTriangle({
      x: 100,
      y: 100,
      points: [
        { x: 100, y: 100 },
        { x: 10, y: 10 },
        { x: 50, y: 50 },
      ],
    });
    canvasManager.current.add(tri);
    canvasManager.current.renderAll();
  };

  return (
    <div>
      <p
        style={{ textAlign: 'center', fontSize: '20px', marginBottom: '100px' }}
      >
        Playground
      </p>
      <div>
        <button onClick={handleAddRect}>Add Rect</button>
        <button onClick={handleAddTri}>add Triangle</button>
        <button onClick={handleAddMultipleRects}>Add Rects</button>
        <p>
          <span>Opacity: </span>{' '}
          <input
            type="number"
            onChange={handleChangeOpacity}
            min={0}
            max={1}
            step={0.1}
            defaultValue={1}
          />
        </p>

        <p>
          <span>Line width: </span>{' '}
          <input
            type="number"
            onChange={handleChangeLineWidth}
            min={0}
            step={0.1}
            defaultValue={1}
          />
        </p>
        <p>
          <span>Color: </span>{' '}
          <input type="color" onChange={handleChangeColor} />
        </p>
        <p>
          <span>Stroke Color: </span>{' '}
          <input type="color" onChange={handleChangeStrokeColor} />
        </p>
        <p>
          <span>Visible: </span>
          <input
            type="checkbox"
            onChange={handleVisible}
            defaultChecked={true}
          />
        </p>
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', margin: 'auto' }} />
    </div>
  );
}

export default Index;
