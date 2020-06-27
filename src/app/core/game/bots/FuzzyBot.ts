import {Player} from "../Player";
import {Context} from "../Context";
import {MatrixBuilder} from "../../lib/MatrixBuilder"
import { PipelineDelegate, GenerateDelegate, IFxy, MATRIX_OPTIONS } from "../../lib/MatrixCore";
import { Fxy } from "../../lib/Fxy";
import {MAP_SIZE} from "../Params";

export class FuzzyBot {
  constructor(public readonly context: Context,  readonly player: Player) {
  }

  play() {
    MATRIX_OPTIONS.SIZE = MAP_SIZE;
    const ring2 = MatrixBuilder.box(2);
    const ring3 = MatrixBuilder.box(3);
    const ring4 = MatrixBuilder.box(4);
    if (this.player.capital) {
      const fogMask = MatrixBuilder.from(
        this.context.isTagGenerator(1, 0, this.context.fog)
      );
      const tiersMask = MatrixBuilder.from(
        this.context.hasTagGenerator(1, 0, this.context.capital)
      );
      
      console.debug("-------------------------------------");
      const margin = 2;
      
      for (let row of MatrixBuilder
        .fill(Fxy.centredBox(2, Fxy.One, Fxy.Zero))
        .mul(Fxy.centredBox(3, Fxy.Zero, Fxy.One ))
        .toResult()) {
        console.debug(row);
      }
    }
  }
}
