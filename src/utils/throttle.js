export const throttle = (func, wait = 100) => {
  let waiting, callTime, _this, _args;
  function invoke() {
    const now = Date.now();
    if (now - callTime < wait) return;
    func.apply(_this, _args);
    callTime = now;
  }
  return function (...args) {
    if (waiting) return;
    _this = this;
    _args = args;
    invoke();
    waiting = true;
    setTimeout(() => {
      invoke();
      waiting = false;
    }, wait);
  };
};
