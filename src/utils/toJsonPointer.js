const toJsonPointer = path => {
  var nextKey;
  for (let k in path) {
    if (path.hasOwnProperty(k) && path[k]) {
      nextKey = k;
      break;
    }
  }
  return nextKey ? "/" + nextKey + toJsonPointer(path[nextKey]) : "";
}

export default toJsonPointer;
