
export class Deck<TValue> {
  constructor(public readonly elements: Array<TValue>) {}
  peakOneRandomly() {
    return this.elements.splice(
      Math.floor(Math.random() * this.elements.length),
      1
    )[0];
  }

  fill(token: TValue, max: number) {
    while (this.elements.length < max) {
      this.elements.push(token);
    }
  }

  get length() {
    return this.elements.length;
  }
}
