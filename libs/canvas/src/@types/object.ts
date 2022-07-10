export interface I2dPosition {
  x: number;
  y: number;
}

export interface I3dPosition extends I2dPosition {
  y: number;
  z: number;
}

export interface I2dDimension {
  width: number;
  height: number;
}

export interface I3dDimension extends I2dDimension {
  depth: number;
}

export interface IBoundingBox {
  topLeft: I2dPosition;
  topRight: I2dPosition;
  middleLeft: I2dPosition;
  middleRight: I2dPosition;
  bottomLeft: I2dPosition;
  bottomRight: I2dPosition;
}
