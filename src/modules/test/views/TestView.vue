<script setup>
import BaseTable from "@/components/base/table/BaseTable.vue";
import { createTableColumns } from "@/components/base/table/table.ctl";
import { css } from "@/utils/css";
import { ref } from "vue";

const search = ref("");
const tdata = [
  { firstName: "Chuck", lastName: "Norris" },
  { firstName: "Bruce", lastName: "Lee" },
  { firstName: "Alma", lastName: "Norris" },
  { firstName: "Alba", lastName: "Lee" },
];
const columns = createTableColumns([
  { label: "First Name", field: "firstName" },
  { label: "Last Name", field: (o) => o.lastName },
]);
</script>

<template>
  <div class="snt-container">
    <div class="snt-grid">
      <BaseTable :data="tdata" :columns="columns" :search="search" use-sort />
      <BaseTable
        :data="tdata"
        :columns="columns"
        use-sort
        class="primary"
        use-info
        use-edit
        use-delete
      />
      <BaseTable
        :data="tdata"
        :columns="columns"
        :search="search"
        use-sort
        use-edit
        use-delete
        use-info
        v-for="col in Object.keys(css.colors)"
        :key="col"
        :class="col"
      />
    </div>
    <p>buttons</p>
    <div class="">
      <button class="snt-button small underline">button</button>
      <button
        class="snt-button small underline"
        v-for="col in Object.keys(css.colors)"
        :key="col"
        :class="col"
      >
        button
      </button>
    </div>
    <p>buttons outline</p>
    <div class="">
      <button class="snt-button outline small underline">button</button>
      <button
        class="snt-button outline small underline"
        v-for="col in Object.keys(css.colors)"
        :key="col"
        :class="col"
      >
        button
      </button>
    </div>
    <p>buttons text</p>
    <div class="">
      <button class="snt-button text underline">button</button>
      <button
        class="snt-button text underline"
        v-for="col in Object.keys(css.colors)"
        :key="col"
        :class="col"
      >
        button
      </button>
    </div>
    <p>links</p>
    <div class="">
      <a href="/" class="snt-button text underline">button</a>
      <a
        href="/"
        class="snt-button text underline"
        v-for="col in Object.keys(css.colors)"
        :key="col"
        :class="col"
      >
        button
      </a>
    </div>
    <div class="snt-grid-fill">
      <button href="/" class="snt-card clickable">card</button>
      <button
        href="/"
        class="snt-card clickable"
        v-for="col in Object.keys(css.colors)"
        :key="col"
        :class="col"
      >
        card
      </button>
    </div>
  </div>
</template>
