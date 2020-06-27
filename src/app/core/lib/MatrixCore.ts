
export interface PipelineDelegate {
  (x: number, y: number, v: number): number;
}

export interface GenerateDelegate {
  (x: number, y: number): number;
}

export interface IFxy {
  (x: number, y: number): number;
}

export interface IFx {
  (x: number, y: number): number;
}


export var MATRIX_OPTIONS = {
  SIZE : 32
};