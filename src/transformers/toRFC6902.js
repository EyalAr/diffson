import toJsonPointer from "../utils/toJsonPointer";

export default oPatch => {
  return oPatch.reduce((res, op) => {
    if (op.action === "add") {
      res.push({
        op: "add",
        path: toJsonPointer(op.path),
        value: op.details.val
      });
    } else if (op.action === "remove") {
      let path = toJsonPointer(op.path);
      res.push({
        op: "test",
        path,
        value: op.details.val
      }, {
        op: "remove",
        path
      });
    } else if (op.action === "replace") {
      let path = toJsonPointer(op.path);
      res.push({
        op: "test",
        path,
        value: op.details.from
      }, {
        op: "replace",
        path,
        value: op.details.to
      });
    }
    return res;
  }, []);
}
