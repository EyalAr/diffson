import isEqual from "./isEqual";

// assumption: 'partial' is a partial array of 'full'.
export default (full, partial) => {
  const res = new Array(full.length);
  for (let i = 0, j = 0; i < full.length; i++) {
    if (isEqual(full[i], partial[j])) {
      res[i] = full[i];
      j++;
    }
  }
  return res;
}
