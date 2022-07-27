const getMethodNames = (object) =>
  Object.getOwnPropertyNames(object).filter(
    (key) => typeof object[key] === "function"
  );

const advices = [
  "before",
  "after",
  "around",
  "afterReturning",
  "beforeExecuting",
];

const replaceMethod = (target, methodName, aspect, advice) => {
  const method = target[methodName];
  target[methodName] = (...args) => {
    if ("beforeExecuting" === advice)
      return aspect.apply(target, [method, ...args]);
    if (["before", "around"].includes(advice)) aspect.apply(target, args);
    const returnValue = method.apply(target, args);
    if (["after", "around"].includes(advice)) aspect.apply(target, args);
    if ("afterReturning" === advice) return aspect.apply(target, [returnValue]);
    return returnValue;
  };
};

export const injectAspect = (target, aspect, advice, method = null) => {
  if (typeof target !== "object")
    throw new Error("Provided target is not an object.");
  if (typeof aspect !== "function")
    throw new Error("Provided aspect is not a function.");
  if (!advices.includes(advice))
    throw new Error(
      `Provided advice is not valid. Valid advices - ${advices.join(", ")}.`
    );

  if (!method) {
    const methodNames = getMethodNames(target);
    methodNames.forEach((mn) => replaceMethod(target, mn, aspect, advice));
  } else {
    if (typeof method === "string")
      replaceMethod(target, method, aspect, advice);
    else if (Array.isArray(method))
      method.forEach((mn) => replaceMethod(target, mn, aspect, advice));
    else
      throw new Error(
        "Provided method is not a string or array of method names."
      );
  }
};
