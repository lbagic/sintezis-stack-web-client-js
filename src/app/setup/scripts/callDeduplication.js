const map = new Map();
const { fetch } = window;

window.fetch = async (...args) => {
  try {
    let req = args.at(-1);
    if (!(req instanceof Request)) req = { ...req, url: args[0] };
    const uid = JSON.stringify(req, ["method", "url", "body", "headers"]);
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
