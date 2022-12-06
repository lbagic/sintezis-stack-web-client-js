<script>
export default { inheritAttrs: false };
</script>

<script setup>
import * as R from "ramda";
import { onMounted, reactive, useAttrs, watch, watchEffect } from "vue";
import BaseInput from "../input/BaseInput.vue";
import BaseIconDelete from "@/components/icons/BaseIconDelete.vue";
import BaseIconEdit from "@/components/icons/BaseIconEdit.vue";
import BaseIconInfo from "@/components/icons/BaseIconInfo.vue";

// TODO - pagination, select, search, sort
// TODO - compose filtering > sorting > pagination
const attrs = useAttrs();
const emit = defineEmits(["edit", "delete", "info", "update:search"]);
const props = defineProps({
  data: Array,
  columns: Array,
  search: String,
  useSearch: Boolean,
  useSort: Boolean,
  useEdit: Boolean,
  useDelete: Boolean,
  useInfo: Boolean,
  stickyHeaders: Boolean,
  title: String,
});
const tableRef = $ref(null);
const cssVars = reactive({
  cellPaddingX: 0,
  iconGap: 0,
  iconSize: 0,
});

let searchModel = $ref("");
watchEffect(() => (searchModel = props.search));
watchEffect(() => emit("update:search", searchModel));

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
const useSort = $computed(() => !!cfg.sortableLabels.length);
const hasActiveSort = $computed(() => !!sortOrders.size);

const data = $computed(() =>
  props.data.map((el, index) => ({
    raw: el,
    row: cfg.fields.map((field) => {
      const item = field(el);
      return item?.trim ? item.trim() : item;
    }),
    id: index,
  }))
);
const searchable = $computed(() =>
  data.map(({ row }) => cfg.searchableIndexes.map((index) => row[index] + ""))
);

const filteredData = $computed(() => {
  if (!useSearch || !searchModel) return data;
  const filteredIndexes = [];
  searchable.forEach((row, index) => {
    const isMatch = row.some((field) => field.indexOf(searchModel) > -1);
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
  if (!hasActiveSort) return filteredData;
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

const delayMultiplier = $computed(() =>
  items.length > 20 ? 1 / items.length : 0.05
);
</script>

<template>
  <div :class="`${$prefix}grid small`">
    <div :class="`${$prefix}flex`">
      <p v-if="props.title" :class="`${$prefix}table-meta-title`">
        {{ props.title }}
      </p>
      <div :class="`${$prefix}flex`" style="margin-left: auto">
        <button
          v-if="useSort"
          class="snt-button small light"
          @click="sortOrders.clear"
          :disabled="!hasActiveSort"
        >
          Clear sort
        </button>
        <BaseInput
          v-if="useSearch"
          placeholder="Search"
          v-model="searchModel"
        />
      </div>
    </div>
    <div
      :style="{
        'overflow-x': props.stickyHeaders ? 'initial' : 'auto',
        'box-shadow': `var(--${$prefix}shadow-1)`,
      }"
    >
      <table
        :class="{
          [`${$prefix}table`]: true,
          [`${$prefix}table-sticky`]: props.stickyHeaders,
        }"
        ref="tableRef"
        v-bind="attrs"
      >
        <thead>
          <tr>
            <th
              v-if="useActions"
              :style="{ width: `${actionColumnSize}px` }"
            ></th>
            <th
              v-for="label in cfg.labels"
              :key="label"
              @click="cycleSort(label)"
              :style="{
                'white-space': 'nowrap',
                cursor: cfg.sortableLabels.includes(label)
                  ? 'pointer'
                  : undefined,
              }"
            >
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
            :style="`transition-delay: ${id * delayMultiplier}s`"
          >
            <td v-if="useActions">
              <div
                :class="`${$prefix}flex`"
                style="--gap: var(--table-icon-gap)"
              >
                <button
                  v-if="props.useInfo"
                  :class="`${$prefix}button text info action-button`"
                  @click="emit('info', raw)"
                  title="Info"
                >
                  <BaseIconInfo :class="`${$prefix}table-icon`" />
                </button>
                <button
                  v-if="props.useEdit"
                  :class="`${$prefix}button text warning action-button`"
                  @click="emit('edit', raw)"
                  title="Edit"
                >
                  <BaseIconEdit :class="`${$prefix}table-icon`" />
                </button>
                <button
                  v-if="props.useDelete"
                  :class="`${$prefix}button text danger action-button`"
                  @click="emit('delete', raw)"
                  title="Delete"
                >
                  <BaseIconDelete :class="`${$prefix}table-icon`" />
                </button>
              </div>
            </td>
            <td v-for="field in row">{{ field }}</td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
