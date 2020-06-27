import { Component, HostListener, VERSION } from "@angular/core";
import {Context} from "./core/game/Context";
import {Slot} from "./core/game/Slot";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public action = "expand";
  public readonly context = new Context();

  constructor() {}

  public process(slot: Slot) {
    if (this.action == "expand") {
      this.context.expand(this.context.currentPlayer, slot);
      this.context.isWinner(this.context.currentPlayer);
    } else if (this.action == "explain") {
      this.context.explain(slot);
    } else if (this.action == "explore") {
      this.context.explore(this.context.currentPlayer, slot);
      this.context.isWinner(this.context.currentPlayer);
    } else if (this.action == "init") {
      this.context.init(this.context.currentPlayer, slot);
    } else if ((this.action = "extermine")) {
      this.context.extermine(this.context.currentPlayer, slot);
    }
  }

  autoplay() {
    this.context.autoplay(this.context.currentPlayer);
  }

  next() {
    this.context.next();
  }

  @HostListener("window:keydown.space", ["$event"])
  bindNext(event: KeyboardEvent) {
    event.preventDefault();
    this.next();
  }
}

