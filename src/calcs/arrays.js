import { isArray, difference } from "lodash";
import generators from "../generators";
import lcs from "../utils/lcs";
import expandPartialArray from "../utils/expandPartialArray";
import ofSameComplexType from "../utils/ofSameComplexType";

export default (base, target) => {
  if (!isArray(base) || !isArray(target)) return false;
  const res = [];
  var common = lcs(base, target),
      // 'common' holds fixed elements which are both in base and target
      deletions = difference(base, common),
      // 'deletions' holds elements which are in 'base' but not in 'target'.
      additions = difference(target, common);
      // 'additions' holds elements which are in 'target' but not in 'base'.
  // all of the above arrays are subsequences of a larger array.
  // expand these arrays to be of the same size as the larger array,
  // by making them sparse arrays with gaps.
  common = expandPartialArray(base, common);
  deletions = expandPartialArray(base, deletions);
  additions = expandPartialArray(target, additions);
  var i = 0, // 'base' iterator
      j = 0; // 'target' iterator
  for (; i < base.length; i++) {
    // for each element in the base array, we need to determine what happens
    // to it in the target array.
    if (i in common) {
      // this element exists both in base and in target.
      res.push(generators.noop(common[i], common[i]));
      j++;
    } else if (i in deletions && j in additions) {
      // this element was removed in 'base', but another was added in 'target'
      // at the same positions
      if (ofSameComplexType(deletions[i], additions[j])) {
        res.push(generators.recurse(deletions[i], additions[j]));
      } else {
        res.push(generators.replace(deletions[i], additions[j]));
      }
      j++;
    } else if (j in additions) {
      res.push(generators.add(undefined, additions[j]));
      j++;
    } else if (i in deletions) {
      res.push(generators.remove(deletions[i], undefined));
    }
  }
  // if there are still elements remaining in 'target' which we didn't account
  // for, they must be additions:
  for (; j < target.length; j++) {
    res.push(generators.add(undefined, additions[j]));
  }

  return res.map((r, i) => {
    r.path = new Array(res.length);
    r.path[i] = {};
    return r;
  });
}
