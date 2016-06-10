import { isPlainObject, union, flatten } from "lodash";
import initCalc from "./init";

export default (base, target) => {
  if (!isPlainObject(base) || !isPlainObject(target)) return false;
  return flatten(union(Object.keys(base), Object.keys(target)).map(k => {
    return initCalc(base[k], target[k]).map(r => {
      var path = {};
      path[k] = {};
      r.path = path;
      return r;
    });
  }));
}
