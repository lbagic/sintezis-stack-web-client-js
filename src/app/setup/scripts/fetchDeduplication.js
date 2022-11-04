const map = new Map();
const { fetch } = window;

window.fetch = async (...args) => {
  try {
    const uid = JSON.stringify(args);
    const saved = map.get(uid);
    const call = saved ?? fetch(...args);
    if (!saved) map.set(uid, call);
    else console.log("⮑ repeated call");
    const res = await call;
    map.delete(uid);
    return res.clone();
  } catch (err) {
    console.warn(err);
  }
};
