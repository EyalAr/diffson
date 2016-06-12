import { isArray, difference } from "lodash";
import generators from "../generators";
import lcs from "../utils/lcs";
import expandPartialArray from "../utils/expandPartialArray";

export default (base, target) => {
  if (!isArray(base) || !isArray(target)) return false;
  const common = lcs(base, target),
        deletions = difference(base, common),
        additions = difference(target, common),
        commonExp = expandPartialArray(base, common),
        deletionsExp = expandPartialArray(base, deletions),
        additionsExp = expandPartialArray(target, additions),
        res = [];
  var i = 0, j = 0;
  for (; i < base.length; i++) {
    if (i in commonExp) {
      res.push(generators.noop(commonExp[i], commonExp[i]));
      j++;
    } else if (j in additionsExp && i in deletionsExp) {
      res.push(generators.recurse(deletionsExp[i], additionsExp[j]));
      j++;
    } else if (j in additionsExp) {
      res.push(generators.add(undefined, additionsExp[j]));
      j++;
    } else if (i in deletionsExp) {
      res.push(generators.remove(deletionsExp[i], undefined));
    }
  }
  for (; j < target.length; j++) {
    res.push(generators.add(undefined, additionsExp[j]));
  }
  return res.map((r, i) => {
    r.path = new Array(res.length);
    r.path[i] = {};
    return r;
  });
}
