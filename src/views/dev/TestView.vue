<script setup>
import BaseInput from "@/components/base/input/BaseInput.vue";
import SwitchInput from "@/components/base/input/SwitchInput.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";
// import { modal } from "@/components/base/modal/modal.ctl";
import BaseTable from "@/components/base/table/BaseTable.vue";
import { createTableColumns } from "@/components/base/table/table.ctl";
import { toast } from "@/components/base/toast/toast.ctl";
import { css } from "@/utils/css";
import { onMounted, reactive, ref } from "vue";

const search = ref("");
const tdata = [
  { firstName: "Chuck", lastName: "Norris" },
  { firstName: "Bruce", lastName: "Lee" },
  { firstName: "Alma", lastName: "Norris" },
  { firstName: "Alba", lastName: "Lee" },
];
const columns = createTableColumns([
  {
    label: "First Name",
    field: "firstName",
  },

  {
    label: "Last Name",
    field: (o) => o.lastName,
  },
]);
const models = reactive({
  switch: ["asdf", "qwe"],
  checkbox: ["asdf", "qwe"],
});
onMounted(() => {
  toast.success("BunkerPrice Status Deleted Message", { duration: 0 });
  toast.info("info", { duration: 0 });
  toast.danger("danger", { duration: 0 });
  toast.warning("warning", { duration: 0 });
  toast.notification("notification", { duration: 0 });
  // modal.modal1.open();
});
</script>

<template>
  <div class="snt-container">
    <BaseModal name="modal1" class="danger">Test</BaseModal>
    <SwitchInput />
    <div style="padding: 0 200px">
      <button
        @click="
          () => {
            models.switch = !models.switch;
            models.checkbox = !models.checkbox;
          }
        "
      >
        Toggle
      </button>
      <BaseInput type="switch" value="asdf" v-model="models.switch" />
      <BaseInput type="checkbox" value="asdf" v-model="models.checkbox" />
    </div>
    <!-- <div style="padding: 0 200px">
      <BaseInput type="switch" />
      <BaseInput type="checkbox" />
    </div> -->
    <button @click="toast.success('asdf')">success</button>
    <button @click="toast.info('asdf')">info</button>
    <button @click="toast.danger('asdf')">danger</button>
    <button @click="toast.warning('asdf')">warning</button>
    <div class="snt-grid">
      <pre>{{ search }}</pre>
      <BaseInput v-model="search" />
      <BaseTable
        title="Users"
        sticky-headers
        :data="tdata"
        :columns="columns"
        v-model:search="search"
        use-sort
        use-search
      />
      <BaseTable
        title="Users"
        sticky-headers
        :data="tdata"
        :columns="columns"
        use-sort
        class="primary"
        use-info
        use-edit
        use-delete
      />
      <BaseTable
        title="Users"
        sticky-headers
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
