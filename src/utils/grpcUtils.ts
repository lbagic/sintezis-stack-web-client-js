const scalarInputMap = {
  1: "number", //  DOUBLE = 1,
  2: "number", //  FLOAT = 2,
  3: "number", //  INT64 = 3,
  4: "number", //  UINT64 = 4,
  5: "number", //  INT32 = 5,
  6: "number", //  FIXED64 = 6,
  7: "number", //  FIXED32 = 7,
  8: "checkbox", //  BOOL = 8,
  9: "text", //  STRING = 9,
  // 12: "number", //  BYTES = 12,
  13: "number", //  UINT32 = 13,
  15: "number", //  SFIXED32 = 15,
  16: "number", //  SFIXED64 = 16,
  17: "number", //  SINT32 = 17,
  18: "number", //  SINT64 = 18
};

export const getScalarInputType = (scalar: keyof typeof scalarInputMap) =>
  scalarInputMap[scalar];
export const isPrimitiveScalar = (scalar: keyof typeof scalarInputMap) =>
  !!scalarInputMap[scalar];

// import { Order } from "./gen/order_pb";
// import { User } from "./gen/user_pb";
// const createEntityFilters = (T, path = "") =>
//   T.fields.list().reduce((a, c) => {
//     const fieldName = c.localName.toPascalCase();
//     const pathName = path ? `${path}.${fieldName}` : fieldName;
//     if (c.repeated) return a;
//     if (c.kind === "scalar") a[pathName] = c.T;
//     else Object.assign(a, createEntityFilters(c.T, pathName));
//     return a;
//   }, {});

// const user = User.fields.list();
// const order = Order.fields.list();
// const orderFilters = createEntityFilters(Order);
// console.log({ user, order, orderFilters });
