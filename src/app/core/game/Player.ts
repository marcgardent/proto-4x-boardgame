import {CITIZEN_BY_PLAYER} from "./Params";
import{Token} from "./Token";

export class Player {
  citizensCounter = CITIZEN_BY_PLAYER;
  happinessCounter = 0;
  foodCounter = 0;

  capital = true;
  exil = false;
  happiness = false;

  constructor(public readonly token: Token, public readonly autoplay = false) {}

  get displayName() {
    return this.token.displayName;
  }
}
