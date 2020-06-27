
 import {Token} from "./Token";
 import {Search} from "../lib/Search";

 export class ContextTokens {

  public readonly tokens: Search<Token, Token> = new Search<Token, Token>();

  private addToken(
    icon: string,
    name: string,
    description: string,
    tags: Array<Token> = [],
    inherit = []
  ) {
    const nested = Token.tagsOfTags(inherit);
    tags.push(...nested);
    const token = new Token(icon, name, description, tags);
    for (let tag of tags) {
      this.tokens.addEntry(tag, token);
    }
    return token;
  }

  //meta
  public readonly metatag = this.addToken("🏷️", "metatag", "abstraction");

  //singleton
  public readonly explorable = this.addToken(
    "🌐",
    "explorable",
    "explorable slot"
  );
  public readonly expandable = this.addToken(
    "🚩",
    "expandable",
    "expandable slot"
  );

  public readonly fog = this.addToken("🌫️", "fog", "unknown location", [
    this.explorable
  ]);

  public readonly pirate = this.addToken(
    "🏴‍☠️",
    "pirate",
    "extermine the pirate to explore again",
    [this.explorable]
  );

  public readonly citizen = this.addToken(
    "🧍️",
    "citizen",
    "melpe in player's color"
  );

  //players
  public readonly player = this.addToken("🔘", "player", "", [this.metatag]);
  public readonly player1 = this.addToken("🔴", "red player", "", [
    this.player
  ]);
  public readonly player2 = this.addToken("🟢", "green player", "", [
    this.player
  ]);
  public readonly player3 = this.addToken("🟡", "yellow player", "", [
    this.player
  ]);
  public readonly player4 = this.addToken("🔵", "blue player", "", [
    this.player
  ]);
  public readonly player5 = this.addToken("🟣", "purple player", "", [
    this.player
  ]);
  public readonly player6 = this.addToken("🟠", "orange player", "", [
    this.player
  ]);

  //abstractions
  public readonly military = this.addToken(
    "🛡️",
    "military",
    "strategic military ressource",
    [this.metatag]
  );
  public readonly epoch = this.addToken("#️⃣", "age", "age indicator", [
    this.metatag
  ]);
  public readonly naturalWonder = this.addToken("🌈", "natural wonder", "", [
    this.metatag
  ]);
  public readonly luxury = this.addToken("✨", "luxury", "luxury ressources", [
    this.metatag
  ]);
  public readonly science = this.addToken("🧬", "science", "science", [
    this.metatag
  ]);
  public readonly field = this.addToken("🗺️", "field", "field");
  public readonly cityState = this.addToken(
    "🏰",
    "City-state",
    "independent city",
    [this.metatag]
  );

  //modifiers
  public readonly twice = this.addToken("‼️", "x2", "factor two", [
    this.metatag
  ]);
  public readonly common = this.addToken("💚", "common", "common instances", [
    this.metatag
  ]);
  public readonly special = this.addToken(
    "💛",
    "special",
    "special instances",
    [this.metatag]
  );
  public readonly rare = this.addToken("🧡", "rare", "rare instances", [
    this.metatag
  ]);
  public readonly single = this.addToken("💔", "unique", "unique instance", [
    this.metatag
  ]);
  //epoch
  public readonly epochA = this.addToken("️0️⃣", "stone age", "first age", [
    this.metatag,
    this.epoch
  ]);
  public readonly epochB = this.addToken(
    "️1️⃣",
    "Ancient history",
    "second age",
    [this.metatag, this.epoch]
  );
  public readonly epochC = this.addToken("2️⃣", "middle ages", "third age", [
    this.metatag,
    this.epoch
  ]);
  public readonly epochD = this.addToken(
    "️️3️⃣",
    "modern history",
    "fourth age",
    [this.metatag, this.epoch]
  );
  public readonly epochE = this.addToken(
    "️️4️⃣",
    "Contemporary history",
    "fifth age",
    [this.metatag, this.epoch]
  );

  // military
  public readonly militaryEpochB = this.addToken(
    "🐎",
    "horse",
    "strategy ressource",
    [this.military, this.epochB, this.field, this.expandable, this.rare]
  );
  public readonly militaryEpochC = this.addToken(
    "⚔️",
    "iron",
    "strategy ressource",
    [this.military, this.epochC, this.field, this.expandable, this.rare]
  );
  public readonly militaryEpochD = this.addToken(
    "💣",
    "niter",
    "strategy ressource",
    [this.military, this.epochD, this.field, this.expandable, this.rare]
  );
  public readonly militaryEpochE = this.addToken(
    "🛢️",
    "oil",
    "strategy ressource",
    [this.military, this.epochE, this.field, this.expandable, this.rare]
  );

  // needs
  public readonly food = this.addToken("🍲", "food", "food ressource", [
    this.metatag
  ]);
  public readonly happiness = this.addToken(
    "😊",
    "happiness",
    "happiness ressource",
    [this.metatag]
  );

  public readonly rice = this.addToken("🌾", "rice", "ordinary food", [
    this.food,
    this.twice,
    this.field,
    this.expandable,
    this.common
  ]);
  public readonly corn = this.addToken("🌽", "corn", "ordinary food", [
    this.food,
    this.twice,
    this.field,
    this.expandable,
    this.common
  ]);
  public readonly wheat = this.addToken("🌿", "wheat", "ordinary food", [
    this.food,
    this.twice,
    this.field,
    this.expandable,
    this.common
  ]);

  public readonly crab = this.addToken("🦀", "crab", "luxury food", [
    this.food,
    this.happiness,
    this.field,
    this.expandable,
    this.special
  ]);
  public readonly grapes = this.addToken("🍇", "grapes", "luxury food", [
    this.food,
    this.happiness,
    this.field,
    this.expandable,
    this.special
  ]);
  public readonly tangerine = this.addToken("🍊", "tangerine", "luxury food", [
    this.food,
    this.happiness,
    this.field,
    this.expandable,
    this.special
  ]);
  public readonly strawberry = this.addToken(
    "🍓",
    "strawberry",
    "luxury food",
    [this.food, this.happiness, this.field, this.expandable, this.special]
  );
  public readonly cow = this.addToken("🐄", "cow", "luxury food", [
    this.food,
    this.happiness,
    this.field,
    this.expandable,
    this.special
  ]);

  public readonly gemStone = this.addToken("💎", "gem", "luxury ressource", [
    this.happiness,
    this.twice,
    this.luxury,
    this.field,
    this.expandable,
    this.special
  ]);
  public readonly fox = this.addToken("🦊", "foxes", "luxury ressource", [
    this.happiness,
    this.twice,
    this.luxury,
    this.field,
    this.expandable,
    this.special
  ]);
  public readonly hibiscus = this.addToken(
    "🌺",
    " Hibiscus",
    "luxury ressource",
    [
      this.happiness,
      this.twice,
      this.luxury,
      this.field,
      this.expandable,
      this.special
    ]
  );

  public readonly wonderA = this.addToken(
    "🌊",
    "Great Barrier Reef",
    "natural wonder",
    [
      this.happiness,
      this.science,
      this.naturalWonder,
      this.field,
      this.expandable,
      this.single
    ]
  );
  public readonly wonderB = this.addToken(
    "🏔️",
    "Mount Everest",
    "natural wonder",
    [
      this.happiness,
      this.science,
      this.naturalWonder,
      this.field,
      this.expandable,
      this.single
    ]
  );
  public readonly wonderC = this.addToken(
    "🌌",
    "Aurora Borealis",
    "natural wonder",
    [
      this.happiness,
      this.science,
      this.naturalWonder,
      this.field,
      this.expandable,
      this.single
    ]
  );
  public readonly wonderD = this.addToken(
    "🌋",
    "Parícutin, Mexico",
    "natural wonder",
    [
      this.happiness,
      this.science,
      this.naturalWonder,
      this.field,
      this.expandable,
      this.single
    ]
  );
  public readonly wonderE = this.addToken(
    "🏖️",
    "Rio de Janeiro",
    "natural wonder",
    [
      this.happiness,
      this.science,
      this.naturalWonder,
      this.field,
      this.expandable,
      this.single
    ]
  );
  public readonly wonderF = this.addToken(
    "🏜️",
    "Grand Canyon",
    "natural wonder",
    [
      this.happiness,
      this.science,
      this.naturalWonder,
      this.field,
      this.expandable,
      this.single
    ]
  );
  public readonly wonderG = this.addToken(
    "🏞️",
    "Victoria Falls",
    "natural wonder",
    [
      this.happiness,
      this.science,
      this.naturalWonder,
      this.field,
      this.expandable,
      this.single
    ]
  );

  public readonly cityA = this.addToken("🏰", "Geneva", "city", [
    this.field,
    this.cityState,
    this.single
  ]);
  public readonly cityB = this.addToken("🏰", "Carthage", "city", [
    this.field,
    this.cityState,
    this.single
  ]);
  public readonly cityC = this.addToken("🏰", "Hong Kong", "city", [
    this.field,
    this.cityState,
    this.single
  ]);
  public readonly cityD = this.addToken("🏰", "Jerusalem", "city", [
    this.field,
    this.cityState,
    this.single
  ]);
  public readonly cityE = this.addToken("🏰", "Zanzibar", "city", [
    this.field,
    this.cityState,
    this.single
  ]);
  public readonly cityF = this.addToken("🏰", "Valletta", "city", [
    this.field,
    this.cityState,
    this.single
  ]);
  public readonly cityG = this.addToken("🏰", "Stockholm", "city", [
    this.field,
    this.cityState,
    this.single
  ]);

  public readonly capital = this.addToken(
    "👑",
    "capital",
    "player's capital",
    []
  );
  public readonly capital1 = this.addToken(
    "👑",
    "red's capital",
    "player's capital",
    [
      this.player1,
      this.capital,
      this.food,
      this.happiness,
      this.twice,
      this.expandable,
      this.single
    ]
  );
  public readonly capital2 = this.addToken(
    "👑",
    "green's capital",
    "player's capital",
    [
      this.player2,
      this.capital,
      this.food,
      this.happiness,
      this.twice,
      this.expandable,
      this.single
    ]
  );
  public readonly capital3 = this.addToken(
    "👑",
    "yellow's capital",
    "player's capital",
    [
      this.player3,
      this.capital,
      this.food,
      this.happiness,
      this.twice,
      this.expandable,
      this.single
    ]
  );
  public readonly capital4 = this.addToken(
    "👑",
    "blue's capital",
    "player's capital",
    [
      this.player4,
      this.capital,
      this.food,
      this.happiness,
      this.twice,
      this.expandable,
      this.single
    ]
  );
  public readonly capital5 = this.addToken(
    "👑",
    "purple's capital",
    "player's capital",
    [
      this.player5,
      this.capital,
      this.food,
      this.happiness,
      this.twice,
      this.expandable,
      this.single
    ]
  );
  public readonly capital6 = this.addToken(
    "👑",
    "orange's capital",
    "player's capital",
    [
      this.player6,
      this.capital,
      this.food,
      this.happiness,
      this.twice,
      this.expandable,
      this.single
    ]
  );

  public readonly desert = this.addToken(
    "⚪",
    "desert",
    "location without ressources",
    [this.field, this.common, this.expandable]
  ); 

}