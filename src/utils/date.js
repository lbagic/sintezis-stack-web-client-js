const formatUTCDate = (
  format = "-ds, -m/-d/-y, -h2:-min2:-sec2",
  date,
  hour12 = false
) => formatDate(format, date, hour12, "UTC");

const optionMap = { s: "short", l: "long", 2: "2-digit" };
const formatDate = (
  format = "-ds, -m/-d/-y, -h2:-min2:-sec2",
  date,
  hour12 = false,
  timeZone = undefined
) => {
  if (!date) throw new Error("Date is required");
  const timeMap = {
    hour: ["-h2", "-h"],
    minute: ["-min2", "-min"],
    second: ["-sec2", "-sec"],
    weekday: ["-dl", "-ds"],
    day: ["-d2", "-d"],
    month: ["-ml", "-ms", "-m2", "-m"],
    year: ["-y2", "-y"],
  };
  const _date = new Date(date);
  const formatFn = (options) => {
    const config = { ...options, hour12 };
    if (timeZone) config.timeZone = timeZone;
    return new Intl.DateTimeFormat("en-US", config).format(_date);
  };
  let result = Object.entries(timeMap).reduce((a, [option, values]) => {
    values.forEach((timeMapValue) => {
      const lastChar = timeMapValue[timeMapValue.length - 1];
      const optValue = optionMap[lastChar] ?? "numeric";
      let newVal = formatFn({ [option]: optValue });
      if (optValue === "2-digit" && newVal.length === 1) newVal = `0${newVal}`;
      if (option === "hour" && optValue !== "2-digit" && newVal[0] === "0")
        newVal = newVal.slice(1);
      // if (option === "hour" && optValue === "2-digit" && newVal === "24")
      //   newVal = "00";
      format = format.replace(timeMapValue, newVal);
    });
    return format;
  }, format);
  [" PM", " AM", " pm", " am"].forEach((timeSuffix) => {
    if (result.includes(timeSuffix))
      result = result.replace(timeSuffix, "") + timeSuffix;
  });
  return result;
};

const formatDifference = (
  format = "-d Days, -h Hours, -min Minutes",
  start,
  end
) => {
  if (start === undefined || end === undefined)
    throw new Error("Start and end date is required.");
  const startTime = typeof start === "number" ? start : Date.parse(start);
  const endTime = typeof end === "number" ? end : Date.parse(end);
  const timeMap = [
    ["-w", 7 * 24 * 60 * 60],
    ["-d", 24 * 60 * 60],
    ["-h2", 60 * 60, true],
    ["-h", 60 * 60],
    ["-min2", 60, true],
    ["-min", 60],
    ["-sec2", 1, true],
    ["-sec", 1],
  ].filter((prefixSetting) => format.includes(prefixSetting[0]));
  return timeMap
    .reduce((a, [param, divider, twoDigit], i) => {
      const mod = timeMap[i - 1] ? timeMap[i - 1][1] / divider : false;
      const value = Math.floor((endTime - startTime) / (1000 * divider));
      // const result = [param, mod ? value % mod : value]
      const result = String(mod ? value % mod : value);
      const twoDigitResult = twoDigit
        ? result.length === 1
          ? 0 + result
          : result
        : result;
      a.push([param, twoDigitResult]);
      return a;
    }, [])
    .reduce((a, [param, value]) => a.replace(param, value), format);
};

const formatDuration = (
  format = "-d Days, -h Hours, -min Minutes",
  timestamp
) => formatDifference(format, 0, timestamp);

const toMilis = (duration = { seconds: 0, minutes: 0, hours: 0, days: 0 }) => {
  const transform = {
    seconds: (x) => x * 1000,
    minutes: (x) => x * 1000 * 60,
    hours: (x) => x * 1000 * 60 * 60,
    days: (x) => x * 1000 * 60 * 60 * 24,
    weeks: (x) => x * 1000 * 60 * 60 * 24 * 7,
  };
  return Object.entries(duration)
    .map(([key, value]) => transform[key](value))
    .filter((x) => x !== undefined)[0];
};

const prettyDurationRe = /^(0d|0h|00m|0m)/;
export const date = {
  format: formatDate,
  formatUTC: formatUTCDate,
  difference: formatDifference,
  duration: formatDuration,
  prettyDuration: (format) => (timestamp) =>
    formatDuration(format, timestamp)
      .split(" ")
      .filter((el) => !prettyDurationRe.test(el))
      .join(" "),
  miliseconds: toMilis,
};
