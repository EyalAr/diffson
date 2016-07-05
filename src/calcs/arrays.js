import { isArray, isEqual, reduce } from "lodash";
import generators from "../generators";
import lcs from "../utils/lcs";
import ofSameComplexType from "../utils/ofSameComplexType";

const optimize = (res, len) => {
  const ores = {};
  for (let i = 0; i < len; i++) {
    const val = res[i];
    if (!val) continue;
    if (val.length === 1 || val[0].action === "noop") {
      ores[i] = val;
      continue;
    }
    const removedVal = val[0].details.val,
          addedVal = val[1].details.val;
    if (ofSameComplexType(removedVal, addedVal)) {
      ores[i] = val;
      continue;
    }
    const nextVal = res[i + 1];
    if (
      nextVal && nextVal.length === 1 && nextVal[0].action === "remove" &&
      ofSameComplexType(addedVal, nextVal[0].details.val)
    ) {
      // it makes more sense to shift the addition to the next index
      // if it's going to be substituted with a "recurse" action along
      // with the next element's removal (if they are of the same complex type)
      nextVal.push(val.pop());
    }
    ores[i] = val;
  }
  return ores;
}

export default (base, target) => {
  if (!isArray(base) || !isArray(target)) return false;

  var res = {};
  const common = lcs(base, target, isEqual);

  for (let i = 0, k = 0; i < base.length; i++) {
    // for each element in the base array, we need to determine if it's removed
    // or not.
    if (!common.equalsAtA1(k, base[i])) {
      res[i] = [ generators.remove(base[i], undefined) ];
    } else {
      res[i] = [ generators.noop(base[i], undefined) ];
      k++;
    }
  }

  for (let i = 0, k = 0; i < target.length; i++) {
    // for each element in the target array, we need to determine if it's added
    // or not.
    if (!common.equalsAtA2(k, target[i])) {
      res[i] = res[i] || [];
      res[i].push(generators.add(undefined, target[i]));
    } else {
      k++;
    }
  }

  res = optimize(res, Math.max(base.length, target.length));

  var indexShift = 0;
  res = reduce(res, (acc, val, key) => {
    if (val.length === 1) {
      val = val[0];
    } else if (val[0].action === "noop") {
      val = val[1];
    } else if (ofSameComplexType(val[0].details.val, val[1].details.val)) {
      val = generators.recurse(val[0].details.val, val[1].details.val);
    } else {
      val = generators.replace(val[0].details.val, val[1].details.val);
    }
    var index = +key + indexShift;
    val.path = new Array(index);
    val.path[index] = {};
    acc.push(val);
    if (val.action === "remove") indexShift--;
    else if (val.action === "add") indexShift++;
    return acc;
  }, []);

  return res;
}
