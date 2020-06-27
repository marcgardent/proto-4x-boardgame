

import {Player} from "./Player";
import {Token} from "./Token";

export class Slot {
  public token: Token = null;
  public owner: Player = null;
  public tags = Array<Token>();
}
