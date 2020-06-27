import { IFxy, MATRIX_OPTIONS } from "./MatrixCore";

export class Fxy {

  public static One = Fxy.constant(1);
  public static Zero = Fxy.constant(0);

  public static constant(c: number) {
    return (x, y) => {
      return c;
    };
  }

  public static fromMemory(m: number[][], d: number = 0) {
    return (x, y) => {
      return m[x] ? (m[x][y] ? m[x][y] : d) : d;
    };
  }

  public static random(min: number, max: number) {
    const range = max - min;
    return (x, y) => {
      return min + Math.random() * range;
    };
  }

  public static diagRightSpace(fill: IFxy, clear: IFxy) {
    return (x, y) => {
      return y >= x ? fill(x, y) : clear(x, y);
    };
  }

  public static diagLeftSpace(fill: IFxy, clear: IFxy) {
    return (x, y) => {
      return y <= x ? fill(x, y) : clear(x, y);
    };
  }

  public static diagLine(fill: IFxy, clear: IFxy) {
    return (x, y) => {
      return y == x ? fill(x, y) : clear(x, y);
    };
  }

  public static hLine(h: number, fill: IFxy, clear: IFxy) {
    return (x, y) => {
      return h == x ? fill(x, y) : clear(x, y);
    };
  }

  public static vLine(v: number, fill: IFxy, clear: IFxy) {
    return (x, y) => {
      return v == x ? fill(x, y) : clear(x, y);
    };
  }

  public static rightSpace(minv, fill: IFxy, clear: IFxy) {
    return (x, y) => {
      return y >= minv ? fill(x, y) : clear(x, y);
    };
  }

  public static leftSpace(maxv: number, fill: IFxy, clear: IFxy) {
    return (x, y) => {
      return y <= maxv ? fill(x, y) : clear(x, y);
    };
  }

  public static topSpace(maxh: number, fill: IFxy, clear: IFxy) {
    return (x, y) => {
      return x <= maxh ? fill(x, y) : clear(x, y);
    };
  }

  public static bottomSpace(minh: number, fill: IFxy, clear: IFxy) {
    return (x, y) => {
      return x >= minh ? fill(x, y) : clear(x, y);
    };
  }

  public static hStrip(minh: number, maxh: number, fill: IFxy, clear: IFxy) {
    return Fxy.topSpace(maxh, Fxy.bottomSpace(minh, fill, clear), clear);
  }

  public static vStrip(minv: number, maxv: number, fill: IFxy, clear: IFxy) {
    return Fxy.leftSpace(maxv, Fxy.rightSpace(minv, fill, clear), clear);
  }

  public static rectangle(
    minv: number,
    maxv: number,
    minh: number,
    maxh: number,
    fill: IFxy,
    clear: IFxy
  ) {
    return Fxy.vStrip(minv, maxv, Fxy.hStrip(minh, maxh, fill, clear), clear);
  }

  public static centredBox(margin: number, fill: IFxy, clear: IFxy) {
    return Fxy.rectangle(
      margin,
      MATRIX_OPTIONS.SIZE - margin - 1,
      margin,
      MATRIX_OPTIONS.SIZE - margin - 1,
      fill,
      clear
    );
  }

  public static distance(cx: number, cy: number) {
    return (x, y) => {
      return Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2));
    };
  }
}
