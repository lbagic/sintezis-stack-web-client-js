<script setup>
import * as R from "ramda";
import { onMounted, reactive, watch } from "vue";
import TableIconDelete from "./icons/TableIconDelete.vue";
import TableIconEdit from "./icons/TableIconEdit.vue";
import TableIconInfo from "./icons/TableIconInfo.vue";

// TODO - pagination, select, search, sort
// TODO - compose filtering > sorting > pagination
const emit = defineEmits(["edit", "delete", "info"]);
const props = defineProps({
  data: Array,
  columns: Array,
  search: String,
  useSearch: Boolean,
  useSort: Boolean,
  useEdit: Boolean,
  useDelete: Boolean,
  useInfo: Boolean,
});
const tableRef = $ref(null);
const cssVars = reactive({
  cellPaddingX: 0,
  iconGap: 0,
  iconSize: 0,
});

function getTableCssVar(name) {
  return getComputedStyle(tableRef).getPropertyValue(name);
}

if (!props.columns) throw new Error('Prop "columns" must be provided.');
const optInState = (colState, propState) =>
  colState || (propState && colState === undefined) ? true : false;

const sortOrders = $ref(new Map());
const activeLabel = $computed(() => [...sortOrders.keys()].at(-1));

const cfg = $computed(() => {
  /** @type {{ labels: string[], fields: ((item: object) => any)[], searchableIndexes: number[], sortableLabels: string[] }} */
  const o = {
    labels: [],
    fields: [],
    searchableIndexes: [],
    sortableLabels: [],
  };
  props.columns.forEach(({ label, field, search, sort }, index) => {
    o.labels.push(label);
    o.fields.push(typeof field === "function" ? field : (o) => o[field]);
    if (optInState(search, props.useSearch)) o.searchableIndexes.push(index);
    if (optInState(sort, props.useSort)) {
      o.sortableLabels.push(label);
      if (typeof sort === "string") sortOrders.set(label, sort);
    }
  });
  return o;
});
const useSearch = $computed(() => !!cfg.searchableIndexes.length);
const useSort = $computed(() => !!sortOrders.size);
const searchTerm = $computed(() => props.search.toLowerCase?.());

const data = $computed(() =>
  props.data.map((item, index) => ({
    raw: item,
    row: cfg.fields.map((field) => field(item)),
    id: index,
  }))
);
const searchable = $computed(() =>
  data.map(({ row }) => cfg.searchableIndexes.map((index) => row[index] + ""))
);

const filteredData = $computed(() => {
  if (!useSearch || !searchTerm) return data;
  const filteredIndexes = [];
  searchable.forEach((row, index) => {
    const isMatch = row.some((field) => field.indexOf(searchTerm) > -1);
    if (isMatch) filteredIndexes.push(index);
  });
  return filteredIndexes.map((index) => data[index]);
});

function cycleSort(label) {
  if (!cfg.sortableLabels.includes(label)) return;
  const current = sortOrders.get(label);
  sortOrders.delete(label);
  const next = !current ? "desc" : current === "desc" ? "asc" : undefined;
  if (next) sortOrders.set(label, next);
}

const composeSortFunctions = R.compose(
  R.reverse,
  R.map(([label, sort]) => {
    const index = props.columns.findIndex((el) => el.label === label);
    const sortMultiplier = sort === "asc" ? 1 : -1;
    const sortFunction = R.sort(
      (a, b) => (a.row[index] > b.row[index] ? -1 : 1) * sortMultiplier
    );
    return R.compose(sortFunction, sortMultiplier < 0 ? R.reverse : (i) => i);
  })
);

const sortedData = $computed(() => {
  if (!useSort) return filteredData;
  const sortFunctions = composeSortFunctions([...sortOrders.entries()]);
  return R.compose(...sortFunctions)(filteredData);
});

const numberOfActions = $computed(
  () =>
    [props.useInfo, props.useEdit, props.useDelete].filter((el) => !!el).length
);
const useActions = $computed(() => !!numberOfActions);
const actionColumnSize = $computed(
  () =>
    cssVars.cellPaddingX * 2 +
    cssVars.iconSize * numberOfActions +
    cssVars.iconGap * (numberOfActions - 1)
);

let items = $ref([]);

onMounted(() => {
  cssVars.cellPaddingX = parseInt(getTableCssVar("--table-cell-padding-x"));
  cssVars.iconGap = parseInt(getTableCssVar("--table-icon-gap"));
  cssVars.iconSize = parseInt(getTableCssVar("--table-icon-size"));
  watch(
    () => sortedData,
    (value) => (items = value),
    { immediate: true }
  );
});
</script>

<template>
  <table :class="`${$prefix}table`" ref="tableRef">
    <thead>
      <tr>
        <th v-if="useActions" :style="{ width: `${actionColumnSize}px` }"></th>
        <th v-for="label in cfg.labels" :key="label" @click="cycleSort(label)">
          {{ label }}
          <span
            class="sort-arrow"
            :class="[
              sortOrders.get(label) ?? 'initial',
              activeLabel === label && 'active',
            ]"
            v-if="cfg.sortableLabels.includes(label)"
          ></span>
        </th>
      </tr>
    </thead>
    <TransitionGroup name="table-transition" tag="tbody">
      <tr
        v-for="{ row, raw, id } in items"
        :key="id"
        :style="`transition-delay: ${id * 0.05}s`"
      >
        <td
          v-if="useActions"
          :class="`${$prefix}flex`"
          style="--gap: var(--table-icon-gap)"
        >
          <button
            v-if="props.useInfo"
            :class="`${$prefix}button text info action-button`"
            @click="emit('info', raw)"
          >
            <TableIconInfo :class="`${$prefix}table-icon`" />
          </button>
          <button
            v-if="props.useEdit"
            :class="`${$prefix}button text warning action-button`"
            @click="emit('edit', raw)"
          >
            <TableIconEdit :class="`${$prefix}table-icon`" />
          </button>
          <button
            v-if="props.useDelete"
            :class="`${$prefix}button text danger action-button`"
            @click="emit('delete', raw)"
          >
            <TableIconDelete :class="`${$prefix}table-icon`" />
          </button>
        </td>
        <td v-for="field in row">{{ field }}</td>
      </tr>
    </TransitionGroup>
  </table>
</template>

<style scoped lang="scss">
th {
  cursor: pointer;
}

.sort-arrow {
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  width: 7px;
  height: 7px;
  background: var(--table-header-color);
  border-radius: 0;
  transition: clip-path 0.4s ease;
  opacity: 0.5;

  &.active {
    opacity: 1;
  }
  &.initial {
    clip-path: polygon(10% 35%, 90% 35%, 90% 65%, 10% 65%);
  }
  &.desc {
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%, 50% 100%);
  }
  &.asc {
    clip-path: polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%);
  }
}
.action-button {
  --base-color: var(--#{$prefix}color-grey);
}
</style>
