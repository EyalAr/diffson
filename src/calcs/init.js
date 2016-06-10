import { isPlainObject, isArray } from "lodash"
import generators from "../generators";

const ofSameType = (base, target) => {
  return (
    (isPlainObject(base) && isPlainObject(target)) ||
    (isArray(base) && isArray(target))
  );
}

export default (base, target) => {
  if (target === undefined) return [generators.remove(base, target)];
  if (base === undefined) return [generators.add(base, target)];
  if (base === target) return [generators.noop(base, target)];
  if (ofSameType(base, target)) return [generators.recurse(base, target)];
  return [generators.replace(base, target)];
}
