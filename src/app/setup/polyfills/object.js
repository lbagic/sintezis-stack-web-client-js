Object.map = (o, callbackfn) =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, callbackfn(v, k)]));

Object.filter = (o, callbackfn) =>
  Object.fromEntries(Object.entries(o).filter(([k, v]) => callbackfn(v, k)));

Object.reduce = (o, callbackfn, initialValue) =>
  Object.entries(o).reduce((a, [k, v]) => callbackfn(a, v, k), initialValue);
