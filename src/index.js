import diff from "./diff";
import toRFC6902 from "./transformers/toRFC6902";

export default (base, target, depth) => {
  return toRFC6902(diff(base, target, depth));
};
