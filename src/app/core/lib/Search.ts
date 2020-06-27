

export class Search<TIndex, TValue> {
  public indexToValue = new Map<TIndex, TValue[]>();
  public valueToIndex = new Map<TValue, TIndex[]>();
  public indexes = new Set<TIndex>();

  public addEntry(index: TIndex, value: TValue) {
    this.merge(this.indexToValue, index, value);
    this.merge(this.valueToIndex, value, index);
    this.indexes.add(index);
  }

  private merge<MKey, MValue>(
    target: Map<MKey, MValue[]>,
    key: MKey,
    value: MValue
  ) {
    if (target.has(key)) {
      target.get(key).push(value);
    } else {
      target.set(key, [value]);
    }
  }

  public fromWithUnique(from: TIndex[], where: TIndex[]) {
    const request = this.fromWith(from, where);
    return request.size == 1 ? request.values().next().value : null;
  }

  public fromWith(from: TIndex[], where: TIndex[]) {
    const result = new Set<TValue>();

    for (let k of from) {
      for (let v of this.get(k)) {
        if (this.WhereIs(v, where)) {
          result.add(v);
        }
      }
    }
    return result;
  }

  public getInverse(value: TValue) {
    if (this.valueToIndex.has(value)) {
      return Array.from(this.valueToIndex.get(value));
    } else {
      return [];
    }
  }

  public get(index: TIndex) {
    if (this.indexToValue.has(index)) {
      return Array.from(this.indexToValue.get(index));
    } else {
      return [];
    }
  }

  public WhereIs(v: TValue, where: TIndex[]): boolean {
    if (this.valueToIndex.has(v)) {
      const all = this.valueToIndex.get(v);
      for (let i of where) {
        if (all.indexOf(i) < 0) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
}
