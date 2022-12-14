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
import { _tableCtl } from "./table.ctl";

function getTableCssVar(name) {
  return getComputedStyle(tableRef).getPropertyValue(name);
}
function optInState(colState, propState) {
  return colState || (propState && colState === undefined) ? true : false;
}
function cycleSort(index) {
  if (!cfg.sortables.includes(index)) return;
  const current = sortMap.get(index);
  sortMap.delete(index);
  const next = !current ? "desc" : current === "desc" ? "asc" : undefined;
  if (next) sortMap.set(index, next);
}

// TODO - pagination, select, search, sort
// TODO - compose filtering > sorting > pagination if possible

const attrs = useAttrs();
const emit = defineEmits([
  "edit",
  "delete",
  "info",
  "update:search",
  "update:pagination",
]);
const props = defineProps({
  data: Array,
  columns: Array,
  search: String,
  pagination: Object,
  useSearch: Boolean,
  useSort: Boolean,
  useEdit: Boolean,
  useDelete: Boolean,
  useInfo: Boolean,
  usePagination: Boolean,
  usePaginationExternal: Boolean,
  stickyHeaders: Boolean,
  title: String,
});

if (!props.columns) throw new Error('Prop "columns" must be provided.');
const sortMap = $ref(new Map());
const tableRef = $ref(null);
const cssVars = reactive({
  cellPaddingX: 0,
  iconGap: 0,
  iconSize: 0,
});
const ctx = reactive({
  search: "",
  pagination: _tableCtl.createTablePagination(),
});

// Search v-model
watchEffect(() => {
  ctx.search = props.search ?? "";
});
watch(
  () => ctx.search,
  (search) => emit("update:search", search)
);

// Pagination v-model & handlers
watchEffect(() => {
  if (props.pagination) Object.assign(ctx.pagination, props.pagination);
});
watch(
  () => ctx.pagination,
  (pagination) => {
    if (ctx.pagination === props.pagination) return;
    emit("update:pagination", pagination);
  },
  { deep: true }
);

if (props.usePagination) {
  if (!props.usePaginationExternal)
    watchEffect(() => (ctx.pagination.total = props.data.length));
  watchEffect(() => {
    ctx.pagination.totalPages = Math.ceil(
      ctx.pagination.total / ctx.pagination.pageSize
    );
  });
  watch(
    () => ctx.pagination,
    (pagination) => {
      if (pagination.totalPages && pagination.page > pagination.totalPages)
        pagination.page = pagination.totalPages;
    },
    { deep: true }
  );
}

const paginationButtons = $computed(() => {
  const { totalPages, page } = ctx.pagination;
  const min = Math.max(Math.min(totalPages - 4, page - 2), 1);
  const max = Math.min(min + 4, totalPages);
  const list = [...Array(max - min + 1)].map((_, index) => index + min);
  return { list, isLast: page >= max, isFirst: page <= min };
});

const cfg = $computed(() => {
  const sortables = [];
  const searchables = [];
  props.columns.forEach(({ sort, search }, index) => {
    if (optInState(sort, props.useSort)) sortables.push(index);
    if (optInState(search, props.useSearch)) searchables.push(index);
  });
  return { sortables, searchables };
});

const activeSortIndex = $computed(() => [...sortMap.keys()].at(-1));
const isSearchable = $computed(() => !!cfg.searchables.length);
const isSortable = $computed(() => !!cfg.sortables.length);
const isSorted = $computed(() => !!sortMap.size);
const actionCount = $computed(
  () =>
    [props.useInfo, props.useEdit, props.useDelete].filter((el) => !!el).length
);
const actionColumnSize = $computed(
  () =>
    cssVars.cellPaddingX * 2 +
    cssVars.iconSize * actionCount +
    cssVars.iconGap * (actionCount - 1)
);

// Data prepartaion
const data = $computed(() =>
  props.data.map((item, index) => {
    const id = index;
    const row = props.columns.map(({ field }) => {
      const parsedField = typeof field === "string" ? item[field] : field(item);
      return typeof parsedField === "string" ? parsedField.trim() : parsedField;
    });
    const searchable = cfg.searchables.map((index) => row[index] + "");
    return { id, item, row, searchable };
  })
);

// Data searching
const searchedData = $computed(() =>
  !isSearchable || !ctx.search
    ? data
    : data.filter(({ searchable }) =>
        searchable.some((field) => field.indexOf(ctx.search) > -1)
      )
);

// Data sorting
const sortedData = $computed(() => {
  if (!isSorted) return searchedData;
  const sortFunctions = _tableCtl.composeSortFunctions([...sortMap.entries()]);
  return R.compose(...sortFunctions)(searchedData);
});

