import * as R from "ramda";

/** @type { import("./_types").TableColumnsFactory } */
export function createTableColumns(columns, _schema = undefined) {
  return columns;
}

function createTablePagination() {
  return {
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0,
  };
}

const composeSortFunctions = R.compose(
  R.reverse,
  R.map(([index, sort]) => {
    const sortMultiplier = sort === "asc" ? 1 : -1;
    const sortFunction = R.sort(
      (a, b) => (a.row[index] > b.row[index] ? -1 : 1) * sortMultiplier
    );
    return R.compose(sortFunction, sortMultiplier < 0 ? R.reverse : (i) => i);
  })
);

export const _tableCtl = {
  composeSortFunctions,
  createTablePagination,
};
