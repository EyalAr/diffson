import { isUndefined, isEqual } from "lodash"
import generators from "../generators";
import ofSameComplexType from "../utils/ofSameComplexType";

export default (base, target) => {
  if (isUndefined(target)) return [generators.remove(base, target)];
  if (isUndefined(base)) return [generators.add(base, target)];
  if (isEqual(base, target)) return [generators.noop(base, target)];
  if (ofSameComplexType(base, target)) return [generators.recurse(base, target)];
  return [generators.replace(base, target)];
}
