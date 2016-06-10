// assumption: 'partial' is a partial array of 'full'.
export default (full, partial) => {
  const res = [];
  var i = 0, j = 0;
  while (j < partial.length) {
    if (full[i] === partial[j]) {
      i++;
      j++;
    } else {
      res.push([i, full[i]]);
      i++;
    }
  }
  return res.concat(full.slice(i).map((v, k) => [k + i, v]));
}
