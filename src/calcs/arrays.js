import { isArray } from "lodash";
import generators from "../generators";

export default (base, target) => {
  if (!isArray(base) || !isArray(target)) return false;
  return [generators.replace(base, target)];
}
