import {Player} from "../Player";
import {Context} from "../Context";
import {Deck} from "../Deck";
import {Slot} from "../Slot";


export class NaiveBot {

  constructor(public readonly context: Context, public readonly player: Player) {

  }

  play() {
    const all = [...this.context.playgroundFlatten()];
    //TODO perf implement categorizer Class
    const fogSlots = new Deck<Slot>(
      all.filter(x => x.token == this.context.fog && !x.owner)
    );
    const freeSlots = new Deck<Slot>(all.filter(x => !x.owner));
    const mySlots = new Deck<Slot>(all.filter(x => x.owner == this.player));
    const yoursSlots = new Deck<Slot>(
      all.filter(x => x.owner && x.owner != this.player)
    );
    const freeSlotsFeatured = new Deck<Slot>(
      all.filter(
        x =>
          !x.owner &&
          !x.token.has(this.context.explorable) &&
          x.token != this.context.desert
      )
    );

    if (this.player.capital && fogSlots.length > 0) {
      const spot = fogSlots.peakOneRandomly();
      this.context.init(this.player, spot);
    } else if (this.player.citizensCounter > 0 && fogSlots.length > 0) {
      const a = fogSlots.peakOneRandomly();
      const b = fogSlots.peakOneRandomly();
      const c = fogSlots.peakOneRandomly();

      this.context.explore(this.player, a);
      this.context.explore(this.player, b);
      this.context.explore(this.player, c);
      if (!c.token.has(this.context.cityState)) {
        this.context.expand(this.player, c);
      }
    } else if (this.player.citizensCounter > 0 && freeSlotsFeatured.length > 0) {
      const spot = freeSlotsFeatured.peakOneRandomly();
      this.context.expand(this.player, spot);
    } else if (mySlots.length > 0 && freeSlotsFeatured.length > 0) {
      const from = mySlots.peakOneRandomly();
      const to = freeSlotsFeatured.peakOneRandomly();
      this.context.expand(this.player, from);
      this.context.expand(this.player, to);
    }
  }
}
