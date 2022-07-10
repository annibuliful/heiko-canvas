import { I2dPosition } from '../@types/object';

/**
 * convert degree to radian
 * @param angle
 * @returns
 */
export function angleToRadian(angle: number) {
  return (angle * Math.PI) / 180;
}

/**
 * convert radian to degree
 * @param radian
 * @returns
 */
export function radianToAngle(radian: number) {
  return (radian * 180) / Math.PI;
}

/**
 * find angle between two points
 * @param pointA
 * @param pointB
 * @returns
 */
export function angleBetweenTwoPoints(
  pointA: I2dPosition,
  pointB: I2dPosition
) {
  const diffX = pointA.x - pointB.x;
  const diffY = pointA.y - pointB.y;
  const radians = Math.atan2(diffY, diffX);
  const result = radianToAngle(radians);

  return result < 0 ? 360 + result : result;
}

type CalculateRotatePointParam = {
  origin: I2dPosition;
  point: I2dPosition;
  angle: number;
};

/**
 * calculate new point after rotation
 * @link {https://stackoverflow.com/questions/34372480/rotate-point-about-another-point-in-degrees-python}
 * @param param0
 * @returns
 */
export function calculateRotatePoint({
  origin,
  point,
  angle,
}: CalculateRotatePointParam) {
  const degree = angleToRadian(angle);

  const { x: ox, y: oy } = origin;
  const { x: px, y: py } = point;

  const newX = ox + Math.cos(degree) * (px - ox) - Math.sin(degree) * (py - oy);
  const newY = oy + Math.sin(degree) * (px - ox) + Math.cos(degree) * (py - oy);

  return {
    x: newX,
    y: newY,
  };
}

type GetBoundingBoxParam = Omit<
  CalculateRotatePointParam,
  'point' | 'angle'
> & {
  points: I2dPosition[];
  angle?: number;
};

/**
 * return bounding box of an object
 * @param param0
 * @returns
 */
export function getBoundingBox({
  origin,
  points,
  angle = 0,
}: GetBoundingBoxParam) {
  const rotatedPoints = points.map((point) =>
    calculateRotatePoint({ origin, angle, point })
  );
  const rotatedPointX = rotatedPoints.map((point) => point.x);
  const rotatedPointY = rotatedPoints.map((point) => point.y);
  const minX = Math.min(...rotatedPointX);
  const minY = Math.min(...rotatedPointY);
  const maxX = Math.max(...rotatedPointX);
  const maxY = Math.max(...rotatedPointY);

  return {
    topLeft: {
      x: minX,
      y: minY,
    },
    topRight: {
      x: maxX,
      y: minY,
    },
    bottomLeft: {
      x: minX,
      y: maxY,
    },
    bottomRight: {
      x: maxX,
      y: maxY,
    },
  };
}
