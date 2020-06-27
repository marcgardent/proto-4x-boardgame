import { PipelineDelegate, GenerateDelegate, IFxy, MATRIX_OPTIONS } from "./MatrixCore";
import { Fxy } from "./Fxy";

export class Tracer {
  public static *diamon(x, y, rank) {
    //left -> top
    for (let v of this.diagonal(x - rank, y, x, y - rank)) {
      yield v;
    }
    // top -> right
    for (let v of this.diagonal(x, y - rank, x + rank, y)) {
      yield v;
    }

    //right -> bottom
    for (let v of this.diagonal(x + rank, y, x, y + rank)) {
      yield v;
    }

    // bottom -> left
    for (let v of this.diagonal(x, y + rank, x - rank, y)) {
      yield v;
    }
  }

  public static *diagonal(x1, y1, x2, y2) {
    const xA = Math.min(x1, x2);
    const xB = Math.max(x1, x2);

    const yA = Math.min(y1, y2);
    const yB = Math.max(y1, y2);

    for (let x = xA; x < xB; x++) {
      for (let y = yA; y < yB; y++) {
        yield { x: x, y: y };
      }
    }
  }
}

export class MatrixBuilder {
  private pipeline: PipelineDelegate[] = new Array<PipelineDelegate>();

  private constructor(
    public readonly size: number,
    private readonly init: GenerateDelegate
  ) {}

  public clone() {
    const ret = new MatrixBuilder(this.size, this.init);
    ret.pipeline = Array.from(this.pipeline);
    return ret;
  }

  public static fill(fill: IFxy): MatrixBuilder {
    return new MatrixBuilder(MATRIX_OPTIONS.SIZE, (x, y) => {
      return fill(x, y);
    });
  }

  public static identity(m: number[][]) {
    return MatrixBuilder.fill(Fxy.fromMemory(m));
  }

  public static from(init: GenerateDelegate) {
    return new MatrixBuilder(MATRIX_OPTIONS.SIZE, init);
  }

  public static box(
    rank: number,
    fill: IFxy = Fxy.constant(1),
    clear: IFxy = Fxy.constant(0)
  ) {
    const size = MATRIX_OPTIONS.SIZE;

    return new MatrixBuilder(MATRIX_OPTIONS.SIZE, (x, y) => {
      const r = size - 1;
      if (
        ((x == rank || r - rank == x) && y >= rank && y <= r - rank) ||
        ((y == rank || r - rank == y) && x >= rank && x <= r - rank)
      ) {
        return fill(x, y);
      } else {
        return clear(x, y);
      }
    });
  }

  public static weightedAverage(
    size,
    m: IFxy,
    f = 1,
    factors: number[] = [1, 0.5, 0.25, 0.125]
  ) {
    //TODO Debug
    return new MatrixBuilder(size, (x, y) => {
      let ret = m(x, y) * f;
      let weights = f;
      for (let i = 0; i < factors.length; i++) {
        const w = factors[i];
        for (let p of Tracer.diamon(x, y, i + 1)) {
          const v = m(p.x, p.y);
          if (v !== undefined) {
            ret += v * w;
            weights += w;
          }
        }
      }
      return ret / weights;
    });
  }

  public scale(factor: number = 1) {
    this.pipeline.push((x, y, v) => {
      return v * factor;
    });
    return this;
  }

  public mul(factor: IFxy) {
    this.pipeline.push((x, y, v) => {
      return v * factor(x, y);
    });
    return this;
  }

  public inverse() {
    return this.scale(-1);
  }

  public inverseFrom(max = 1) {
    this.pipeline.push((x, y, v) => {
      return max - v;
    });
    return this;
  }
  public add(m: GenerateDelegate) {
    this.pipeline.push((x, y, v) => {
      return v + m(x, y);
    });
    return this;
  }

  private get(x, y) {
    let v = this.init(x, y);
    for (let pipe of this.pipeline) {
      v = pipe(
        x,
        y,
        v
      );
    }
    return v;
  }

  public getOrDefault(x, y, d) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size
      ? this.get(x, y)
      : d;
  }

  public toGenerator() {
    const self = this.clone();
    return (x, y) => {
      return self.get(x, y);
    };
  }

  public toIFxy(d: number) {
    const self = this.clone();
    return (x, y) => {
      return self.getOrDefault(x, y, d);
    };
  }

  public then() {
    return new MatrixBuilder(this.size, this.toGenerator());
  }

  public thenWeightedAverage(
    f: number,
    factors: number[] = [1, 0.5, 0.25, 0.125],
    d: number
  ) {
    return MatrixBuilder.weightedAverage(
      this.size,
      this.toIFxy(d),
      f,
      factors
    );
  }

  public thenBakeAndTrace(
    fill: IFxy,
    ...tracers: Generator<{ x: number; y: number }>[]
  ) {
    const baked = this.toResult();

    for (let tracer of tracers) {
      for (let p of tracer) {
        baked[p.x][p.y] = fill(p.x, p.y);
      }
    }
    return MatrixBuilder.identity(baked);
  }

  public bake() {
    const m = this.toResult();
    return MatrixBuilder.identity(m);
  }

  public toResult() {
    const ret = new Array<Array<number>>();
    for (let x = 0; x < this.size; x++) {
      const row = new Array<number>();
      for (let y = 0; y < this.size; y++) {
        row.push(this.get(x, y));
      }
      ret.push(row);
    }
    return ret;
  }

  public max(m: GenerateDelegate) {
    this.pipeline.push((x, y, v) => {
      return Math.max(m(x, y), v);
    });
    return this;
  }

  public min(m: GenerateDelegate) {
    this.pipeline.push((x, y, v) => {
      return Math.min(m(x, y), v);
    });
    return this;
  }
}
