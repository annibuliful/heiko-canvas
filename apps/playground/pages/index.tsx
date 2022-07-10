import {
  CanvasCircle,
  CanvasManager,
  CanvasRectangle,
  CanvasTriangle,
  randomBetween,
} from '@heiko-canvas/canvas';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasManager = useRef<CanvasManager>(null);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);

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

    const tri = new CanvasTriangle({
      x: 250,
      y: 250,
      points: [
        { x: randomBetween(10, 100), y: randomBetween(10, 100) },
        { x: randomBetween(10, 100), y: randomBetween(10, 100) },
        { x: randomBetween(10, 100), y: randomBetween(10, 100) },
      ],
    });

    canvasManager.current.add(circle);
    canvasManager.current.add(tri);
    canvasManager.current.add(rect1);
    canvasManager.current.add(rect2);
    canvasManager.current.renderAll();

    return () => {
      canvasManager.current.dispose();
      canvasManager.current = null;
    };
  }, []);

  useEffect(() => {
    if (canvasManager.current?.currentX) {
      setCurrentX(canvasManager.current?.currentX);
    }

    if (canvasManager.current?.currentY) {
      setCurrentY(canvasManager.current?.currentY);
    }
  }, [canvasManager.current?.currentX, canvasManager.current?.currentY]);

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
      x: randomBetween(0, canvasRef.current.height),
      y: randomBetween(0, canvasRef.current.height),
      points: [
        { x: randomBetween(10, 100), y: randomBetween(10, 100) },
        { x: randomBetween(10, 100), y: randomBetween(10, 100) },
        { x: randomBetween(10, 100), y: randomBetween(10, 100) },
      ],
    });
    canvasManager.current.add(tri);
    canvasManager.current.renderAll();
  };

  return (
    <div>
      <p
        style={{
          textAlign: 'center',
          fontSize: '20px',
          marginBottom: '100px',
        }}
      >
        Playground
      </p>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '20%' }}>
          <div>
            <button onClick={handleAddRect}>Add Rect</button>
            <br />
            <button onClick={handleAddTri}>add Triangle</button>
            <br />
            <button onClick={handleAddMultipleRects}>Add Rects</button>
            <br />
            <button
              onClick={() => {
                console.log(canvasManager.current.getObjects());
              }}
            >
              List Objects
            </button>

            <p>
              Position: x = {currentX}, y = {currentY}
            </p>
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
        </div>
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            margin: 'auto',
            border: '1px solid black',
          }}
        />
      </div>
    </div>
  );
}

export default Index;
