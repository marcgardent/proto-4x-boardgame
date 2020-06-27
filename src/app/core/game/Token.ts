
export class Token {
  constructor(
    public readonly icon: string,
    public readonly name: string,
    public readonly description: string,
    public readonly tags: Array<Token> = []
  ) {}

  explain() {
    return (
      
      this.icon +
      this.name +
      " (" +
      this.tags.map(x => x.displayName).join(", ")+ ")"
    );
  }

  is(...tokens: Token[]) {
    for(let t of tokens){
      if (this === t) return true; 
    }
    return false;
  }

  has(...tokens: Token[]) {
    for(let t of tokens){
      if (this.tags.indexOf(t) < 0) return false; 
    }
    return true;
  }

  get displayName() {
    return this.icon + this.name;
  }

  static *expandNestedtag(tokens: Array<Token>) {
    for (let tag of tokens) {
      yield tag;
      for (let nested of Token.expandNestedtag(tag.tags)) {
        yield nested;
      }
    }
  }

  static *tagsOfTags(tokens: Array<Token>) {
    for (let tag of tokens) {
      yield tag;
      for (let nested of tag.tags) {
        yield nested;
      }
    }
  }
}
