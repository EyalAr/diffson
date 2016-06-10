export default (base, target) => {
  return {
    action: "replace",
    path: {},
    details: {
      from: base,
      to: target
    }
  };
}
