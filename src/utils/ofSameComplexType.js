import { isPlainObject, isArray } from "lodash"

export default (base, target) => {
  return (
    (isPlainObject(base) && isPlainObject(target)) ||
    (isArray(base) && isArray(target))
  );
}
