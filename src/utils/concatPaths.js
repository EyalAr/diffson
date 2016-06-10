import { cloneDeep } from "lodash";

const concatPaths = (p1, p2) => {
  p1 = cloneDeep(p1);
  for (let k in p1) {
    if (p1.hasOwnProperty(k)) {
      if (p1[k]) {
        p1[k] = concatPaths(p1[k], p2);
        return p1;
      }
    }
  }
  Object.assign(p1, p2);
  return p1;
}

export default concatPaths;
