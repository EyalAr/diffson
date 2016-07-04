import { maxBy } from "lodash";

class Memory {
  constructor(n, m) {
    this.m = m;
    this.mem = new Array(n * m);
  }

  _toIndex(i, j) {
    return this.m * i + j;
  }

  get(i, j) {
    return this.mem[this._toIndex(i, j)];
  }

  set(i, j, val) {
    return this.mem[this._toIndex(i, j)] = val;
  }

  getOrSet(i, j, setter) {
    return (
      this.get(i, j) ||
      this.set(i, j, setter())
    );
  }
}

class LCSWrapper {
  constructor(lcs) {
    this.lcs = lcs;
  }

  toArray() {
    return this.lcs.map(e => e.e_a1);
  }

  getFromA1(i) {
    return this.lcs[i].e_a1;
  }

  getFromA2(i) {
    return this.lcs[i].e_a2;
  }

  equalsAtA1(i, other) {
    if (i >= this.lcs.length) return false;
    return other === this.getFromA1(i);
  }

  equalsAtA2(i, other) {
    if (i >= this.lcs.length) return false;
    return other === this.getFromA2(i);
  }

  getLength() {
    return this.lcs.length;
  }
}

const longest = (a1, a2) => maxBy([a1, a2], a => a.length);

const lcs = (a1, a2, isEqual, mem) => {
  if (!a1.length || !a2.length) return [];
  if (isEqual(a1[a1.length - 1], a2[a2.length - 1])) return mem.getOrSet(
    a1.length - 1,
    a2.length - 1,
    () => lcs(a1.slice(0, -1), a2.slice(0, -1), isEqual, mem)
  ).concat({ e_a1: a1[a1.length - 1], e_a2: a2[a2.length - 1] });
  return longest(
    mem.getOrSet(
      a1.length - 1,
      a2.length,
      () => lcs(a1.slice(0, -1), a2, isEqual, mem)
    ),
    mem.getOrSet(
      a1.length,
      a2.length - 1,
      () => lcs(a1, a2.slice(0, -1), isEqual, mem)
    )
  );
};

export default (a1, a2, isEqual) => {
  const mem = new Memory(a1.length, a2.length);
  return new LCSWrapper(lcs(a1, a2, isEqual, mem));
};
