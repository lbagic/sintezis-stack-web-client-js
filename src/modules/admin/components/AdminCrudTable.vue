<script setup>
defineProps({
  rawData: Array,
  displayData: Array,
  displayKeys: Array,
});
</script>

<template>
  <table class="snt-table light">
    <thead>
      <tr>
        <th v-for="key in displayKeys" :key="key">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in displayData" :key="item">
        <td v-for="(value, key) in item" :key="key">{{ value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss"></style>