// Data pagination
const paginatedData = $computed(() => {
  if (!props.usePagination) return sortedData;
  const { page, pageSize } = ctx.pagination;
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  return sortedData.slice(start, end);
});

// Final datalist
const datalist = $computed(() => paginatedData);

onMounted(() => {
  cssVars.cellPaddingX = parseInt(getTableCssVar("--table-cell-padding-x"));
  cssVars.iconGap = parseInt(getTableCssVar("--table-icon-gap"));
  cssVars.iconSize = parseInt(getTableCssVar("--table-icon-size"));
});
</script>

<template>
  <div :class="`${$prefix}table-wrapper ${$prefix}grid small`">
    <div :class="`${$prefix}flex`">
      <p v-if="props.title" :class="`${$prefix}table-meta-title`">
        {{ props.title }}
      </p>
      <div :class="`${$prefix}flex`" style="margin-left: auto">
        <button
          v-if="isSortable"
          :class="`${$prefix}button small light`"
          @click="sortMap.clear"
          :disabled="!isSorted"
        >
          Clear sort
        </button>
        <BaseInput
          v-if="isSearchable"
          placeholder="Search"
          v-model="ctx.search"
        />
      </div>
    </div>
    <div
      :class="`${$prefix}flex`"
      style="--gap: 4px; justify-content: flex-end; font-family: RobotoMono"
      v-if="props.usePagination"
    >
      <BaseInput
        label="Page size:"
        label-position="left"
        type="select"
        :options="[10, 20, 50, 100]"
        style="width: fit-content"
        required
        v-model="ctx.pagination.pageSize"
        :use-required-asterisk="false"
      />
      <button
        :class="`${$prefix}button small muted`"
        :disabled="paginationButtons.isFirst"
        @click="ctx.pagination.page = 1"
      >
        &lt;&lt;
      </button>
      <button
        :class="`${$prefix}button small muted`"
        :disabled="paginationButtons.isFirst"
        @click="ctx.pagination.page -= 1"
      >
        &lt;
      </button>
      <button
        v-for="i in paginationButtons.list"
        :class="{
          [`${$prefix}button small`]: true,
          muted: i !== ctx.pagination.page,
          primary: i === ctx.pagination.page,
        }"
        @click="ctx.pagination.page = i"
      >
        {{ i }}
      </button>
      <button
        :class="`${$prefix}button small muted`"
        :disabled="paginationButtons.isLast"
        @click="ctx.pagination.page += 1"
      >
        &gt;
      </button>
      <button
        :class="`${$prefix}button small muted`"
        :disabled="paginationButtons.isLast"
        @click="ctx.pagination.page = ctx.pagination.totalPages"
      >
        &gt;&gt; {{ ctx.pagination.totalPages }}
      </button>
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
              v-if="actionCount"
              :style="{ width: `${actionColumnSize}px` }"
            ></th>
            <th
              v-for="({ label }, index) in props.columns"
              :key="label"
              @click="cycleSort(index)"
              :style="{
                'white-space': 'nowrap',
                cursor: cfg.sortables.includes(index) ? 'pointer' : undefined,
              }"
            >
              {{ label }}
              <span
                class="sort-arrow"
                :class="[
                  sortMap.get(index) ?? 'initial',
                  activeSortIndex === index && 'active',
                ]"
                v-if="cfg.sortables.includes(index)"
              ></span>
            </th>
          </tr>
        </thead>
        <!-- <TransitionGroup name="table-transition" tag="tbody"> -->
        <tbody>
          <tr v-for="{ id, item, row } in datalist" :key="id">
            <td v-if="actionCount">
              <div
                :class="`${$prefix}flex`"
                style="--gap: var(--table-icon-gap)"
              >
                <button
                  v-if="props.useInfo"
                  :class="`${$prefix}button text info action-button`"
                  @click="emit('info', item)"
                  title="Info"
                >
                  <BaseIconInfo :class="`${$prefix}table-icon`" />
                </button>
                <button
                  v-if="props.useEdit"
                  :class="`${$prefix}button text warning action-button`"
                  @click="emit('edit', item)"
                  title="Edit"
                >
                  <BaseIconEdit :class="`${$prefix}table-icon`" />
                </button>
                <button
                  v-if="props.useDelete"
                  :class="`${$prefix}button text danger action-button`"
                  @click="emit('delete', item)"
                  title="Delete"
                >
                  <BaseIconDelete :class="`${$prefix}table-icon`" />
                </button>
              </div>
            </td>
            <td v-for="field in row">{{ field }}</td>
          </tr>
        </tbody>
        <!-- </TransitionGroup> -->
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
