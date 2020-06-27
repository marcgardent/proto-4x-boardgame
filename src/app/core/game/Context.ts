
import {ContextTokens} from "./ContextTokens";
import {Slot} from "./Slot";
import {Deck} from "./Deck";
import {Player} from "./Player";
import {Token} from "./Token";

import {MAP_SIZE, CITIZEN_BY_PLAYER} from "./Params";
import { FuzzyBot } from "./bots/FuzzyBot";

export class Context extends ContextTokens {
  public readonly playground = new Array<Array<Slot>>();
  public readonly discoveryDeck: Deck<Token>;

  public readonly players = [
    new Player(this.player1, false),
    new Player(this.player2, true)
  ];
  public currentPlayer = this.players[0];

  public console = [];

  info(msg: string) {
    this.console.unshift("[💬 info]" + msg);
  }

  event(msg: string) {
    this.console.unshift("[⚡ event]" + msg);
  }

  action(player, msg) {
    this.console.unshift(
      "[🎲" + player.token.icon + player.token.name + "'s action] " + msg
    );
  }
  
  constructor() {
    super();
    const thefields = new Array<Token>();
    thefields.push(...this.tokens.get(this.field));
    thefields.push(
      ...this.tokens.fromWith(
        [this.common, this.special, this.rare],
        [this.field]
      )
    );
    thefields.push(
      ...this.tokens.fromWith([this.common, this.special], [this.field])
    );
    thefields.push(...this.tokens.fromWith([this.common], [this.field]));

    this.discoveryDeck = new Deck(thefields);
    this.discoveryDeck.fill(
      this.desert,
      MAP_SIZE * MAP_SIZE - this.players.length
    );
    this.discoveryDeck.fill(this.pirate, MAP_SIZE * MAP_SIZE + MAP_SIZE);

    for (let x = 0; x < MAP_SIZE; x++) {
      const row = new Array<Slot>();
      for (let y = 0; y < MAP_SIZE; y++) {
        const card = new Slot();
        card.token = this.fog;
        row.push(card);
      }
      this.playground.push(row);
    }
  }

  expand(player: Player, slot: Slot) {
    if (slot.token.has(this.expandable)) {
      if (!slot.owner && player.citizensCounter > 0) {
        slot.owner = player;
        player.citizensCounter--;
        this.action(player, "he has expanded his territory");
        this.updateStatus(player);
      } else if (slot.owner === player) {
        player.citizensCounter++;
        slot.owner = null;
        this.action(player, "he has reduced his territory");
        this.updateStatus(player);
        if (
          !player.exil &&
          slot.token.has(this.capital) &&
          slot.token.has(player.token)
        ) {
          player.exil = true;
          this.event(
            player.displayName +
              " is exiled because he voluntarily abandoned his capital!"
          );
        }
      }
    }
  }

  explore(player: Player, slot: Slot) {
    if (slot.token.has(this.explorable)) {
      const one = this.discoveryDeck.peakOneRandomly();
      slot.token = one;
      this.action(player, "he has discovered " + slot.token.explain());
    }
  }

  init(player: Player, slot: Slot) {
    if (slot.token.is(this.fog) && player.capital) {
      slot.token = this.tokens.fromWithUnique([this.capital], [player.token]);

      this.expand(player, slot);
      player.capital = false;
      this.action(player, "he has created his capital");
      //this.updateStatus(player);
    }
  }

  extermine(player: Player, slot: Slot) {
    if (slot.owner && slot.owner != player) {
      const target = slot.owner;


      if (
        !slot.owner.exil &&
        slot.token.has(this.capital) &&
        slot.token.has(slot.owner.token)
      ) {
        this.event(
          player.displayName + " is exiled because he has lost his capital!"
        );
        slot.owner.exil = true;
        slot.owner.citizensCounter += 1;
      }

      slot.owner = null;
      this.action(
        player,
        "he has extermine a territory of " + target.displayName
      );
      this.updateStatus(target);
    }
  }

  explain(slot: Slot) {
    this.info(slot.token.explain());
  }

  updateStatus(player: Player) {
    
    const my = [...this.playgroundFlatten()].filter(x => x.owner == player);
    player.happinessCounter = 0;
    player.foodCounter = 0;
    for (let slot of my) {
      if (slot.token.has(this.food)) {
        player.foodCounter += 1 * (slot.token.has(this.twice) ? 2 : 1);
      }
      if (slot.token.has(this.happiness)) {
        player.happinessCounter += 1 * (slot.token.has(this.twice) ? 2 : 1);
      }
    }
    const isFed = my.length <= player.foodCounter;
    const isHappy = my.length <= player.happinessCounter;
     
    player.happiness = isFed && isHappy;
  }

  isWinner(player: Player) {
    if (player.citizensCounter == 0) {
      this.event(player.displayName + " has won ! He completed his territory");
    }
    const notExiled = this.players.filter(x => !x.exil);
    if (notExiled.length == 1) {
      this.event(
        notExiled[0].displayName + " has won ! He's last player not exiled"
      );
    }
  }

  *playgroundFlatten() {
    for (let x = 0; x < MAP_SIZE; x++) {
      for (let y = 0; y < MAP_SIZE; y++) {
        yield this.playground[x][y];
      }
    }
  }

  hasTagGenerator(fill:number, clear:number, ...tokens:Token[]){
    return (x,y) => this.playground[x][y].token.is(...tokens) ? fill : clear;
  }

  isTagGenerator(fill:number, clear:number,...tokens:Token[]){
    return (x,y) => this.playground[x][y].token.is(...tokens) ? fill : clear;
  }

  isHasTagGenerator(fill:number, clear:number, is:Token[],has:Token[]){
    return (x,y) => this.playground[x][y].token.is(...is) && this.playground[x][y].token.has(...has) ? fill : clear;
  }

  autoplay(player:Player){
    const bot = new FuzzyBot(this,player);
    
    const start = Date.now();
    bot.play();
    const end = Date.now();
    this.info("autoplay in " + (end - start) + "ms");
    this.next();
  }

 
  next() {
    const next = this.players.pop();
    this.currentPlayer = next;
    this.players.unshift(next);
    if (this.currentPlayer.autoplay) {
      setTimeout(() => {
        this.autoplay(this.currentPlayer), 0;
      });
    }
  }
}
