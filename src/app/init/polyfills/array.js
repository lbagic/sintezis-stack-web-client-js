import { collection } from "@lbagic/collections";

Array.prototype.add = function (item, identifier) {
  return collection.add(this, item, identifier);
};
Array.prototype.remove = function (item, identifier) {
  return collection.remove(this, item, identifier);
};
Array.prototype.findOne = function (item, identifier) {
  return collection.findOne(this, item, identifier);
};
Array.prototype.findMany = function (item, identifier) {
  return collection.findMany(this, item, identifier);
};
