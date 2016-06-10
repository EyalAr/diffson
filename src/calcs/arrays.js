import { isArray, difference } from "lodash";
import generators from "../generators";
import lcs from "../utils/lcs";
import expandPartialArray from "../utils/expandPartialArray";

export default (base, target) => {
  if (!isArray(base) || !isArray(target)) return false;
  const common = expandPartialArray(base, lcs(base, target)),
        deletions = expandPartialArray(base, difference(base, common)),
        additions = expandPartialArray(target, difference(target, common)),
        resLength = Math.max(base.length, target.length),
        res = new Array(resLength);
  for (let i = 0; i < resLength; i++) {
    if (i in common) res[i] = generators.noop(common[i], common[i]);
    else if (i in additions && i in deletions) res[i] = generators.replace(deletions[i], additions[i]);
    else if (i in additions) res[i] = generators.add(undefined, additions[i]);
    else if (i in deletions) res[i] = generators.remove(deletions[i], undefined);
    res[i].path = new Array(resLength);
    res[i].path[i] = {};
  }
  return res;
}
