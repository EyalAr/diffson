import { maxBy } from "lodash";
import isEqual from "./isEqual";

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

const longest = (a1, a2) => maxBy([a1, a2], a => a.length);

const lcs = (a1, a2, mem) => {
  mem = mem || new Memory(a1.length, a2.length);
  if (!a1.length || !a2.length) return [];
  if (isEqual(a1[a1.length - 1], a2[a2.length - 1])) return mem.getOrSet(
    a1.length - 1,
    a2.length - 1,
    () => lcs(a1.slice(0, -1), a2.slice(0, -1), mem)
  ).concat(a1[a1.length - 1]);
  return longest(
    mem.getOrSet(
      a1.length - 1,
      a2.length,
      () => lcs(a1.slice(0, -1), a2, mem)
    ),
    mem.getOrSet(
      a1.length,
      a2.length - 1,
      () => lcs(a1, a2.slice(0, -1), mem)
    )
  );
};

export default lcs;
