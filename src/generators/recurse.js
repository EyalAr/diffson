export default (base, target) => {
  return {
    action: "recurse",
    path: {},
    details: {
      from: base,
      to: target
    }
  };
}
