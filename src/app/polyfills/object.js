Object.mapEntries = (o, callbackfn) =>
  Object.fromEntries(Object.entries(o).map(callbackfn));
