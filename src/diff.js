import calcs from "./calcs";
import concatPaths from "./utils/concatPaths";

const pipeline = {
  "init": "objects",
  "objects": "arrays",
  "arrays": "init"
};

const diff = (base, target, depth = -1, path = {}, calc = "init") => {
  const deltas = calcs[calc](base, target);
  if (!deltas) return false;
  return deltas.reduce((res, delta) => {
    if (delta.action === "recurse" && depth) {
      var deltas;
      while (!(deltas = diff(
        delta.details.from,
        delta.details.to,
        Math.max(-1, depth - 1),
        delta.path,
        calc = pipeline[calc]
      )));
      res.push.apply(res, deltas);
    } else {
      if (delta.action === "recurse") delta.action = "replace";
      res.push(delta);
    }
    return res;
  }, []).map(r => {
    r.path = concatPaths(path, r.path);
    return r;
  });
}

export default diff;
